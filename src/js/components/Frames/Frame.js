import create from '../CreateNode';

export default class Frame {
    constructor(frames_field, id) {

        this.body = create('div', {
            width: '96px',
            height: '96px',
        }, '__item');

        this.canvas = create('canvas', {
            width: '96px',
            height: '96px',
        }, '__canvas');
        this.canvas.width = 32;
        this.canvas.height = 32;

        this.number = create('div', {}, '__number');
        this.copy = create('div', {}, '__copy');
        this.delete = create('div', {}, '__delete');
        this.move = create('div', {}, '__move');

        this.body.appendChild(this.canvas);
        this.body.appendChild(this.number);
        this.body.appendChild(this.copy);
        this.body.appendChild(this.delete);
        this.body.appendChild(this.move);

        this.ctx = this.canvas.getContext('2d');

        this.frames_field = frames_field;
        this.app = this.frames_field.app;
        this.id = id;

        this.render = this.render.bind(this);
        this.main_canvas = this.frames_field.canvas;
        this.get_image_data = this.get_image_data.bind(this);

    }

    render(number, container) {

        this.body.dataset.position = number;
        this.body.style.position = 'relative';
        this.body.style.top = '0';
        this.id = number;
        this.number.innerHTML = number;
        container.appendChild(this.body);
        if (this.frames_field.frames.length <= 1) {

            this.delete.style.visibility = '0';
            this.move.style.top = '24px';

        } else {

            this.delete.style.visibility = '1';
            this.move.style.top = '0';

        }

    }

    add_selection() {

        this.body.classList.add('selected');

    }

    remove_selection() {

        this.body.classList.remove('selected');

    }

    put_image_data(image_data) {

        const img = new Image(this.canvas.width, this.canvas.width);
        img.src = image_data;
        img.onload = () => this.ctx.drawImage(img, 0, 0);

    }

    get_image_data() {

        return this.canvas.toDataURL('image/png');

    }
}
