import { FaCommentAlt, FaSmile, FaDatabase, FaChartLine, FaBell, FaCogs, FaShareAlt, FaFileAlt, FaSyncAlt } from 'react-icons/fa';

const Features = () => (
  <div className="bg-[#FAF3E0] text-[#2C3E50] py-16">
    <section className="max-w-screen-xl mx-auto px-6 relative z-10">
      {/* Sección del diagrama de arquitectura (espacio reservado) */}
      <div className="bg-[#F4C763] bg-opacity-90 rounded-lg p-6 shadow-lg mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#154360] mb-4">Diagrama de Arquitectura</h2>
        <p className="text-center text-lg text-[#34495E]">
          Aquí irá el diagrama de arquitectura cuando esté listo.
        </p>
        {/* Espacio para el diagrama */}
        <div className="w-full h-64 bg-[#EAECEE] mt-6 rounded-lg">
          {/* Puedes reemplazar este div con tu diagrama cuando esté listo */}
        </div>
      </div>

      {/* Sección de Funcionalidades Clave */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A5276]">
        Funcionalidades Clave
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">

        {/* Recolección de Comentarios */}
        <div className="bg-[#F4C763] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaCommentAlt className="text-3xl text-[#154360] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#154360]">Recolección de Comentarios</strong>
            <p className="text-[#34495E] mt-2 text-lg">Carga de comentarios a través de AWS Amplify y almacenamiento en S3.</p>
          </div>
        </div>

        {/* Análisis de Sentimientos */}
        <div className="bg-[#20233F] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaSmile className="text-3xl text-[#FAF3E0] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#FAF3E0]">Análisis de Sentimientos</strong>
            <p className="text-[#FAF3E0] mt-2 text-lg">Detección del tono emocional con Amazon Comprehend.</p>
          </div>
        </div>

        {/* Almacenamiento y Visualización */}
        <div className="bg-[#F4C763] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaDatabase className="text-3xl text-[#154360] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#154360]">Almacenamiento y Visualización</strong>
            <p className="text-[#34495E] mt-2 text-lg">Resultados almacenados en DynamoDB y accesibles en tiempo real.</p>
          </div>
        </div>

        {/* Monitoreo y Alertas */}
        <div className="bg-[#20233F] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaBell className="text-3xl text-[#FAF3E0] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#FAF3E0]">Monitoreo y Alertas</strong>
            <p className="text-[#FAF3E0] mt-2 text-lg">Monitoreo con CloudWatch y alertas con SNS.</p>
          </div>
        </div>

        {/* Personalización de Alertas */}
        <div className="bg-[#F4C763] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaCogs className="text-3xl text-[#154360] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#154360]">Personalización de Alertas</strong>
            <p className="text-[#34495E] mt-2 text-lg">Alertas configurables según tipo e intensidad de sentimiento.</p>
          </div>
        </div>

        {/* Análisis de Tendencias */}
        <div className="bg-[#20233F] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaChartLine className="text-3xl text-[#FAF3E0] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#FAF3E0]">Análisis de Tendencias</strong>
            <p className="text-[#FAF3E0] mt-2 text-lg">Identificación de tendencias a lo largo del tiempo.</p>
          </div>
        </div>

        {/* Integración con Redes Sociales */}
        <div className="bg-[#F4C763] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaShareAlt className="text-3xl text-[#154360] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#154360]">Integración con Redes Sociales</strong>
            <p className="text-[#34495E] mt-2 text-lg">Recopilación de comentarios desde Twitter o Facebook.</p>
          </div>
        </div>

        {/* Reportes Automáticos */}
        <div className="bg-[#20233F] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaFileAlt className="text-3xl text-[#FAF3E0] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#FAF3E0]">Reportes Automáticos</strong>
            <p className="text-[#FAF3E0] mt-2 text-lg">Generación y envío de reportes periódicos.</p>
          </div>
        </div>

        {/* Feedback en Tiempo Real */}
        <div className="bg-[#F4C763] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaSyncAlt className="text-3xl text-[#154360] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#154360]">Feedback en Tiempo Real</strong>
            <p className="text-[#34495E] mt-2 text-lg">Actualización instantánea de los análisis de sentimientos.</p>
          </div>
        </div>

        {/* Exportación de Datos */}
        <div className="bg-[#20233F] bg-opacity-90 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105 w-full min-h-[200px]">
          <div className="text-center">
            <FaFileAlt className="text-3xl text-[#FAF3E0] mx-auto mb-4" />
            <strong className="text-lg md:text-xl text-[#FAF3E0]">Exportación de Datos</strong>
            <p className="text-[#FAF3E0] mt-2 text-lg">Exportación de datos a CSV o PDF.</p>
          </div>
        </div>

      </div>
    </section>
  </div>
);

export default Features;
