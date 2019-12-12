export default class Bucket {
    constructor(App) {

        this.app = App;

    }

    draw(square) {

        const rgb2hex = (val) => {

            const rgb = val.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? `#${
                (`0${parseInt(rgb[1], 10).toString(16)}`).slice(-2)
            }${(`0${parseInt(rgb[2], 10).toString(16)}`).slice(-2)
            }${(`0${parseInt(rgb[3], 10).toString(16)}`).slice(-2)}` : '';

        };

        const getColor = (sq) => {

            const { data } = this.app.ctx.getImageData(sq[0] + 2, sq[1] + 2, 1, 1);
            return rgb2hex(`rgba(${data[0]},${data[1]},${data[2]},${data[3]}`);

        };

        const color = getColor(square);
        const size = this.app.canvas.width;

        const getUpperColor = (sq) => {

            const y = sq[1] - sq[2];
            if (y < 0) return false;
            const newSquare = [sq[0], y, sq[2]];
            return color === getColor(newSquare);

        };

        const getDownColor = (sq) => {

            const y = sq[1] + sq[2];
            if (y > (size - sq[2])) return false;
            const newSquare = [sq[0], y, sq[2]];
            return color === getColor(newSquare);

        };

        const getLeftColor = (sq) => {

            const x = sq[0] - sq[2];
            if (x < 0) return false;
            const newSquare = [x, sq[1], sq[2]];
            return color === getColor(newSquare);

        };

        const getRightColor = (sq) => {

            const x = sq[0] + sq[2];
            if (x > (size - sq[2])) return;
            const newSquare = [x, sq[1], sq[2]];
            return color === getColor(newSquare);

        };

        if (color === this.app.app.current_color) return null;

        let x; let y; let
            z;
        const leftPoints = []; const rightPointes = [];
        const leftRightCheck = (sq) => {

            if (getLeftColor(sq)) {

                const a = sq[0] - sq[2]; const b = sq[1]; const c = sq[2];
                leftPoints.push([a, b, c]);

            }

            if (getRightColor(sq)) {

                const a = sq[0] + sq[2]; const b = sq[1]; const c = sq[2];
                rightPointes.push([a, b, c]);

            }

        };

        const travel = (sq) => {

            x = sq[0]; y = sq[1]; z = sq[2];

            while (getUpperColor([x, y, z])) {

                y -= z;

            }

            this.app.ctx.fillRect(x, y, z, z);

            while (getDownColor([x, y, z])) {

                this.app.ctx.fillRect(x, y, z, z);
                leftRightCheck([x, y, z]);
                y += z;

            }

            leftRightCheck([x, y, z]);
            this.app.ctx.fillRect(x, y, z, z);

        };

        travel(square);

        while (rightPointes.length > 0) {

            travel(rightPointes.pop());

        }

        while (leftPoints.length > 0) {

            travel(leftPoints.pop());

        }

    }
}
