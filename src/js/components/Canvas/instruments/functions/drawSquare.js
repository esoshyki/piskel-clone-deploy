export default function drawSquare(ctx, x, y, size) {
    const _x = Math.floor(x / size) * size;
    const _y = Math.floor(y / size) * size;
    ctx.fillRect(_x, _y, size, size);
}