export default class Bucket {
    constructor(App) {
        this.app = App;

    }

    draw(square) {
        const rgb2hex = (rgb) => {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? "#" +
             ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
             ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
             ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
           }
           
        const getColor = (square) => {
            const data = this.app.ctx.getImageData(square[0]+2,square[1]+2,1,1).data
            return rgb2hex(`rgba(${data[0]},${data[1]},${data[2]},${data[3]}`);
        }

        const color = getColor(square);
        console.log(color);
        const size = this.app.canvas.width;

        const getUpperColor = (square) => {
            const y = square[1] - square[2];
            if (y < 0) return false
            const newSquare = [square[0], y, square[2]]
            console.log(getColor(newSquare))
            return color === getColor(newSquare)
            }
        
        const getDownColor = (square) => {
            const y = square[1] + square[2];
            if (y > (size - square[2])) return false
            const newSquare = [square[0], y, square[2]];
            return color === getColor(newSquare)
            }
        
        const getLeftColor = (square) => {
            const x = square[0] - square[2];
            if (x < 0) return false
            const newSquare = [x, square[1], square[2]]
            return color === getColor(newSquare)
        }
        
        const getRightColor = (square) => {
            const x = square[0] + square[2];
            if (x > (size - square[2])) return;
            const newSquare = [x, square[1], square[2]]
            return color === getColor(newSquare)
        }

        if (color === this.app.app.current_color) return null;
            
        let x, y, z
        const leftPoints = []; const rightPointes = [];
        const leftRightCheck = (square) => {
            if (getLeftColor(square)) {
                let x = square[0]-square[2]; let y = square[1]; let z = square[2];
                leftPoints.push([x,y,z])
            }
        
            if (getRightColor(square)) {
                let x = square[0]+square[2]; let y = square[1]; let z = square[2];
                rightPointes.push([x,y,z])
            }
        }

        const travel = (square) => {

            x = square[0]; y = square[1]; z = square[2]
    
            while(getUpperColor([x,y,z])) {
                y -= z;
            }
    
            this.app.ctx.fillRect(x,y,z,z)
    
            while(getDownColor([x,y,z])) {

                this.app.ctx.fillRect(x,y,z,z)
                leftRightCheck([x,y,z])
                y += z

            }

            leftRightCheck([x,y,z])
            this.app.ctx.fillRect(x,y,z,z)
        }

        travel(square)

        while (rightPointes.length > 0) {
            travel(rightPointes.pop())
        }

        while (leftPoints.length > 0) {
            travel(leftPoints.pop())
        }
    }
};