import { Link } from "react-router-dom";

export default function Footer () {
    return (
      <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h2 className="text-2xl font-bold text-white">Dice Bet</h2>
            <p className="mt-2 text-gray-400">
              Seamlessly Bet and Earn money with ease.
            </p>
          </div>
  
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/rolldice" className="hover:text-blue-400">Roll Dice</Link></li>
            </ul>
          </div>
        </div>
  
        <div className="mt-8 text-center text-gray-500 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Dice Bet. All rights reserved.
        </div>
      </footer>
    );
  };
    