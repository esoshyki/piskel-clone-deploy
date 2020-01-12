export default class Lighten {
    constructor(canvas) {
        this.canvas = canvas
    }

    draw(square, event) {

        const rgb2hex = (val) => {

            const rgb = val.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? `#${
                (`0${parseInt(rgb[1], 10).toString(16)}`).slice(-2)
            }${(`0${parseInt(rgb[2], 10).toString(16)}`).slice(-2)
            }${(`0${parseInt(rgb[3], 10).toString(16)}`).slice(-2)}` : '';

        };

        const lighter = (rgba) => {
            const r = rgba[0];
            const g = rgba[1];
            const b = rgba[2];
            const tint_factor = 0.2;
            const newR = Math.floor(r + ( 255 - r ) * tint_factor);
            const newG = Math.floor(g + ( 255 - g ) * tint_factor);
            const newB = Math.floor(b + ( 255 - b ) * tint_factor);
            return rgb2hex(`rgba(${newR}, ${newG}, ${newB}, ${rgba[3]})`)
        }

        const darker = (rgba) => {
            const r = rgba[0];
            const g = rgba[1];
            const b = rgba[2];
            const shade_factor = 0.2;
            const newR = Math.floor(r * ( 1 - shade_factor));
            const newG = Math.floor(g * ( 1 - shade_factor));
            const newB = Math.floor(b * ( 1 - shade_factor));
            return rgb2hex(`rgba(${newR}, ${newG}, ${newB}, ${rgba[3]})`)
        }

        const getColor = (_x, _y) => {

            const { data } = this.canvas.ctx.getImageData(_x, _y, 1, 1);
            const r = data[0];
            const g = data[1];
            const b = data[2];
            const a = data[3];

            return [r, g, b, a]
          
        };

        const x = square[0];
        const y = square[1];
        const size = square[2];

        for (let i = 0; i < size; i += 1) {
            for (let k = 0; k < size; k += 1) {
                const color = getColor(x, y);
                let new_color;
                if (event.ctrlKey) {
                    new_color = darker(color)
                }
                else {
                    new_color = lighter(color);
                }

                this.canvas.ctx.fillStyle = new_color;
                this.canvas.ctx.fillRect(x + i, y + k, 1, 1);
                this.canvas.ctx.fillStyle = this.canvas.app.current_color;
                this.canvas.reload_frame()
            }
        }

    }
}