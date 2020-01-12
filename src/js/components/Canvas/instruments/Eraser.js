export default class Eraser {
    constructor(App) {
        this.app = App
    }

    clear(square) {

        const clearSquare = (square) => {
            this.app.ctx.clearRect(square[0], square[1], square[2], square[2]);
        }

        const clearPath = (e, sq) => {
            const new_square = this.app.getSquare(e);
            if (new_square !== sq) {

                clearSquare(new_square);
                this.app.reload_frame()

            }
        }

        const remove = () => {
            this.app.shadow_canvas.style.zIndex = '5';
            this.app.canvas.removeEventListener('mousemove', clearPath);
            this.app.canvas.removeEventListener('mouseup', remove);
            this.app.canvas.removeEventListener('mouseleave', remove)
        }

        clearSquare(square);
        this.app.canvas.addEventListener('mousemove', clearPath);
        this.app.canvas.addEventListener('mouseup', remove);
        this.app.canvas.addEventListener('mouseleave', remove);
    }

}