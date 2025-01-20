const InsightFooter: React.FC = () => (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-1 fixed bottom-0 left-0 right-0">
      <div className="max-w-full mx-auto px-8 md:px-16">
        {/* Derechos de autor y logo de AWS */}
        <div className="text-sm text-gray-400 flex justify-between items-center w-full">
          <p className="flex justify-start items-center space-x-2">
            <span>&copy; 2025 <span className="font-semibold">InSightful</span>. Todos los derechos reservados.</span>
          </p>
          <div className="flex justify-end items-center space-x-2">
            <a href="https://aws.amazon.com/what-is-cloud-computing" target="_blank" rel="noopener noreferrer">
              <img src="https://d0.awsstatic.com/logos/powered-by-aws-white.png" alt="Powered by AWS" className="h-6" />
            </a>
            <p className="text-gray-500 font-medium">Versión 1.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
  
  export default InsightFooter;
  