import Pencil from "./instruments/Pencil";
import Bucket from "./instruments/Bucket";
import ColorPicker from "./instruments/ColorPicker";

export default class Canvas {
    constructor(App) {
        this.app = App;
        this.canvas = document.createElement('canvas');
        this.ctx;

        this.pencil = new Pencil(this);
        this.bucket = new Bucket(this);
        this.color_picker = new ColorPicker(this);

        this.grayscale = this.grayscale.bind(this);
    }

    update_canvas_size() {
        this.change_by_size();
    }

    getSquare(e) {
        const resize = 512 / this.canvas.width;
        const x = Math.floor((e.pageX - this.canvas.offsetLeft)/resize);
        const y = Math.floor((e.pageY - this.canvas.offsetTop)/resize);
        const size = (this.canvas.width / this.app.pensize) 
        const startX = size * Math.floor(x/size);
        const startY = size * Math.floor(y/size);
        return [startX, startY, size]
    }   

    grayscale() {
        if (this.app.image_data === null) {
            alert('Please, load the image before grayscaling');
            return
        }
        this.changeImageToGrayscale()
    }

    
    changeImageToGrayscale() {
        const image_data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.width)
        const data = this.grayscaleImageData(image_data);
        this.ctx.putImageData(data, 0, 0)
    }

    grayscaleImageData(imageData) {
        const data = imageData.data
        for (var i = 0; i < data.length; i += 4) {
            var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]
            data[i] = brightness
            data[i + 1] = brightness
            data[i + 2] = brightness
        }
        return imageData
    }

    draw(e) {
        e.preventDefault();
        this.ctx.fillStyle = this.app.current_color;
        const square = this.getSquare(e)

        if (this.app.instrument === 'pencil') {
            this.pencil.draw(square)
        }

        if (this.app.instrument === 'fill_bucket') {
            this.bucket.draw(square);
        }

        if (this.app.instrument === 'color_picker') {
            this.color_picker.pick_color(square)
        }
    }

    clear_canvas() {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.width);
        this.ctx.fillStyle = this.app.current_color;
    }

    getImageData() {
        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }


    load_image(url) {
        this.clear_canvas();
        const img = new Image();
        img.src = url ? url : '../src/js/DataLoad/data/image.png';
        img.setAttribute('crossorigin', 'anonymous')
        let dWidth; let dHeight;
        
        img.onload = () => {

            const max = this.canvas.width;

            if (parseInt(img.width) >= parseInt(img.height)) {

                const k = (img.height/img.width)
                dWidth = max;
                dHeight = Math.floor(dWidth * k)
                
            }

            else {

                const k = (img.width/img.height)
                dHeight = max;
                dWidth = Math.floor(dHeight * k)

            }

            const dx = (max - dWidth)/2 > 0 ? (max - dWidth)/2 : 0
            const dy = (max - dHeight)/2 > 0 ? (max - dHeight)/2 : 0

            this.ctx.drawImage(img, dx, dy, dWidth, dHeight);
            this.app.image_data = this.getImageData();
            };
    } 

    change_by_size() {
        const image = new Image(this.app.canvas_size, this.app.canvas_size);
        image.src = this.canvas.toDataURL('image/png');
        this.canvas.width = this.canvas.height = this.app.canvas_size;
        image.setAttribute('crossorigin', 'anonymous');
        image.onload = () => {
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.width)
        }
    }

    start() {

        this.canvas.className = 'canvas_main';
        this.canvas.width = this.app.canvas_size; this.canvas.height = this.app.canvas_size;
        document.querySelector('main').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        if (this.app.image_data) {
            const img = new Image(this.canvas.width, this.canvas.width);
            img.src = this.app.image_data;
            img.onload = () => this.ctx.drawImage(img, 0, 0)

        }
        else {
            this.clear_canvas();
        }
        this.canvas.addEventListener('mousedown', this.draw.bind(this))
        window.onunload = () => {
            this.app.image_data = this.canvas.toDataURL("image/png");
        }
    }
}