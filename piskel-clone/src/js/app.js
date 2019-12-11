import Pensize from './components/Pensize';
import CanvasSize from './components/CanvasSize';
import Color from './components/Color';
import Canvas from './components/Canvas/Canvas';
import DataMenu from './components/DataMenu';
import Instrument from './components/Instrument';

export default class App {
    constructor(data) {

        this.pensize = data.pensize || 4;
        this.canvas_size = data.canvas_size || 128; 
        this.current_color = data.current_color || '#000000';
        this.previous_color = data.previous_color || '#ffffff';
        this.instrument = data.instrument || 'pencil';
        this.image_data = data.image_data || null;

        this.pensize_controll = new Pensize(this);
        this.canvas_size_controll = new CanvasSize(this);
        this.color_controll = new Color(this);
        this.canvas_center = new Canvas(this);
        this.data_menu = new DataMenu(this);
        this.instrument_control = new Instrument(this);
    }

    start() {
        this.instrument_control.start();
        this.pensize_controll.start();
        this.canvas_size_controll.start();
        this.color_controll.start();
        this.canvas_center.start();
        this.data_menu.start()
    }
}