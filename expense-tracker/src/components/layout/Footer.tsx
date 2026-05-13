function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div>
          <h2 className="text-xl font-bold text-white">Monetra</h2>

          <p className="mt-1 text-sm text-gray-400">
            Smart expense management for modern users.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          © 2026 Monetra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
