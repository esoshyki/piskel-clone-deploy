export default class DataLoader {
    constructor(App) {
        this.app = App;
        this.API_KEY = '2887c5cdabcfdda6eb369774636e205dc3fbb66527438b259580c3f60db977f9';
        this.canvas_center = this.app.app.canvas_center;
    }

    handleInput(e) {
        if (e.which === 13) {
            const value = e.target.value;
            this.getRandomImage(value);
        }
    }

    async getRandomImage(_town) {

        const town = _town ? _town.split(' ').join('') : "Minsk";

        const url = `https://api.unsplash.com/photos/random?query=town,${town}&client_id=${this.API_KEY}`;
        await fetch(url).then(res => res.json())
                        .then(data => this.canvas_center.load_image.call(this.canvas_center, data.urls.small))
                        .catch(err => this.canvas_center.load_image.call(this.canvas_center, '../src/js/DataLoad/data/testImage.png'))
        }


    start() {
        this.app.input.addEventListener('keyup', this.handleInput.bind(this)) 
    }
}