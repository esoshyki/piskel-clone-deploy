export default class PaintBucket {
    constructor(canvas, ctx, colorControll, ratio) {
        this.canvas = canvas;
        this.size = this.canvas.offsetWidth;
        this.ctx = ctx;
        this.colorControll = colorControll;
        this.color = null;
        this.fillColor = null;
        this.leftSquaries = [];
        this.rightSquaries = [];
        this.ratio = ratio;
        this.scale = this.size / this.ratio
        this.startPath = this.startPath.bind(this)
    }

    getUpperColor(square) {
        const y = square[1] - square[2];
        if (y < 0) return false
        const newSquare = [square[0], y, square[2]]
        // console.log(newSquare)
        // console.log(`this.color = ${this.color}`);
        // console.log(`UpColor = ${this.colorControll.getColor(newSquare)}`)
        return this.color === this.colorControll.getColor(newSquare)
    }

    getDownColor(square) {
        const y = square[1] + square[2];
        if (y > (this.size - square[2])) return false
        const newSquare = [square[0], y, square[2]];
        // console.log(newSquare)
        // console.log(`this.color = ${this.color}`);
        // console.log(`DownColor = ${this.colorControll.getColor(newSquare)}`)
        return this.color === this.colorControll.getColor(newSquare)
    }

    getLeftColor(square) {
        const x = square[0] - square[2];
        if (x < 0) return false
        const newSquare = [x, square[1], square[2]]
        // console.log(newSquare)
        // console.log(`this.color = ${this.color}`);
        // console.log(`LeftColor = ${this.colorControll.getColor(newSquare)}`)
        return this.color === this.colorControll.getColor(newSquare)
    }

    getRightColor(square) {
        const x = square[0] + square[2];
        if (x > (this.size - square[2])) return;
        const newSquare = [x, square[1], square[2]]
        // console.log(newSquare)
        // console.log(`this.color = ${this.color}`);
        // console.log(`RightColor = ${this.colorControll.getColor(newSquare)}`)
        return this.color === this.colorControll.getColor(newSquare)
    }


    startPath(square) {
        this.color = this.colorControll.getColor(square)
        this.fillColor = this.colorControll.currentColor
        // console.log(`left: ${this.getLeftColor(square)}`);
        // console.log(`right: ${this.getRightColor(square)}`);
        // console.log(`up: ${this.getUpperColor(square)}`);
        // console.log(`down: ${this.getDownColor(square)}`)
        let x, y, z
        const leftPoints = []; const rightPointes = [];

        const leftRightCheck = (square) => {
            if (this.getLeftColor(square)) {
                let x = square[0]-square[2]; let y = square[1]; let z = square[2];
                leftPoints.push([x,y,z])
            }
    
            if (this.getRightColor(square)) {
                let x = square[0]+square[2]; let y = square[1]; let z = square[2];
                rightPointes.push([x,y,z])
            }
        }

        const travel = (square) => {

            x = square[0]; y = square[1]; z = square[2]
    
            while(this.getUpperColor([x,y,z])) {
                y -= z;
            }
    
            this.ctx.fillRect(x,y,z,z)
    
            while(this.getDownColor([x,y,z])) {
                console.log(this.getDownColor([x,y,z]))
                this.ctx.fillRect(x,y,z,z)
                leftRightCheck([x,y,z])
                y += z
            }
            leftRightCheck([x,y,z])
            this.ctx.fillRect(x,y,z,z)
        }

        travel(square)
        console.log(rightPointes, leftPoints)

        while (rightPointes.length > 0) {
            travel(rightPointes.pop())
        }

        while (leftPoints.length > 0) {
            travel(leftPoints.pop())
        }

    }


}