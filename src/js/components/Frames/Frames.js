import Frame from './Frame';
import Canvas from '../Canvas/Canvas';
import create from '../CreateNode';
import Player from '../Player/Player';

export default class Frames {
    constructor(app, data) {

        this.app = app;
        this.content = create('div', {}, 'frames-container');
        this.conteiner = create('div', {}, '__frames');
        this.add_frame_button = create('button', {}, '__add-frame');
        this.add_frame_button.innerHTML = 'Add Frame';

        this.frames = [];
        this.selected = parseInt(data.selected_frame) || 0;
        this.canvas = new Canvas(this);
        this.player = new Player(this.frames);
        this.get_selected_frame = this.get_selected_frame.bind(this);
        this.fake_node = create('div', {}, '__fake-node');

    }

    start() {

        this.canvas.start();

        if (localStorage.getItem('frames')) {

            this.frames = localStorage.getItem('frames')
                .split('###')
                .map((image_data, idx) => {

                    const frame = new Frame(this, idx);
                    frame.put_image_data.call(frame, image_data);
                    if (idx === this.selected) {

                        this.canvas.reload_canvas(image_data);
                        this.canvas.frame = frame;

                    }
                    return frame;

                });

        }

        this.player.frames = this.frames;

        document.querySelector('main').appendChild(this.content);

        this.content.appendChild(this.conteiner);
        this.content.appendChild(this.add_frame_button);
        if (this.frames.length) {

            this.redraw();

        } else {

            this.addFrame();

        }

        this.add_frame_button.addEventListener('click', this.addFrame.bind(this));

        this.conteiner.addEventListener('click', this.handle_click.bind(this));
        this.conteiner.addEventListener('mousedown', this.start_move.bind(this));


        const frame = this.frames[this.selected];
        this.add_selection(frame);
        this.player.start();

        this.canvas.transform.start();

        this.content.onunload = () => {

            const arr = this.frames.reduce((a, b) => {

                const array = a;
                array.push(b.get_image_data.call(b));
                return array;

            }, []);
            localStorage.setItem('frames', arr.join('###'));

            localStorage.setItem('selected_frame', this.selected);

        };

    }

    get_selected_frame() {

        return this.frames[this.selected];

    }

    addFrame() {

        const id = this.frames.length + 1;
        const frame = new Frame(this, id);
        this.frames.push(frame);
        this.redraw();

    }

    delete_all_frames() {

        const node = this.conteiner;
        while (node.firstChild) {

            node.firstChild.remove();

        }

    }

    redraw() {

        const container = this.conteiner;
        this.frames.map((el, idx) => {

            el.render(idx + 1, container);
            return el;

        });

    }

    remove_selection() {

        const frame = this.frames[this.selected];
        frame.remove_selection();

    }

    add_selection(frame) {

        frame.add_selection();

        this.canvas.reload_canvas(frame.get_image_data());

    }

    set_frame(target) {

        const position = target.dataset.position || target.parentNode.dataset.position;
        this.remove_selection();
        this.selected = position - 1;
        const frame = this.frames[this.selected];
        this.canvas.frame = frame;

        this.add_selection(frame);

    }

    copy_frame(id) {

        this.delete_all_frames();
        const copied_frame = this.frames[id];
        const new_frame = new Frame(this, id);
        const image = new Image();
        image.src = copied_frame.get_image_data();
        image.onload = () => new_frame.ctx.drawImage(image, 0, 0);
        const first_arr = this.frames.slice(0, id + 1);
        first_arr.push(new_frame);
        const second_arr = this.frames.slice(id + 1);
        this.frames = first_arr.concat(second_arr);
        this.player.frames = this.frames;
        this.redraw();

    }

    delete_frame(id) {

        const frame = this.frames[id - 1] ? this.frames[id - 1] : this.frames[id + 1];
        this.delete_all_frames();
        const first_arr = this.frames.slice(0, id);
        const second_arr = this.frames.slice(id + 1);
        this.frames = first_arr.concat(second_arr);
        this.selected = id - 1;
        this.player.frames = this.frames;
        this.redraw();
        this.add_selection(frame);
        this.canvas.frame = frame;

    }

    add_frame_to_position(index, id) {

        const prev_id = index;
        const cur_id = id;
        const prev_frame = this.frames[prev_id];
        const cur_frame = this.frames[cur_id];
        this.frames[prev_id] = cur_frame;
        this.frames[cur_id] = prev_frame;
        this.selected = cur_id;
        this.canvas.frame = prev_frame;
        this.redraw();
        this.player.frames = this.frames;

    }

    get_frame_by_index(id) {

        const first_arr = this.frames.slice(0, id + 1);
        const frame = first_arr.pop();
        const second_arr = this.frames.slice(id + 1);
        this.frames = first_arr.concat(second_arr);
        this.player.frames = this.frames;
        return frame;

    }

    start_move(e) {

        if (e.target.className === '__move') {

            this.set_frame(e.target.parentNode);
            const parent = e.target.parentNode;
            const start = e.pageY;
            const conteiner_size = this.conteiner.offsetHeight;
            const up_limit = this.conteiner.offsetTop - parent.offsetTop;
            const down_limit = this.conteiner.offsetTop + conteiner_size - parent.offsetTop - 96;
            parent.style.position = 'absolute';
            parent.style.zIndex = '100';
            const index = parent.dataset.position - 1;
            let path = 0;

            const move_frame = (pageY) => {

                path = pageY - start;
                if (path >= up_limit && path <= down_limit) {

                    parent.style.top = `${path}px`;

                }

            };

            const handler = (event) => move_frame(event.pageY);

            window.addEventListener('mousemove', handler);

            const mouseup = () => {

                window.removeEventListener('mousemove', handler);
                const item_size = Math.floor(conteiner_size / this.frames.length);
                const index_change = Math.round(path / item_size);
                parent.style.zIndex = '';
                this.add_frame_to_position(index, index + index_change);
                window.removeEventListener('mouseup', mouseup);

            };
            window.addEventListener('mouseup', mouseup);

        }

    }

    handle_click(e) {

        const class_name = e.target.className;

        if (class_name === '__item' || e.target.parentNode.className === '__item') {

            this.set_frame.call(this, e.target);

        } else if (class_name === '__copy') {

            const id = e.target.parentNode.dataset.position - 1;
            this.copy_frame(id);

        } else if (class_name === '__delete') {

            const id = e.target.parentNode.dataset.position - 1;
            this.delete_frame(id);

        }

    }
}
