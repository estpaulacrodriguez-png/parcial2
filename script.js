// ===============================
// CONFIGURACIÓN
// ===============================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

// ===============================
// PIXEL (ÚNICO MÉTODO DE DIBUJO)
// ===============================
function drawPixel(ctx, x, y, color = "#0000FF") { // azul
  ctx.fillStyle = color ;
  ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}
