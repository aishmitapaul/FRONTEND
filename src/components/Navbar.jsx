import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HomeIcon, DocumentTextIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/?q=${encodeURIComponent(searchInput.trim())}`);
      setMenuOpen(false); 
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md dark:bg-gray-900 dark:text-white px-6 py-4 z-50">
      <div className="flex justify-between items-center">
        {}
        <div className="flex items-center space-x-2">
          <img src="/assets/logo1.jpg" alt="Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ADP NEWS
          </h1>
        </div>

        {}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>

          <Link
            to="/summaries"
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <DocumentTextIcon className="w-5 h-5" />
            My Summaries
          </Link>

          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="border px-2 py-1 rounded dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {}
      {menuOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>

          <Link
            to="/summaries"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <DocumentTextIcon className="w-5 h-5" />
            My Summaries
          </Link>

          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="border px-2 py-1 rounded dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}