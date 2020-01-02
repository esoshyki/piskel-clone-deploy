export default class Color {
    constructor(App) {

        this.app = App;
        this.color_content = document.createElement('div');
        this.current_color = document.createElement('div');
        this.previous_color = document.createElement('div');
        this.pallete = document.createElement('div');
        this.color_menu = document.createElement('div');

    }

    changeColor(color) {

        if (color !== this.app.current_color) {

            const new_previous_color = this.app.current_color;

            this.current_color.style.background = color;
            this.app.current_color = color;
            this.current_color.dataset.color = color;

            this.previous_color.style.background = new_previous_color;
            this.app.previous_color = new_previous_color;
            this.previous_color.dataset.color = new_previous_color;

        }

    }

    handle(e) {

        const { target } = e;
        if (target.className === '_item') {

            const { color } = target.dataset;
            this.changeColor(color);

        }

    }

    start() {

        const fragment = document.createDocumentFragment();
        this.color_content.className = '_color_menu';
        this.color_menu.className = '_colors';
        this.pallete.className = '_pallete';
        this.current_color.className = '_item';
        this.previous_color.className = '_item';

        const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#00008B', '#831383'];
        colors.forEach((el) => {

            const elem = document.createElement('div');
            elem.className = '_item';
            elem.dataset.color = el;
            elem.style.background = el;
            this.pallete.appendChild(elem);

        });
        this.current_color.style.background = this.app.current_color;
        this.current_color.dataset.color = this.app.current_color;
        this.previous_color.style.background = this.app.previous_color;
        this.previous_color.dataset.color = this.app.previous_color;

        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        line1.className = '_line'; line2.className = '_line';

        line1.appendChild(this.current_color);
        line2.appendChild(this.previous_color);
        const title1 = document.createElement('span');
        title1.innerHTML = 'Current Color';
        const title2 = document.createElement('span');
        title2.innerHTML = 'Previous Color';
        line1.appendChild(title1); line2.appendChild(title2);

        this.color_menu.appendChild(line1);
        this.color_menu.appendChild(line2);

        const title = document.createElement('h4');
        title.innerHTML = 'Color Pallete';

        this.color_content.appendChild(this.color_menu);
        this.color_content.appendChild(title);
        this.color_content.appendChild(this.pallete);
        fragment.appendChild(this.color_content);
        document.querySelector('.menu').appendChild(fragment);

        this.color_content.addEventListener('click', this.handle.bind(this));

    }
}
