export default class Instrument {
    constructor(App) {
        this.app = App;
        this.content = document.createElement('div');
        this.instruments = [
            'pencil', 'fill_bucket', 'color_picker', 'test'
        ]
        this.selected = null;
    };

    handler(e) {
        const target = e.target;
        if (target.dataset.instrument !== this.app.instrument) {
            this.selected.classList.remove('selected');
            target.classList.add('selected');
            this.selected = target;
            this.app.instrument = target.dataset.instrument;
        }
    }

    start() {
        this.content.className = 'instrument-panel';
        this.instruments.forEach(val => {
            const el = document.createElement('div');
            el.className = '_item';
            if (val === this.app.instrument) {
                el.classList.add('selected');
                this.selected = el;
            }
            el.dataset.instrument = val;
            this.content.appendChild(el);
        })
        document.querySelector('.menu').appendChild(this.content);

        this.content.addEventListener('click', this.handler.bind(this));
    }
}