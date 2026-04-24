const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ÚNICA función permitida
function plotPixel(ctx, x, y, color = "#000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

// Bresenham completo (todos los casos)
function bresenhamLine(x0, y0, x1, y1, color="#000") {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        plotPixel(ctx, x0, y0, color);

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

// Punto medio para circunferencia
function midpointCircle(cx, cy, r, color="#aaa") {
    let x = 0;
    let y = r;
    let p = 1 - r;

    while (x <= y) {

        plotPixel(ctx, cx + x, cy + y, color);
        plotPixel(ctx, cx - x, cy + y, color);
        plotPixel(ctx, cx + x, cy - y, color);
        plotPixel(ctx, cx - x, cy - y, color);
        plotPixel(ctx, cx + y, cy + x, color);
        plotPixel(ctx, cx - y, cy + x, color);
        plotPixel(ctx, cx + y, cy - x, color);
        plotPixel(ctx, cx - y, cy - x, color);

        if (p < 0) {
            p += 2 * x + 3;
        } else {
            p += 2 * (x - y) + 5;
            y--;
        }
        x++;
    }
}

// Posiciones orbitales
function getOrbitalPositions(cx, cy, r, n) {
    let positions = [];

    for (let i = 0; i < n; i++) {
        let angle = (2 * Math.PI * i) / n;

        let x = cx + r * Math.cos(angle);
        let y = cy + r * Math.sin(angle);

        positions.push({x, y});
    }

    return positions;
}

// Generar polígono
function getPolygonVertices(cx, cy, radius, sides) {
    let vertices = [];

    for (let i = 0; i < sides; i++) {
        let angle = (2 * Math.PI * i) / sides;
        let x = cx + radius * Math.cos(angle);
        let y = cy + radius * Math.sin(angle);

        vertices.push({x, y});
    }

    return vertices;
}

// Dibujar polígono con Bresenham
function drawPolygon(vertices) {
    for (let i = 0; i < vertices.length; i++) {
        let next = (i + 1) % vertices.length;

        bresenhamLine(
            vertices[i].x,
            vertices[i].y,
            vertices[next].x,
            vertices[next].y
        );
    }
}

// -------- MAIN --------

let cx = 300;
let cy = 300;

let R = Math.floor(Math.random() * 100) + 150;
let N = Math.floor(Math.random() * 7) + 4; // 4 a 10
let K = Math.floor(Math.random() * 5) + 3; // lados

midpointCircle(cx, cy, R);

let positions = getOrbitalPositions(cx, cy, R, N);

positions.forEach(pos => {
    let poly = getPolygonVertices(pos.x, pos.y, 20, K);
    drawPolygon(poly);
});