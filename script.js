// ===============================
// /**
 // Nombre: Paula Catalina Rodríguez Avendaño
 // Codigo: 6001083
 // Asignatura: Computación Gráfica
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
 // Ajuste en X
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
// Ajuste en Y
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}
// ===============================
// ALGORITMO DE PUNTO MEDIO
// ===============================
/**
 * Dibuja una circunferencia usando el algoritmo de punto medio
 * 
 * Se aprovecha la simetría de la circunferencia en 8 octantes
 * para reducir el número de cálculos.
 */
function midpointCircle(cx, cy, r) {

  let x = 0;
  let y = r;

  // Parámetro de decisión inicial
  let d = 3 - 2 * r;

  while (x <= y) {

    // Se dibujan los 8 puntos simétricos
    plotCirclePoints(cx, cy, x, y);

    // Si el punto está dentro del círculo
    if (d < 0) {
      d = d + 4 * x + 6;
    } else {
      // Si está fuera, se corrige en Y
      d = d + 4 * (x - y) + 10;
      y--;
    }

    x++;
  }
}
