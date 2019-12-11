export default class DataMenu {
    constructor(App) {
        this.app = App;
        this.input = document.createElement('input');
        this.grayscale = document.createElement('div');
        this.clear_canvas = document.createElement('div');
    }

    start() {
        const fragment = document.createDocumentFragment();
        const content = document.createElement('div');
        content.className = '_data_menu';
        const load_random_image = document.createElement('div');
        load_random_image.className = 'menu_button';
        load_random_image.dataset.value = 'image';
        const city_menu = document.createElement('div');

        city_menu.className = '_data_menu_town';
        const title = document.createElement('h4');
        title.innerHTML = 'Load random image'
        const label = document.createElement('label');
        label.className = '_label';
        label.innerHTML = 'Choose Town';
        city_menu.appendChild(title);
        city_menu.appendChild(label);
        city_menu.appendChild(this.input)

        this.grayscale.className = '_grayscale';
        this.grayscale.innerHTML = 'To grayscale';
        this.clear_canvas.className = '_clearcanvas';
        this.clear_canvas.innerHTML = 'Clear canvas';
        content.appendChild(city_menu);
        content.appendChild(this.grayscale);
        content.appendChild(this.clear_canvas);
        fragment.appendChild(content);
        document.querySelector('main').appendChild(fragment);
    }
}