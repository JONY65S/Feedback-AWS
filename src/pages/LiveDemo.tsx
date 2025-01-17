import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faPlayCircle, faUsers, faPhone } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8 md:px-16">
        {/* Logo */}
        <Link to="/" className="text-4xl font-semibold text-white tracking-tight hover:text-yellow-400 transition-all ease-in-out duration-300 transform hover:scale-105">
          InSightful
        </Link>

        {/* Menú */}
        <ul className="flex space-x-6 md:space-x-10">
          <li>
            <Link
              to="/"
              className="flex items-center text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all ease-in-out duration-300"
            >
              <FontAwesomeIcon icon={faHome} className="h-5 w-5 mr-2 text-gray-300 hover:text-white" />
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="features"
              className="flex items-center text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all ease-in-out duration-300"
            >
              <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 mr-2 text-gray-300 hover:text-white" />
              Proceso
            </Link>
          </li>
          <li>
            <Link
              to="#explorar"
              className="flex items-center text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all ease-in-out duration-300"
            >
              <FontAwesomeIcon icon={faPlayCircle} className="h-5 w-5 mr-2 text-gray-300 hover:text-white" />
              Explorar
            </Link>
          </li>
          <li>
            <Link
              to="#impacto"
              className="flex items-center text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all ease-in-out duration-300"
            >
              <FontAwesomeIcon icon={faUsers} className="h-5 w-5 mr-2 text-gray-300 hover:text-white" />
              Impacto
            </Link>
          </li>
          <li>
            <Link
              to="#conversa"
              className="flex items-center text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all ease-in-out duration-300"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5 mr-2 text-gray-300 hover:text-white" />
              Conversa
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
