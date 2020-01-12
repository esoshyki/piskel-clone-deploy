import Pensize from './components/Pensize';
import Color from './components/Color';
import DataMenu from './components/DataMenu';
import Instrument from './components/Instrument';
import Frames from './components/Frames/Frames';

export default class App {

    constructor(data) {

        this.pensize = data.pensize || 4;
        this.current_color = data.current_color || '#000001';
        this.previous_color = data.previous_color || '#ffffff';
        this.instrument = data.instrument || 'pencil';
        this.image_data = data.image_data || null;
        this.canvas_size = data.canvas_size || 512;

        this.pensize_controll = new Pensize(this);
        this.color_controll = new Color(this);
        this.frames = new Frames(this, data);
        this.data_menu = new DataMenu(this);
        this.instrument_control = new Instrument(this, data);

    }

    start() {

        this.instrument_control.start();
        this.pensize_controll.start();
        this.color_controll.start();
        this.frames.start();

        window.onunload = () => {

            const arr = this.frames.frames.reduce((a, b) => {

                const array = a;
                array.push(b.get_image_data.call(b));
                return array;

            }, []);
            localStorage.setItem('instrument', this.instrument);
            localStorage.setItem('current_color', this.current_color);
            localStorage.setItem('previous_color', this.previous_color);
            localStorage.setItem('pensize', this.pensize);
            localStorage.setItem('frames', arr.join('###'));
            localStorage.setItem('selected_frame', this.frames.selected);
            localStorage.setItem('player_speed', this.frames.player.speed);
            localStorage.setItem('canvas_size', this.canvas_size);

        };

    }
}
