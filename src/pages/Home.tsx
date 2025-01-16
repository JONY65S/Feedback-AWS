import { faLightbulb, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faCloud,
  faChartBar,
  faCogs,
  faEye,
  faShieldAlt,
  faBell,
  faLayerGroup,
  faServer,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => (
  <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-teal-600 text-white">
    {/* Hero Section */}
    <section className="text-center py-20 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-600">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-orange-400">
          Un feedback más inteligente, <br />
          <span className="text-white">decisiones más acertadas</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-200 mt-6">
          Transforma comentarios en insights valiosos utilizando inteligencia
          artificial y la potencia de AWS. Descubre cómo InSightful puede
          potenciar tus decisiones con análisis avanzados.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <a
            href="/live-demo"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition-all duration-300"
          >
            Probar Ahora
          </a>
          <a
            href="/explore-analysis"
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition-all duration-300"
          >
            Explorar Análisis
          </a>
          <a
            href="/about"
            className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition-all duration-300"
          >
            Ver Demo
          </a>
        </div>
      </div>
    </section>

    {/* Objetivo Section */}
    <section className="py-16 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-orange-400 text-center mb-12">
          Nuestro Objetivo
        </h2>
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500 text-black w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
              <FontAwesomeIcon icon={faLightbulb} className="text-3xl" />
            </div>
          </div>
          <p className="text-lg text-gray-200 leading-relaxed text-center">
            Nuestro propósito es desarrollar una plataforma que recolecte y
            analice comentarios de usuarios utilizando los servicios avanzados
            de AWS. Con un enfoque en análisis de sentimientos y monitoreo en
            tiempo real, buscamos brindar herramientas innovadoras que impulsen
            la toma de decisiones basada en datos.
          </p>
        </div>
      </div>
    </section>

    {/* Componentes Clave Section */}
    <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-orange-500 text-center mb-12">
          Componentes Clave
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: faCloud, title: "Amazon S3", description: "Almacenamos comentarios recolectados en formato JSON, centralizando datos de forma segura y escalable." },
            { icon: faCogs, title: "AWS Lambda", description: "Procesamos comentarios desde S3, realizamos análisis de sentimientos y almacenamos resultados en DynamoDB." },
            { icon: faDatabase, title: "Amazon DynamoDB", description: "Base de datos NoSQL para comentarios procesados y resultados de análisis, con acceso rápido y eficiente." },
            { icon: faChartBar, title: "Amazon Comprehend", description: "Analizamos tono y emociones en comentarios para comprender la percepción de los usuarios." },
            { icon: faEye, title: "Amazon QuickSight", description: "Generamos reportes avanzados y visualizaciones para detectar patrones y tendencias en los comentarios." },
            { icon: faLayerGroup, title: "AWS Amplify", description: "Gestión de la interfaz de usuario para una carga de comentarios ágil y conectada." },
            { icon: faServer, title: "Amazon CloudWatch", description: "Monitoreo de métricas y logs para identificar errores o cuellos de botella en tiempo real." },
            { icon: faBell, title: "Amazon SNS", description: "Alertas en tiempo real sobre eventos críticos para mantener la plataforma funcionando sin interrupciones." },
            { icon: faLock, title: "Amazon Cognito e IAM", description: "Autenticación segura y gestión de permisos adecuados para todos los servicios integrados." },
          ].map(({ icon, title, description }) => (
            <div
              key={title}
              className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-500"
            >
              <FontAwesomeIcon icon={icon} className="text-orange-500 text-4xl mb-4" />
              <h3 className="text-2xl font-semibold text-white">{title}</h3>
              <p className="text-gray-300 mt-2">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Home;
