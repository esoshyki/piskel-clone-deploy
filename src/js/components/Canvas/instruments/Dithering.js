export default class Dithering {
    constructor(canvas) {
        this.canvas = canvas;
    }

    draw(square) {

        const startX = square[0];
        const startY = square[1];
        const size = square[2];
        const ctx = this.canvas.ctx;

        const drawIf = (x, y) => {
            if (x % 2 === 0 && y % 2 === 0) {
                ctx.clearRect(x, y, 1, 1)
            }
            else if (x % 2 === 1 && y % 2 === 1) {
                ctx.clearRect(x, y, 1, 1)
            }
            else {
                ctx.fillRect(x, y, 1, 1)
            }
        }

        const drawSquare = (x, y) => {
            for (let i = 0; i < size; i++) {
                for (let k = 0; k < size; k ++) {
                    drawIf(x + i, y + k)
                }
            }
        }

        const drawPath = (e) => {
            const new_square = this.canvas.getSquare(e);
            const x = new_square[0];
            const y = new_square[1];

            if (x !== startX || y !== startY) {

                drawSquare(x, y);
                this.canvas.reload_frame()

            }

        };

        drawSquare(startX, startY)

        const remove = () => {
            this.canvas.shadow_canvas.style.zIndex = '5';
            this.canvas.canvas.removeEventListener('mousemove', drawPath);
            this.canvas.canvas.removeEventListener('mouseup', remove);
        }

        drawSquare(square);
        this.canvas.canvas.addEventListener('mousemove', drawPath, false);
        this.canvas.canvas.addEventListener('mouseup', remove);
    }
}