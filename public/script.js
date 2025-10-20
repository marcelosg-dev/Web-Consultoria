document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;
  const numero = document.getElementById("numero").value;

  try {
    const res = await fetch("/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, mensaje, numero }),
    });

    const data = await res.json();

    if (data.ok) {
      alert("✅ Mensaje enviado correctamente");
      e.target.reset();
    } else {
      console.error("❌ Error al enviar el mensaje:", data.error || "Desconocido");
    }
  } catch (err) {
    console.error("❌ Error de conexión con el servidor:", err);
  }
});
