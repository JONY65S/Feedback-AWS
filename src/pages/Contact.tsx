const Contact = () => (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Contacto</h1>
      <p>¿Tienes alguna duda o sugerencia? ¡Escríbenos!</p>
      <form>
        <input
          type="text"
          placeholder="Tu Nombre"
          style={{ display: "block", margin: "1rem auto", width: "80%" }}
        />
        <input
          type="email"
          placeholder="Tu Correo"
          style={{ display: "block", margin: "1rem auto", width: "80%" }}
        />
        <textarea
          placeholder="Tu Mensaje"
          rows={4}
          style={{ display: "block", margin: "1rem auto", width: "80%" }}
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
  
  export default Contact;
  