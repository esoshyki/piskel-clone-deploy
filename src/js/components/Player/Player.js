import create from '../CreateNode';
import GifCreator from './GifCreator';

export default class Player {
    constructor(frames) {

        this.frames = frames;
        this.gifCreator = new GifCreator(this);
        this.content = create('div', {
            display: 'flex',
            flexDirection: 'column',
            padding: '0',
            minWidth: '100px',
            margin: '0 10px 10px 10px',
        }, 'player');

        this.player_canvas_container = create('div', {
            width: '192px',
            height: '192px',
            border: '2px solid yellow',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }, '__player-canvas-container');

        this.player_canvas = create('canvas', {
            width: '32px',
            height: '32px',
            margin: 'auto',
            imageRendering: 'pixelated',
        }, '_canvas');
        this.player_canvas.width = 32;
        this.player_canvas.height = 32;
        this.canvas_size = 32;
        this.ctx = this.player_canvas.getContext('2d');

        this.speed = parseInt(localStorage.getItem('player_speed')) || 12;

        this.speed_node = create('span', {
            fontSize: '1.2rem',
            color: 'black',
            textAlign: 'center',
            margin: '5px 0',
        }, '_speed');
        this.speed_node.innerHTML = `${this.speed} x `;

        this.input = create('input', {
            margin: '2px 0',
        }, '_range');
        this.input.min = '0';
        this.input.max = '24';
        this.input.type = 'range';
        this.input.value = this.speed;

        this.interval = null;
        this.index = 0;
        this.full_screen = false;

        this.canvasSizeConteiner = create('div', {
            display: 'flex',
            flexDirection: 'row',
            height: '50px',
            marginBottom: '5px',
        }, '__change-canvas-size');

        [1, 6, 'Full'].forEach((el) => {

            const elem = create('button', {
                width: '100%',
                height: '50px',
                margin: '0 5px 0 5px',
            }, '__item');
            elem.innerHTML = el;
            if (el === 1) elem.dataset.size = 32;
            if (el === 6) elem.dataset.size = 192;
            if (el === 'Full') elem.dataset.size = 'full';
            elem.addEventListener('click', this.changeSize.bind(this));
            this.canvasSizeConteiner.appendChild(elem);

        });

        this.menu = create('div', {
            display: 'flex',
            flexDirection: 'row',
            height: '70px'
        }, '__menu');

        this.saveGif = create('button', {
            width: '60px',
            height: '60px'
        }, '__saveGIf')

        this.content.appendChild(this.canvasSizeConteiner);

    }

    changeSize(e) {

        const size = e.target.dataset.size;
        if (parseInt(size)) {

            this.canvas_size = parseInt(size);
            this.changeCanvasSize(parseInt(size));

        } else {

            this.player_canvas_container.requestFullscreen();

        }

    }

    fullScreenHandle() {

        if (this.full_screen) {

            this.full_screen = false;
            this.changeCanvasSize(this.canvas_size);

        } else {

            this.full_screen = true;
            this.changeCanvasSize(512);

        }

    }

    changeCanvasSize(size) {

        this.player_canvas.style.width = `${size}px`;
        this.player_canvas.style.height = `${size}px`;

    }

    update_speed_node() {

        this.speed_node.innerHTML = `${this.speed} x`;

    }

    animate() {

        const frames = this.frames;
        if (this.index >= frames.length) {

            this.index = frames.length - 1;

        }
        const frame = frames[this.index];
        const data = frame.get_image_data();
        const image = new Image(this.canvas_size, this.canvas_size);
        image.src = data;
        image.onload = () => {

            this.ctx.clearRect(0, 0, this.canvas_size, this.canvas_size);
            this.ctx.drawImage(image, 0, 0);

        };
        const index = this.index + 1 >= frames.length ? 0 : this.index + 1;
        this.index = index;

    }

    start() {

        this.player_canvas_container.appendChild(this.player_canvas);
        this.content.appendChild(this.player_canvas_container);
        this.content.appendChild(this.speed_node);
        this.content.appendChild(this.input);
        this.menu.appendChild(this.saveGif);
        this.content.appendChild(this.menu);
        document.querySelector('main').appendChild(this.content);
        this.input.addEventListener('change', (e) => {

            this.speed = e.target.value;
            this.update_speed_node();
            window.clearInterval(this.interval);
            if (this.speed != 0) {

                this.interval = setInterval(this.animate.bind(this), Math.floor(1000 / this.speed));

            }

        });

        this.interval = setInterval(this.animate.bind(this), Math.floor(1000 / this.speed));
        document.addEventListener('fullscreenchange', this.fullScreenHandle.bind(this));

        this.saveGif.addEventListener('click', this.gifCreator.createGif)

    }
}
