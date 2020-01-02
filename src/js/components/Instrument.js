export default class Instrument {
    constructor(App, data) {

        this.app = App;
        this.content = document.createElement('div');
        this.instruments = [
            'pencil', 'fill_bucket', 'color_picker', 'test',
        ];
        this.selected = data.instrument || 'pencil';

    }

    changeCursor() {

        const { instrument } = this.app;
        const target = this.app.frames.canvas.content;
        if (instrument === 'pencil') {

            target.style.cursor = "url('../src/assets/cursors/pencil.cur'), pointer";

        } else if (instrument === 'fill_bucket') {

            target.style.cursor = "url('../src/assets/cursors/bucket.cur'), pointer";

        } else if (instrument === 'color_picker') {

            target.style.cursor = "url('../src/assets/cursors/color-picker.cur'), pointer";

        }

    }

    handler(e) {

        const { target } = e;
        if (target.dataset.instrument !== this.app.instrument) {

            this.selected.classList.remove('selected');
            target.classList.add('selected');
            this.selected = target;
            this.app.instrument = target.dataset.instrument;
            this.changeCursor();

        }

    }

    start() {

        this.content.className = 'instrument-panel';
        this.instruments.forEach((val) => {

            const el = document.createElement('div');
            el.className = '_item';
            if (val === this.app.instrument) {

                el.classList.add('selected');
                this.selected = el;

            }
            el.dataset.instrument = val;
            this.content.appendChild(el);

        });
        this.changeCursor();
        document.querySelector('.menu').appendChild(this.content);

        this.content.addEventListener('click', this.handler.bind(this));
        document.querySelector('body').style.cursor = 'auto';

        window.onunload = () => {

            localStorage.setItem('instrument', this.selected);

        };

    }
}
