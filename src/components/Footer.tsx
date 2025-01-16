import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => (
  <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-6 mt-12">
    <div className="max-w-screen-xl mx-auto px-8 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
        {/* Logo y Descripción */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-semibold text-yellow-500">InSightful</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto lg:mx-0">
            Transforma comentarios en insights valiosos para tu negocio, con análisis de sentimientos y más.
          </p>
        </div>

        {/* Contacto (LinkedIn y Correo) */}
        <div className="flex justify-center lg:justify-start space-x-6 text-3xl text-gray-400">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:text-yellow-500">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:contacto@insightful.com" className="transition-all duration-300 hover:text-yellow-500">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>

        {/* Logo de AWS */}
        <div className="text-center lg:text-right">
          <a href="https://aws.amazon.com/what-is-cloud-computing" target="_blank" rel="noopener noreferrer">
            <img src="https://d0.awsstatic.com/logos/powered-by-aws-white.png" alt="Powered by AWS" className="h-8 mx-auto lg:h-10 transition-all duration-300 hover:scale-110" />
          </a>
        </div>
      </div>

      {/* Derechos de autor */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400 flex justify-between items-center">
        <p className="flex justify-center items-center space-x-2">
          <span>&copy; {new Date().getFullYear()} <span className="font-semibold">InSightful</span>. Todos los derechos reservados.</span>
        </p>
        <p className="text-gray-500 font-medium text-right">Versión 1.0</p>
      </div>
    </div>
  </footer>
);

export default Footer;
