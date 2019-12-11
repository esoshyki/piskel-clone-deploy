export default class CanvasSize {
    constructor(App) {
        this.app = App;
        this.content = document.createElement('div');
        this.selected = null;
    }

    handler(e) {
        console.log(e.target)
        if (e.target.classList[0] === '_item') {
            this.app.canvas_size = e.target.dataset.canvas_size;
            if (!e.target.classList.contains('selected')) {
                this.selected.classList.remove('selected');
                this.selected = e.target;
                e.target.classList.add('selected');
            };
        };
        console.log(this.app.canvas_size);
    };

    start() {
        this.content.className = '_change-canvas-size';
        const fragment = document.createDocumentFragment();
        [128, 256, 512].forEach(el => {
            const elem = document.createElement('div');
            elem.className = '_item';
            if (el === 128) {
                elem.classList.add('selected');
                this.selected = elem;
            }
            elem.innerHTML = `Canvas size ${el}x${el}`;
            elem.dataset.canvas_size = el;
            this.content.appendChild(elem);
        });
        fragment.appendChild(this.content);
        document.querySelector('.menu').appendChild(fragment);

        this.content.addEventListener('click', this.handler.bind(this))
    }
}