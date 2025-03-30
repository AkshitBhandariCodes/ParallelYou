import { Link } from "react-router-dom";
import { Brain, Briefcase, Heart, BookOpen, BarChart, House } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center -space-x-4">
            <Link to="/" className="text-white font-bold text-xl">
              <span className="block">DoppelGängerAI</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex">
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-green-400 transition-colors"
                >
                  <House className="h-5 w-5 text-green-500" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/mentor"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  <Brain className="h-5 w-5 text-indigo-500" />
                  <span>Mentor Mode</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/career"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <Briefcase className="h-5 w-5 text-cyan-500" />
                  <span>Career Pathway</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/therapy"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Heart className="h-5 w-5 text-purple-500" />
                  <span>Safe Space</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/storytelling"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  <span>Storytelling</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/productivity"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <BarChart className="h-5 w-5 text-cyan-500" />
                  <span>Productivity</span>
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
