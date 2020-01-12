export default class Move {
    constructor(canvas) {
        this.canvas = canvas
    }

    move(square, event) {
        let pensize = this.canvas.app.pensize;
        const startX = square[0];
        const startY = square[1];
        console.log(this.canvas.canvas.width)
        const image_data = this.canvas.ctx.getImageData(0, 0, this.canvas.canvas.width, this.canvas.canvas.width)
        let x = startX;
        let y = startY

        const movePath = (e) => {

            this.canvas.app.pensize = 1;
            const sq = this.canvas.getSquare(e);
            
            const curX = sq[0];
            const curY = sq[1];
            const deltaX = curX - startX; 
            const deltaY = curY - startY;

            const simpleMove = () => {

                this.canvas.ctx.clearRect(0, 0, this.canvas.app.canvas_size, this.canvas.app.canvas_size);
                this.canvas.ctx.putImageData(image_data, deltaX, deltaY)
            }

            const altMove = () => {
                const ctx = this.canvas.ctx;
                const size = this.canvas.canvas.width;
                if (curX !== x) {
                    let overflow_x, rest_x;
                     if (x > curX) {
                        overflow_x = ctx.getImageData(0, 0, 1, size);
                        rest_x = ctx.getImageData(1, 0, size - 1, size);
                        ctx.clearRect(0, 0, size, size);
                        ctx.putImageData(overflow_x, size - 1, 0);
                        ctx.putImageData(rest_x, 0, 0);
                    }
                    else {
                        overflow_x = ctx.getImageData(size - 1 , 0, 1, size);
                        rest_x = ctx.getImageData(0, 0, size - 1, size);
                        ctx.clearRect(0, 0, size, size);
                        ctx.putImageData(overflow_x, 0, 0);
                        ctx.putImageData(rest_x, 1, 0);
                    }
                    x = curX
                }

                if (curY !== y) {
                    let overflow_y, rest_y;
                    if (y > curY) {
                        overflow_y = ctx.getImageData(0, 0, size, 1);
                        rest_y = ctx.getImageData(0, 1, size, size - 1);
                        ctx.clearRect(0, 0, size, size);
                        ctx.putImageData(overflow_y, 0, size - 1);
                        ctx.putImageData(rest_y, 0, 0);
                    }
                    else {
                        overflow_y = ctx.getImageData(0, size - 1, size, 1);
                        rest_y = ctx.getImageData(0, 0, size, size - 1);
                        ctx.clearRect(0, 0, size, size);
                        ctx.putImageData(overflow_y, 0, 0);
                        ctx.putImageData(rest_y, 0, 1);
                    }
                    y = curY;
                }


            }

            if (e.altKey) {
                altMove()
            }
            else {
                simpleMove()
            }

            this.canvas.reload_frame()

        };

        
        const remove = () => {
            this.canvas.shadow_canvas.style.zIndex = '5';
            this.canvas.canvas.removeEventListener('mousemove', movePath);
            this.canvas.canvas.removeEventListener('mouseup', remove);
            this.canvas.canvas.removeEventListener('mouseleave', remove)
            this.canvas.app.pensize = pensize;
        }

        this.canvas.canvas.addEventListener('mousemove', movePath, false);
        this.canvas.canvas.addEventListener('mouseup', remove);
        this.canvas.canvas.addEventListener('mouseleave', remove);
    }


}
