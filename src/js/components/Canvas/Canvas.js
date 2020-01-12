import Pencil from './instruments/Pencil';
import Bucket from './instruments/Bucket';
import ColorPicker from './instruments/ColorPicker';
import create from '../CreateNode';
import Eraser from './instruments/Eraser';
import Stroke from './instruments/Stroke';
import Circle from './instruments/Circle';
import Rectangle from './instruments/Rectangle';
import Mirror from './instruments/Mirror';
import Dithering from './instruments/Dithering';
import AllPixelBucket from './instruments/AllPixelBucket';
import Lighten from './instruments/Lighten';
import Move from './instruments/Move';
import Transform from './Transform';

export default class Canvas {
    constructor(frames) {

        this.frames = frames;
        this.app = frames.app;

        this.content = create('div', {
            overflow: 'hidden'
        }, 'canvas-container');
        this.canvas = create('canvas', {
            width: `${this.app.canvas_size}px`,
            height: `${this.app.canvas_size}px`,
            overflow: 'hidden'
        }, 'canvas_main');
        this.shadow_canvas = create('canvas', {
            opacity: '0.6',
            width: `${this.app.canvas_size}px`,
            height: `${this.app.canvas_size}px`,
            overflow: 'hidden'
        }, 'shadow-canvas');
        this.path_canvas = create('canvas', {
            position: 'absolute',
            width: `${this.app.canvas_size}px`,
            height: `${this.app.canvas_size}px`,
            overflow: 'hidden'
        }, 'path-canvas');

        this.background = create('div', {
            position: 'absolute',
            width: `${this.app.canvas_size}px`,
            height: `${this.app.canvas_size}px`,
            overflow: 'hidden'      
        }, 'backround')
        this.path_canvas.height = 32;
        this.path_canvas.width = 32;

        this.ctx = this.canvas.getContext('2d');
        this.path_ctx = this.path_canvas.getContext('2d');

        this.pencil = new Pencil(this);
        this.bucket = new Bucket(this);
        this.color_picker = new ColorPicker(this);
        this.eraser = new Eraser(this);
        this.stroke = new Stroke(this);
        this.circle = new Circle(this);
        this.rectangle = new Rectangle(this);
        this.mirror = new Mirror(this);
        this.dithering = new Dithering(this);
        this.all_pixel_bucket = new AllPixelBucket(this);
        this.ligten = new Lighten(this);
        this.move = new Move(this);
        this.transform = new Transform(this);

        this.grayscale = this.grayscale.bind(this);
        this.reload_frame = this.reload_frame.bind(this);
        this.frame = null;
        document.querySelector('main').appendChild(this.content);

    }

    update_canvas_size() {

        this.change_by_size();

    }

    getSquare(e, _size) {

        const resize = this.app.canvas_size / this.canvas.width;
        const x = Math.floor((e.pageX - this.canvas.offsetLeft - this.content.offsetLeft) / resize);
        const y = Math.floor((e.pageY - this.canvas.offsetTop - this.content.offsetTop) / resize);
        const size = _size || parseInt(this.app.pensize);
        const startX = size * Math.floor(x / size);
        const startY = size * Math.floor(y / size);
        return [startX, startY, size];

    }

    grayscale() {

        if (this.app.image_data !== null) {

            this.changeImageToGrayscale();

        }

    }


