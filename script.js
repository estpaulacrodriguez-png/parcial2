JavaScript
/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Paula Catalina Rodríguez Avendaño
 * * Este código debe ser estructurado de forma modular.
 */

// Única función autorizada para dibujar
function plotPixel(ctx, x, y, color = "#1a1a1a") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Retorna los centros donde se ubicarán los polígonos
 * @param {number} r - Radio de la órbita
 * @param {number} n - Cantidad de polígonos
 * @returns {Array} [{x, y}, ...]
 */
function getOrbitalPositions(r, n) {
    // Implementar lógica de distribución circular
}

/**
 * Algoritmo de Bresenham para líneas
 */
function bresenhamLine(x0, y0, x1, y1, color) {
    // Implementación obligatoria por el estudiante
}

/**
 * Algoritmo de Punto Medio para circunferencias
 */
function midpointCircle(centerX, centerY, r, color) {
    // Implementación obligatoria por el estudiante
}


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
/**
 * Dibuja los 8 puntos simétricos de una circunferencia
 */
function plotCirclePoints(cx, cy, x, y) {

  drawPixel(ctx, cx + x, cy + y);
  drawPixel(ctx, cx - x, cy + y);
  drawPixel(ctx, cx + x, cy - y);
  drawPixel(ctx, cx - x, cy - y);

  drawPixel(ctx, cx + y, cy + x);
  drawPixel(ctx, cx - y, cy + x);
  drawPixel(ctx, cx + y, cy - x);
  drawPixel(ctx, cx - y, cy - x);
}
// ===============================
// GENERACIÓN DE POLÍGONOS
// ===============================
/**
 * Calcula los vértices de un polígono regular
 * 
 */
function getPolygonVertices(cx, cy, sides, radius) {

  let vertices = [];

  for (let i = 0; i < sides; i++) {

    // Ángulo correspondiente a cada vértice
    let angle = (2 * Math.PI * i) / sides;

    vertices.push({
      x: Math.round(cx + radius * Math.cos(angle)),
      y: Math.round(cy + radius * Math.sin(angle))
    });
  }

  return vertices;
}

// ===============================
// DIBUJO DE POLÍGONO
// ===============================
/**
 * 
 * El operador módulo (%) permite cerrar la figura
 */
function drawPolygon(vertices) {

  for (let i = 0; i < vertices.length; i++) {

    let p1 = vertices[i];
    let p2 = vertices[(i + 1) % vertices.length];

    bresenhamLine(p1.x, p1.y, p2.x, p2.y);
  }
}
// ===============================
// FUNCIÓN PRINCIPAL
// ===============================
function generateFigure() {
// Limpia el canvas antes de dibujar
  ctx.clearRect(0, 0, W, H);

  let cx = W / 2;
  let cy = H / 2;
// Radio de la circunferencia 
  let R = Math.floor(Math.random() * 100) + 150;
  let N = Math.floor(Math.random() * 7) + 4;
  let K = Math.floor(Math.random() * 5) + 3;
// Número de polígonos
  midpointCircle(cx, cy, R);
// Número de lados de cada polígono
  for (let i = 0; i < N; i++) {

    let angle = (2 * Math.PI * (i + 1)) / N;

    let px = cx + R * Math.cos(angle);
    let py = cy + R * Math.sin(angle);

    let polygon = getPolygonVertices(px, py, K, 25);

    drawPolygon(polygon);
  }
}