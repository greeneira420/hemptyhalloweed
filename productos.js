window.addEventListener("DOMContentLoaded", () => {
  const prices = {
    "Brownie abremente": 10000,
    "Brownie el portal": 15000,
    "Brownie viaje exótico": 22000,
    "Chocolates paseito": 8000,
    "Galletas ¡Qué traba!": 8000,
    "Trufas abrakadabra": 12000,
    "Dulce travx": 20000,
    
  };

 const whatsappNumber = "573004703061";

  function updateSummary() {
    const cards = document.querySelectorAll(".product-card");
    const orderList = document.getElementById("orderList");
    const totalPriceEl = document.getElementById("totalPrice");

    if (!orderList || !totalPriceEl) return;

    let total = 0;
    let html = "";

    cards.forEach(card => {
      const name = card.querySelector("h2").innerText.trim();
      const qty = parseInt(card.querySelector(".qty").innerText, 10) || 0;

      if (qty > 0) {
        const price = (prices[name] || 0) * qty;
        total += price;

        html += `<p>🍫 ${name} × ${qty} — $${price.toLocaleString("es-CO")} COP</p>`;
      }
    });

    orderList.innerHTML =
      html || `<p class="empty-order">Aún no has agregado productos.</p>`;

    totalPriceEl.innerText = `$${total.toLocaleString("es-CO")} COP`;
  }

  document.querySelectorAll(".product-card").forEach(card => {
    const minus = card.querySelector(".minus");
    const plus = card.querySelector(".plus");
    const qty = card.querySelector(".qty");

    if (!minus || !plus || !qty) return;

    let count = 0;

    plus.addEventListener("click", () => {
      count++;
      qty.textContent = count;
      updateSummary();
    });

    minus.addEventListener("click", () => {
      if (count > 0) count--;

      qty.textContent = count;
      updateSummary();
    });
  });

  const btnEnviar = document.getElementById("sendOrder");

  if (btnEnviar) {
    btnEnviar.addEventListener("click", event => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!name || !phone) {
        alert("Por favor, escribe tu nombre y teléfono.");
        return;
      }

      const cards = document.querySelectorAll(".product-card");
      const orderLines = [];
      let total = 0;

      cards.forEach(card => {
        const nameProd = card.querySelector("h2").innerText.trim();
        const qty = parseInt(card.querySelector(".qty").innerText, 10) || 0;

        if (qty > 0) {
          const subtotal = (prices[nameProd] || 0) * qty;
          total += subtotal;

          orderLines.push(
            `• ${nameProd} × ${qty} — $${subtotal.toLocaleString("es-CO")} COP`
          );
        }
      });

      if (orderLines.length === 0) {
        alert("Por favor, selecciona al menos un producto.");
        return;
      }

      const mensaje =
        `¡Hola! Soy ${name}.\n\n` +
        `Quiero realizar el siguiente pedido en Greeneira:\n\n` +
        `🛒 Mi pedido:\n${orderLines.join("\n")}\n\n` +
        `💰 Total del pedido: $${total.toLocaleString("es-CO")} COP\n\n` +
        `📱 Mi teléfono: ${phone}\n\n` +
        `Quiero coordinar mi entrega. ¡Muchas gracias! 🌿`;

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

      window.open(whatsappURL, "_blank");
    });
  }

  updateSummary();
});