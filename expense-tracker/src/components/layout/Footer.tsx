function Footer() {
  return (
    <footer className="border-t border-gray-200 transition-colors duration-200 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div>
          <h2 className="text-xl font-bold text-gray-100 dark:text-white">
            PennyTrack
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Smart expense management for modern users.
          </p>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2026 PennyTrack. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
