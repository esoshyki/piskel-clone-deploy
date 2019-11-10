export default class ColorControll {
    constructor(canvas, ctx) {

        this.canvas = canvas;
        this.ctx = ctx
        this.ctx.fillStyle = '#000000';
        this.currentColor = '#000000';
        this.previousColor = '#ffffff';
        this.pallete = document.querySelector('._color_menu');
        this.currentColorNode = this.pallete.querySelector('._current_color');
        this.previousColorNode = this.pallete.querySelector('._prev_color');
        this.currentColorNode.style.background = this.currentColor
        this.previousColorNode.style.background = this.previousColor

        this.getColor = this.getColor.bind(this);
        this.pickColor = this.pickColor.bind(this);
        this.checkColor = this.checkColor.bind(this);
        this.changeColorPallete = this.changeColorPallete.bind(this)
        this.previousColorClickHandler = this.previousColorClickHandler.bind(this);
        this.colorPalette = document.querySelector('._rainbow')

    }

    //Function to convert hex format to a rgb color
    rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
   }
   
    getColor(square) {

        const data = this.ctx.getImageData(square[0]+2,square[1]+2,1,1).data
        return this.rgb2hex(`rgba(${data[0]},${data[1]},${data[2]},${data[3]}`);

    }

    pickColor(square) {

        const color = this.getColor(square)
        if (this.ctx.fillStyle === color) return
        this.changeColorPallete(color)

    }

    checkColor(square) {

        return this.getColor(square) === this.ctx.fillStyle

    }

    changeColorPallete(color) {

        if (this.currentColor === color) return
        this.previousColor = this.currentColor;
        this.currentColor = color;
        this.ctx.fillStyle = color
        this.previousColorNode.style.background = this.currentColorNode.style.background;
        this.currentColorNode.style.background = color

    }

    previousColorClickHandler() {

        const prevData = this.previousColor;
        const prevString = prevData
        this.changeColorPallete(prevString)

    }

    start() {

        this.colorPalette.addEventListener('click', (e) => {
            if (e.target.className !== '_item') return

            const color = e.target.getAttribute('color')
            this.changeColorPallete(color)
        })
        
    }
}