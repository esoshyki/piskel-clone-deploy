export default class Pensize {
    constructor(App) {
        this.app = App;
        this.line = document.createElement('div');
        this.selected = null;
    }

    handling(e) {
        if (e.target.classList[0] === '_item') {
            this.app.pensize = e.target.dataset.pensize;
            if (!e.target.classList.contains('selected')) {
                this.selected.classList.remove('selected');
                this.selected = e.target;
                e.target.classList.add('selected');
            }
        }
        console.log(this.app.pensize)
    }

    start() {
        const fragment = document.createDocumentFragment();
        const content = document.createElement('div');
        content.className = '_pen-size';
        const span = document.createElement('span');
        span.innerHTML = 'Pen size';
        this.line.className = '_line';
        [4,8,16].forEach(el => {
            const elem = document.createElement('div');
            elem.className = '_item';
            elem.innerHTML = `${el}x`;
            elem.dataset.pensize = el;
            if (el === 4) {
                elem.classList.add('selected');
                this.selected = elem;
            }
            this.line.appendChild(elem);
        })

        content.appendChild(span);
        content.appendChild(this.line);
        fragment.appendChild(content);
        document.querySelector('.menu').appendChild(fragment);

        this.line.addEventListener('click', this.handling.bind(this))
    }
}