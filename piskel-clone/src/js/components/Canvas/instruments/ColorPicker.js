export default class ColorPicker {
    constructor(App) {

        this.app = App;

    }

    pick_color(square) {

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
        this.app.app.color_controll.changeColor(color);

    }
}