    changeImageToGrayscale() {

        const grayscaleImageData = (imageData) => {

            const { data } = imageData;
            for (let i = 0; i < data.length; i += 4) {

                const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
                data[i] = brightness;
                data[i + 1] = brightness;
                data[i + 2] = brightness;

            }
            return imageData;

        };

        const image_data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.width);
        const data = grayscaleImageData(image_data);
        this.ctx.putImageData(data, 0, 0);

    }

    draw(e) {

        e.preventDefault();

        this.shadow_canvas.style.zIndex = '0';
        if (e.which === 1) {
            this.ctx.fillStyle = this.app.current_color ;
        }
        else if (e.which === 3) {
            this.ctx.fillStyle = this.app.previous_color;
        }

        const square = this.getSquare(e);
        let instrument;

        if (this.app.instrument === 'pencil') {
            instrument = this.pencil;
            this.pencil.draw(square);

        }

        if (this.app.instrument === 'fill_bucket') {

            this.bucket.draw(square);

        }

        if (this.app.instrument === 'color_picker') {

            this.color_picker.pick_color(square);

        }
        
        if (this.app.instrument === 'mirror') {

            this.mirror.draw(square, e);

        }

        if (this.app.instrument === 'eraser') {

            this.eraser.clear(square)

        }

        if (this.app.instrument === 'stroke') {
            this.path_ctx.fillStyle = this.app.current_color;
            this.stroke.draw(square)

        }

        if (this.app.instrument === 'circle') {
            this.path_ctx.fillStyle = this.app.current_color;
            this.circle.draw(square);
        }

        if (this.app.instrument === 'rectangle') {
            this.path_ctx.fillStyle = this.app.current_color;
            this.rectangle.draw(square);
        }

        if (this.app.instrument === 'dithering') {
            this.dithering.draw(square);
        }

        if (this.app.instrument ==='all_pixel_bucket') {
            this.all_pixel_bucket.draw(square);
        }

        if (this.app.instrument === 'lighten') {
            this.ligten.draw(square, e);
        }

        if (this.app.instrument === 'move') {
            this.app.pensize = 1;
            this.move.move(square, e);
        }

    }

    clear_canvas() {

        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);
        this.ctx.fillStyle = this.app.current_color;

    }

    reload_frame() {
        const image_data = this.canvas.toDataURL('image/png');
        this.frame.put_image_data(image_data);
    }

    reload_canvas(image_data) {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
        const image = new Image(this.canvas.width, this.canvas.width);
        image.src = image_data;
        image.onload = () => {

            this.ctx.drawImage(image, 0, 0);

        };

    }


    getImageData() {

        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

    }


    load_image(url) {

        this.clear_canvas();
        const img = new Image();
        img.src = url || '../src/js/DataLoad/data/image.png';
        img.setAttribute('crossorigin', 'anonymous');
        let dWidth; let dHeight;

        img.onload = () => {

            const max = this.canvas.width;

            if (parseInt(img.width) >= parseInt(img.height)) {

                const k = (img.height / img.width);
                dWidth = max;
                dHeight = Math.floor(dWidth * k);

            } else {

                const k = (img.width / img.height);
                dHeight = max;
                dWidth = Math.floor(dHeight * k);

            }

            const dx = (max - dWidth) / 2 > 0 ? (max - dWidth) / 2 : 0;
            const dy = (max - dHeight) / 2 > 0 ? (max - dHeight) / 2 : 0;

            this.ctx.drawImage(img, dx, dy, dWidth, dHeight);
            this.app.image_data = this.getImageData();

        };

    }

    change_by_size() {

        const image = new Image(this.app.canvas_size, this.app.canvas_size);
        image.src = this.canvas.toDataURL('image/png');
        this.canvas.width = this.app.canvas_size;
        this.canvas.height = this.app.canvas_size;
        image.setAttribute('crossorigin', 'anonymous');
        image.onload = () => {

            this.ctx.imageSmoothingEnabled = false;
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.width);

        };

    }

    shadow_handling(e) {

        const ctx = this.shadow_canvas.getContext('2d');
        this.shadow_canvas.style.zIndex = '5';
        ctx.fillStyle = 'grey';
        let size;
        if (this.app.instrument === 'all_pixel_bucket') {
            size = 1
        }
        else {
            size = this.app.pensize;
        }
        let start_square = this.getSquare(e, size); // Start position of mouse
        console.log(start_square)
        const draw_shadow = (sq) => {

            ctx.fillRect(sq[0], sq[1], sq[2], sq[2]);

        };

        const check_leaving_square = (sq) => start_square[1] === sq[1] && start_square[0] === sq[0];

        const clear_rect = () => {

            ctx.clearRect(start_square[0], start_square[1], start_square[2], start_square[2]);

        };

        draw_shadow(start_square);

        const mousemove = (event) => {
            let size;
            if (this.app.instrument === 'all_pixel_bucket') {
                size = 1
            }
            else {
                size = this.app.pensize;
            }
            const square = this.getSquare(event, size);
            if (!check_leaving_square(square)) {

                clear_rect();
                draw_shadow(square);
                start_square = square;

            }

        };

        this.content.addEventListener('mousemove', mousemove.bind(this));

    }


    resize() {

        [this.canvas, this.path_canvas, this.background, this.shadow_canvas].forEach(el => {
            const width = this.content.offsetWidth;
            const height = this.content.offsetHeight;
            const left = ((width - this.app.canvas_size) / 2);
            const top = ((height - this.app.canvas_size) / 2);
            el.style.left = `${left}px`;
            el.style.top = `${top}px`;
            el.style.width = `${this.app.canvas_size}px`;
            el.style.height = `${this.app.canvas_size}px`;
        })
    }

    mWheel(e) {
        const change = 32 * (e.deltaY / 100);
        e.preventDefault()
        const result = this.app.canvas_size + change
        this.app.canvas_size = result > 864 || result < 64 ? this.app.canvas_size : result;
        this.resize()
    }

    start() {


        this.canvas.width = 32; this.canvas.height = 32;
        this.shadow_canvas.width = 32; this.shadow_canvas.height = 32;
        this.content.appendChild(this.canvas);
        this.content.appendChild(this.path_canvas);
        this.content.appendChild(this.shadow_canvas);
        this.content.appendChild(this.background);
        this.ctx.imageSmoothingEnabled = false;
        this.content.oncontextmenu = () => false
        this.resize()
        this.content.addEventListener('mousedown', this.draw.bind(this));

        this.content.addEventListener('mouseenter', this.shadow_handling.bind(this));
        
        window.addEventListener('resize', this.resize.bind(this))
        this.content.addEventListener('wheel', this.mWheel.bind(this))
    }

    remove_canvas() {

        this.content.removeChild(this.canvas);

    }
}
