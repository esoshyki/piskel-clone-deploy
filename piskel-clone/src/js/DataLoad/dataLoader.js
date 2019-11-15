import json4 from './data/4x4.json'
import json32 from './data/32x32.json'

export default class DataLoader {

    constructor(canvas) {

        this.handleButton = this.handleButton.bind(this)
        this.canvas = canvas
        this.currentColorNode = document.querySelector('._current_color');
        this.API_KEY = '2887c5cdabcfdda6eb369774636e205dc3fbb66527438b259580c3f60db977f9';
        this.town = document.querySelector('._town').value

    }

    handleButton(e) {

        const val = e.target.getAttribute('val');

        if (val === 'image') {
            this.getRandomImage(this.town)
        }

        else {
            this.drawCanvasFromJSON(val)
        }

    }

    drawImage(url) {

        this.clearCanvas()
        const ctx = this.canvas.getContext('2d');
        const img = new Image();
        img.src = url ? url : '../src/js/DataLoad/data/image.png';
      
        img.onload = () => {
            const dx = (512 - img.height)/2 > 0 ? (512 - img.height)/2 : 0
            const dy = (512 - img.width)/2 > 0 ? (512 - img.width)/2 : 0
                ctx.drawImage(img, dx, dy);
            };

        }
        
    clearCanvas() {

        this.canvas.getContext('2d').clearRect(0,0,512,512)

    }

    drawHex(size, arr) {

        const box = 512 / size
        const ctx = this.canvas.getContext('2d');
        let x = 0, y = 0
        arr.forEach(row => {
            row.forEach(col => {
                ctx.fillStyle = `#${col}`
                ctx.fillRect(x, y, x+box, y+box)
                x += box
            })
            y += box
            x = 0
        })

    }

    drawRGBA(size, arr) {

        const box = 512 / size
        const ctx = this.canvas.getContext('2d');
        let x = 0, y = 0;

        arr.forEach(row => {
            row.forEach(col => {
                const str = `rgba(${col.reduce((a,b,i) => {a += i !==3 ? `${b}, ` : `${b}`; return a}, '')})`
                ctx.fillStyle = str
                ctx.fillRect(x, y, x+box, y+box)
                x += box
            })
            y += box
            x = 0
        })

    }

    drawCanvasFromJSON(size) {

        if (!size) return
        if (size === '4') this.drawHex(size, json4);
        if (size === '32') this.drawRGBA(size, json32) ;
        this.canvas.getContext('2d').fillStyle = this.currentColorNode.style.background

    }

    start() {

        const menu = document.querySelector('.menu');
        menu.addEventListener('click', this.handleButton);

    }

    getRandomImage(_town) {
        const town = _town ? _town : "Minsk"
        const url = `https://api.unsplash.com/photos/random?query=town,${town}&client_id=${this.API_KEY}`

        fetch(url).then(res => res.json()).then(data => { 
                try {
                    this.drawImage(data.urls.small)
                }
                catch {
                    this.drawImage('../src/js/DataLoad/data/testImage.png')
                }
         });

    }


}