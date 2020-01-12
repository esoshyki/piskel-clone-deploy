export default class Circle {
    constructor(canvas) {
        this.canvas = canvas;
    }

    draw(square) {
        this.canvas.path_canvas.style.zIndex = '6';
        const start_square = square;
        const path_ctx = this.canvas.path_ctx;
        const startX = start_square[0];
        const startY = start_square[1];
        const size = parseInt(square[2]);
        let shift_pressed = false;

        const drawSquare = (ctx, x, y, size) => {
            ctx.fillRect(x, y, size, size)
        }

        const drawCircle = (new_square, _ctx) => {
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

            const radX = Math.abs((curX - startX) / 2);
            const radY = Math.abs((curY - startY) / 2);

            const right = curX > startX ? 1 : -1
            const up = curY > startY ? 1 : -1

            const centerX = startX + radX * right 
            const centerY = startY + radY * up ;

            let x = centerX; let y = centerY;
            for (let i=0; i<360; i+= 1) {
                x = Math.round(centerX + radX*Math.cos(1/Math.tan((radX/radY) * Math.tan(i))));
                y = Math.round(centerY + radY*Math.sin(1/Math.tan((radX/radY) * Math.tan(i))));
                // console.log(`x = ${x}; y = ${y}`)
                drawSquare(ctx, x, y, size)
            }
            
        }

        const drawPath = (e) => {
            if (e.shiftKey) {
                shift_pressed = true
            }

            const new_square = this.canvas.getSquare(e);
            if (new_square[0] !== start_square[0] || new_square[1] !== start_square[1]) {
                this.canvas.path_ctx.clearRect(0, 0, 32, 32)
                drawCircle(new_square, this.canvas.path_ctx) 
            }

        }

        const remove = (e) => {
            this.canvas.shadow_canvas.style.zIndex = '5';
            this.canvas.path_canvas.style.zIndex = '0';       
            this.canvas.path_canvas.removeEventListener('mousemove', drawPath);
            this.canvas.path_canvas.removeEventListener('mouseup', remove);
            this.canvas.path_canvas.removeEventListener('mouseleave', remove);     
            this.canvas.path_ctx.clearRect(0, 0, 32, 32);    
            drawCircle(this.canvas.getSquare(e), this.canvas.ctx );       
            this.canvas.reload_frame()
        }

        this.canvas.path_canvas.addEventListener('mousemove', drawPath);
        this.canvas.path_canvas.addEventListener('mouseup', remove); 
        this.canvas.path_canvas.addEventListener('mouseleave', remove);
        }   

    }
