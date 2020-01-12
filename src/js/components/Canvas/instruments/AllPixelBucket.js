export default class AllPixelBucket {
    constructor(canvas) {
        this.canvas = canvas
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

            const { data } = this.canvas.ctx.getImageData(sq[0], sq[1], 1, 1);
            return rgb2hex(`rgba(${data[0]},${data[1]},${data[2]},${data[3]}`);

        };

        const size = this.canvas.canvas.width;
        const start_square = [square[0], square[1], 1];
        const color = getColor(start_square);

        
        let x = 0;
        let y = 0;

        for (let i = 0; i < size; i += 1) {
            for (let k = 0; k < size; k += 1) {
                const sq = [x + i, y + k, 1];
                const col = getColor(sq);
                if (col === color) {
                    this.canvas.ctx.fillRect(x + i, y + k, 1, 1);
                }
            }
        }
    }
}