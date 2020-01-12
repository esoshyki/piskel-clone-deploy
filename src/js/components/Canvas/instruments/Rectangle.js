import drawSquare from './functions/drawSquare';

export default class Rectangle {
    constructor(canvas) {
        this.canvas = canvas
    }

    draw(square) {
        this.canvas.path_canvas.style.zIndex = '6';
        const start_square = square;
        const path_ctx = this.canvas.path_ctx;
        const startX = start_square[0];
        const startY = start_square[1];
        const size = parseInt(square[2]);
        let shift_pressed = false;

        const drawRect = (new_square, _ctx) => {
            const ctx = _ctx || path_ctx;
            let curX, curY;
            if (shift_pressed) {
                if (Math.abs(new_square[0]) >= Math.abs(new_square[1])) {
                    curX = new_square[1];
                } 
                else {
                    curX = new_square[0];
                }
                curY = curX
            }
            else {
                curX = new_square[0]; 
                curY = new_square[1];
            }

            const deltaX = Math.floor(curX - startX) / size;
            const deltaY= Math.floor(curY - startY) / size;
            let x = startX; 
            let y = startY;
            const right = deltaX > 0 ? 1 : -1;
            const up = deltaY > 0 ? 1 : -1;
            console.log(`startX = ${startX}; startY = ${startY}`)
            console.log(`deltaX = ${deltaX}; deltaY = ${deltaY}`)
            for (let i = 0; i <= Math.abs(deltaX); i += 1) {
                drawSquare(ctx, x, startY, size);
                drawSquare(ctx, x, curY, size)
                x += right * size
            }

            for (let i = 0; i <= Math.abs(deltaY); i += 1) {
                drawSquare(ctx, startX, y, size);
                drawSquare(ctx, curX, y, size);
                y += up * size
            }
        }

        const drawPath = (e) => {

            if (e.shiftKey) {
                shift_pressed = true
            }
            const new_square = this.canvas.getSquare(e);
            if (new_square[0] !== start_square[0] || new_square[1] !== start_square[1]) {
                this.canvas.path_ctx.clearRect(0, 0, 32, 32)
                drawRect(new_square, this.canvas.path_ctx)

            }
        }

        const remove = (e) => {
            this.canvas.shadow_canvas.style.zIndex = '5';
            this.canvas.path_canvas.style.zIndex = '0';       
            this.canvas.path_canvas.removeEventListener('mousemove', drawPath);
            this.canvas.path_canvas.removeEventListener('mouseup', remove);
            this.canvas.path_canvas.removeEventListener('mouseleave', remove);     
            this.canvas.path_ctx.clearRect(0, 0, 32, 32);    
            drawRect(this.canvas.getSquare(e), this.canvas.ctx );       
            this.canvas.reload_frame()
        }

        this.canvas.path_canvas.addEventListener('mousemove', drawPath);
        this.canvas.path_canvas.addEventListener('mouseup', remove); 
        this.canvas.path_canvas.addEventListener('mouseleave', remove);
    }   
}