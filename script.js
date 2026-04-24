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
  ctx.fillStyle = color  ;
  ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}
// ===============================
// BRESENHAM (LÍNEAS)
// ===============================
function bresenhamLine(x0, y0, x1, y1) {

  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);

  let sx = (x0 < x1) ? 1 : -1;
  let sy = (y0 < y1) ? 1 : -1;

  let err = dx - dy;

  while (true) {

    drawPixel(ctx, x0, y0);

    if (x0 === x1 && y0 === y1) break;

    let e2 = 2 * err;

    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }

    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}