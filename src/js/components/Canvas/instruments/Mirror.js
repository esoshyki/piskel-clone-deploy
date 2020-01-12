export default class Mirror {
    constructor(canvas) {
        this.canvas = canvas
        this.draw = this.draw.bind(this);
    }


    draw(square, event) {
        const startX = square[0];
        const startY = square[1];
        const size = square[2];
        console.log(event.shiftKey)
        const canvas_size = this.canvas.canvas.width;

        const drawSquare = (x, y, _size) => {

            this.canvas.ctx.fillRect(x, y, _size, _size);

        };
        drawSquare(startX, startY, size );
        if (event.ctrlKey) {
            drawSquare(startX, (canvas_size - 1 - startY), size )
        }
        else if (event.shiftKey) {
            drawSquare(startX, (canvas_size - 1 - startY), size )  
            drawSquare((canvas_size - 1 - startX), startY, size )    
            drawSquare((canvas_size - 1 - startX), (canvas_size - 1 - startY), size)      
        }
        else {
            drawSquare((canvas_size - 1 - startX), startY, size )
        }

        const drawPath = (e, sq) => {

            const new_square = this.canvas.getSquare(e);
            const curX = new_square[0];
            const curY = new_square[1];

            if (curX !== startX || curY !== startY) {
                const mirrorX = (canvas_size - 1 - curX);
                const mirrorY = (canvas_size - 1 - curY);
                drawSquare(curX, curY, size);           
                if (event.ctrlKey) {
                    drawSquare(curX, mirrorY, size);
                }
                else if (event.shiftKey) {
                    drawSquare(curX, mirrorY, size);       
                    drawSquare(mirrorX, curY, size);
                    drawSquare(mirrorX, mirrorY, size);           
                }
                else {
                    drawSquare(mirrorX, curY, size);     
                }
                this.canvas.reload_frame()
            }

        };

        const remove = () => {
            this.canvas.shadow_canvas.style.zIndex = '5';
            this.canvas.canvas.removeEventListener('mousemove', drawPath);
            this.canvas.canvas.removeEventListener('mouseup', remove);
            this.canvas.canvas.removeEventListener('mouseleave', remove)
        }

        drawSquare(square);
        this.canvas.canvas.addEventListener('mousemove', drawPath, false);
        this.canvas.canvas.addEventListener('mouseup', remove);
        this.canvas.canvas.addEventListener('mouseleave', remove);
    }
}