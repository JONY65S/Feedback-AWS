const AboutAuthor = () => (
  <div className="h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white flex items-center justify-center">
    <div className="bg-white text-gray-800 rounded-lg shadow-lg p-10 max-w-3xl w-full">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-400 mb-6">
        ACERCA DE <br /><br />JONATHAN BALTAZAR BALDERAS
      </h1>
      <p className="text-lg text-center mb-8">
      Soy un futuro profesional de TI con una gran pasión por la tecnología. Mi experiencia se centra en el desarrollo de sitios web y aplicaciones web, y también tengo un gran interés en Servicios de TI, Gestión de Servicios en la Nube, Bases de Datos, Linux, Windows y Ciberseguridad. <br /><br />

Mi participación en IEEE UNAM EMBS me ha brindado la oportunidad de participar en proyectos y eventos emocionantes relacionados con la Ingeniería Biomédica. A través de esta experiencia, he adquirido conocimientos sobre cómo la tecnología puede mejorar la atención médica y el bienestar de las personas.<br /><br />

Estoy ansioso por comenzar mi trayectoria profesional y busco activamente oportunidades que me permitan contribuir al mundo de la tecnología mientras continúo creciendo en mi campo. ¡Si compartes mi entusiasmo por la innovación, espero conectar contigo en LinkedIn!<br /><br />
      </p>
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <p className="text-xl font-semibold">Número de contacto: </p>
          <strong className="text-xl ml-2">5581400158</strong>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">Conéctate conmigo a través de LinkedIn:</p>
          <a
            href="https://www.linkedin.com/in/jonathan-baltazar-7a77b8284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-xl font-semibold transition duration-300"
          >
            Mi Perfil de LinkedIn
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default AboutAuthor;
