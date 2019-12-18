export default class Pencil {
    constructor(App) {

        this.app = App;

    }

    drawSquare(square) {

        this.app.ctx.fillRect(square[0], square[1], square[2], square[2]);

    }

    draw(square) {

        const drawSquare = (sq) => {

            this.app.ctx.fillRect(sq[0], sq[1], sq[2], sq[2]);

        };

        const drawPath = (e, sq) => {

            const new_square = this.app.getSquare(e);
            if (new_square !== sq) {

                drawSquare(new_square);

            }

        };

        this.drawSquare(square);
        this.app.canvas.addEventListener('mousemove', drawPath);
        this.app.canvas.addEventListener('mouseup', () => {

            this.app.canvas.removeEventListener('mousemove', drawPath);

        });
        this.app.canvas.addEventListener('mouseleave', () => {

            this.app.canvas.removeEventListener('mousemove', drawPath);

        });

    }
}
