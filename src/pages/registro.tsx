import Image from "next/image";
import Head from "next/head";
import "../styles/registro.css"

export default function Registro() {
  return (
    <>
      <Head>
        <title>Crear una Nueva Cuenta</title>
        <link rel="stylesheet" href="/styles/registro.css" />
      </Head>
      <div className="container">
        <div className="left-side">
          <div className="image-container">
            <Image
              src="/images/telas.jpg"
              alt="Imagen de telas"
              width={250}
              height={350}
              className="image"
            />
          </div>
        </div>
        <div className="right-side">
          <h1>Crear una Nueva Cuenta</h1>
          <form className="form">
            <label className="label" htmlFor="nombre">
              Nombre Completo
            </label>
            <input
              className="input"
              type="text"
              id="nombre"
              placeholder="Enter your Full Name here"
              required
            />

            <label className="label" htmlFor="email">
              Correo
            </label>
            <input
              className="input"
              type="email"
              id="email"
              placeholder="Enter your Email here"
              required
            />

            <label className="label" htmlFor="password">
              Contraseña
            </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Enter your Password here"
              required
            />

            <button type="submit" className="btn">
              Crear Cuenta
            </button>
          </form>
          <p className="text">
            Ya tienes una cuenta{" "}
            <a href="#" className="link">
              Iniciar Sesión
            </a>
          </p>
          <div className="or-divider">- OR -</div>
          <button className="google-btn">
            <Image
              src="/images/google-logo.png"
              alt="Google Icon"
              width={20}
              height={20}
              className="google-icon"
            />
            Sign up with Google
          </button>
        </div>
      </div>
      <footer className="footer">
        <p className="footer-text">Derechos Reservados</p>
      </footer>
    </>
  );
}
