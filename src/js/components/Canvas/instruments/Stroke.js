export default class Stroke {
    constructor(App) {
        this.app = App;
    }

    draw(square) {
        this.app.path_canvas.style.zIndex = '6'
        const start_square = square;
        let current_square = start_square;
        const path_ctx = this.app.path_ctx;

        const drawSquare = (ctx, x, y, size) => {
            ctx.fillRect(x, y, size, size);
        }

        const drawStroke = (start_sq, end_sq, _ctx) => {
            const ctx = _ctx || path_ctx;
            current_square = end_sq;
            const curX = end_sq[0]; const startX = start_sq[0];
            const curY = end_sq[1]; const startY = start_sq[1];
            const size = parseInt(start_sq[2]);
            const deltaX = curX - startX;
            const deltaY = curY - startY;
            const right = deltaX > 0 ? 1 : -1;
            const up = deltaY > 0 ? 1 : -1;
            let k;
            if (deltaX === 0 || deltaY === 0) {
                k = 0
            } 
            else {
                k = Math.abs(deltaY / deltaX);
            }
            let x = startX; let y = startY;
            drawSquare(ctx, [x, y, size]);
            for (let i = 0; i < Math.abs(deltaX); i += 1) {
                x += right;
                y += (k * up);

                drawSquare(ctx, x, Math.round(y), size)
            }
            x = startX; y = startY;
            if (k !== 0) {
                k = 1 / k
            }
            for (let i = 0; i < Math.abs(deltaY); i += 1) {
                x += (right * k);
                y += up ;
                drawSquare(ctx, Math.round(x), y, size)
            }
        }

        const drawPath = (e) => {

            const new_square = this.app.getSquare(e);
            if (new_square[0] !== current_square[0] || new_square[1] !== current_square[1]) {
                current_square = new_square
                this.app.path_ctx.clearRect(0, 0, 32, 32)
                drawStroke(start_square, new_square, this.app.path_ctx)

            }
        }
        drawSquare(this.app.path_ctx, start_square)
        
        const remove = () => {
            this.app.shadow_canvas.style.zIndex = '5';
            this.app.path_canvas.style.zIndex = '0';   
            this.app.canvas.removeEventListener('mousemove', drawPath);
            this.app.path_canvas.removeEventListener('mouseup', remove);
            this.app.path_canvas.removeEventListener('mouseleave', remove);
            this.app.path_ctx.clearRect(0, 0, 32, 32);   
            drawStroke(start_square, current_square, this.app.ctx);
            this.app.reload_frame()      
        }

        this.app.path_canvas.addEventListener('mousemove', drawPath);
        this.app.path_canvas.addEventListener('mouseup', remove); 
        this.app.path_canvas.addEventListener('mouseleave', remove);
    }
}