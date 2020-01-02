import Pencil from './instruments/Pencil';
import Bucket from './instruments/Bucket';
import ColorPicker from './instruments/ColorPicker';
import create from '../CreateNode';

export default class Canvas {
    constructor(frames) {

        this.frames = frames;
        this.app = frames.app;

        this.content = create('div', {}, 'canvas-container');
        this.canvas = create('canvas', {}, 'canvas_main');
        this.shadow_canvas = create('canvas', {
            opacity: '0.6',
        }, 'shadow-canvas');
        this.ctx = this.canvas.getContext('2d');

        this.pencil = new Pencil(this);
        this.bucket = new Bucket(this);
        this.color_picker = new ColorPicker(this);

        this.grayscale = this.grayscale.bind(this);
        this.frame = null;
        document.querySelector('main').appendChild(this.content);

    }

    update_canvas_size() {

        this.change_by_size();

    }

    getSquare(e) {

        const resize = 512 / this.canvas.width;
        const x = Math.floor((e.pageX - this.content.offsetLeft) / resize);
        const y = Math.floor((e.pageY - this.content.offsetTop) / resize);
        const size = this.app.pensize;
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
        this.ctx.fillStyle = this.app.current_color;
        const square = this.getSquare(e);

        if (this.app.instrument === 'pencil') {

            this.pencil.draw(square);

        }

        if (this.app.instrument === 'fill_bucket') {

            this.bucket.draw(square);

        }

        if (this.app.instrument === 'color_picker') {

            this.color_picker.pick_color(square);

        }

        const image_data = this.canvas.toDataURL('image/png');
        this.frame.put_image_data(image_data);

    }

    clear_canvas() {

        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);
        this.ctx.fillStyle = this.app.current_color;

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
        let start_square = this.getSquare(e); // Start position of mouse

        const draw_shadow = (sq) => {

            ctx.fillRect(sq[0], sq[1], sq[2], sq[2]);

        };

        const check_leaving_square = (sq) => start_square[1] === sq[1] && start_square[0] === sq[0];

        const clear_rect = () => {

            ctx.clearRect(start_square[0], start_square[1], start_square[2], start_square[2]);

        };

        draw_shadow(start_square);

        const mousemove = (event) => {

            const square = this.getSquare(event);
            if (!check_leaving_square(square)) {

                clear_rect();
                draw_shadow(square);
                start_square = square;

            }

        };

        this.content.addEventListener('mousemove', mousemove.bind(this));

    }

    start() {

        this.canvas.width = 32; this.canvas.height = 32;
        this.shadow_canvas.width = 32; this.shadow_canvas.height = 32;
        this.content.appendChild(this.canvas);
        this.content.appendChild(this.shadow_canvas);
        this.ctx.imageSmoothingEnabled = false;

        this.content.addEventListener('mousedown', this.draw.bind(this));

        this.content.addEventListener('mouseenter', this.shadow_handling.bind(this));

    }

    remove_canvas() {

        this.content.removeChild(this.canvas);

    }
}
