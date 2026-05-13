const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

/* =========================
   USER SCHEMA
========================= */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

/* =========================
   EXPENSE SCHEMA
========================= */

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    note: {
      type: String,
      maxlength: 120,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Expense = mongoose.model("Expense", expenseSchema);

/* =========================
   JWT AUTH MIDDLEWARE
========================= */

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}

/* =========================
   AUTH ROUTES
========================= */

/* REGISTER */

app.post("/api/auth/register", async function (req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* LOGIN */

app.post("/api/auth/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* =========================
   EXPENSE ROUTES
========================= */

/* CREATE EXPENSE */

app.post("/api/expenses", authMiddleware, async function (req, res) {
  try {
    const { title, amount, category, note, date } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      note,
      date,
      user: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* GET ALL EXPENSES */

/* =========================
   GET ALL EXPENSES
========================= */

app.get("/api/expenses", authMiddleware, async function (req, res) {
  try {
    /* =========================
         QUERY PARAMS
      ========================= */

    const page = Number(req.query.page) || 1;

    /*
        IMPORTANT:
        If limit is NOT passed,
        return ALL expenses.
      */
    const limit = req.query.limit ? Number(req.query.limit) : null;

    const skip = limit ? (page - 1) * limit : 0;

    const search = req.query.search || "";

    const category = req.query.category || "";

    const month = req.query.month || "";

    /* =========================
         BASE QUERY
      ========================= */

    const query = {
      user: req.userId,
    };

    /* =========================
         SEARCH FILTER
      ========================= */

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    /* =========================
         CATEGORY FILTER
      ========================= */

    if (category) {
      query.category = category;
    }

    /* =========================
         MONTH FILTER
      ========================= */

    if (month) {
      const startDate = new Date(`${month}-01`);

      const endDate = new Date(startDate);

      endDate.setMonth(endDate.getMonth() + 1);

      query.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    /* =========================
         EXPENSE QUERY
      ========================= */

    let expensesQuery = Expense.find(query).sort({
      date: -1,
    });

    /*
        Apply pagination ONLY
        if limit exists.
      */
    if (limit) {
      expensesQuery = expensesQuery.skip(skip).limit(limit);
    }

    const expenses = await expensesQuery;

    /* =========================
         TOTAL COUNT
      ========================= */

    const totalExpenses = await Expense.countDocuments(query);

    /* =========================
         RESPONSE
      ========================= */

    res.status(200).json({
      success: true,

      expenses,

      totalExpenses,

      currentPage: page,

      totalPages: limit ? Math.ceil(totalExpenses / limit) : 1,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* GET SINGLE EXPENSE */

/* =========================
   GET SINGLE EXPENSE
========================= */

app.get("/api/expenses/:id", authMiddleware, async function (req, res) {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* UPDATE EXPENSE */

app.patch("/api/expenses/:id", authMiddleware, async function (req, res) {
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      req.body,
      {
        new: true,
      },
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* DELETE EXPENSE */

app.delete("/api/expenses/:id", authMiddleware, async function (req, res) {
  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});

/* =========================
   SEED MOCK EXPENSES
========================= 

app.post("/api/seed-expenses", async function (req, res) {
  try {
    const userId = "6a049ea11be9ff0bafebd758";

    const mockExpenses = [
      {
        title: "Lunch",
        amount: 250,
        category: "Food",
        note: "Lunch with friends",
        date: "2026-05-02",
        user: userId,
      },

      {
        title: "Uber Ride",
        amount: 420,
        category: "Transport",
        note: "Airport travel",
        date: "2026-05-05",
        user: userId,
      },

      {
        title: "Electricity Bill",
        amount: 1800,
        category: "Bills",
        note: "Monthly electricity payment",
        date: "2026-05-06",
        user: userId,
      },

      {
        title: "Netflix Subscription",
        amount: 649,
        category: "Entertainment",
        note: "Monthly subscription",
        date: "2026-05-08",
        user: userId,
      },

      {
        title: "Groceries",
        amount: 2300,
        category: "Food",
        note: "Weekly grocery shopping",
        date: "2026-05-10",
        user: userId,
      },

      {
        title: "Fuel",
        amount: 1500,
        category: "Transport",
        note: "Petrol refill",
        date: "2026-05-11",
        user: userId,
      },

      {
        title: "Internet Bill",
        amount: 999,
        category: "Bills",
        note: "WiFi recharge",
        date: "2026-04-20",
        user: userId,
      },

      {
        title: "Movie Night",
        amount: 800,
        category: "Entertainment",
        note: "Cinema tickets",
        date: "2026-04-15",
        user: userId,
      },
    ];

    await Expense.insertMany(mockExpenses);

    res.status(201).json({
      success: true,
      message: "Mock expenses inserted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}); */
