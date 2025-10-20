// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Para servir tu HTML y JS

// Ruta POST para recibir el formulario
app.post("/contacto", async (req, res) => {
  const { nombre, email, mensaje, numero } = req.body;

  if (!nombre || !email || !mensaje || !numero) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    // Configura tu transportador de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "salcedomarcelo56@gmail.com", // ⚠️ cambia esto
        pass: "anwt jisw tfvf kubn", // ⚠️ usa app password si usas Gmail
      },
    });

    await transporter.sendMail({
      from: `"Formulario de contacto" <${email}>`,
      to: "msalgar99@gmail.com",
      subject: `Nuevo mensaje de ${nombre}`,
      text: mensaje + `\nNúmero de contacto: ${numero} \nDatos \n Nombre: ${nombre} \n Email: ${email} \n Número: ${numero}`,
    });

    res.json({ ok: true, mensaje: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
