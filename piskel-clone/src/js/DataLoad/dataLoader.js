import json4 from './data/4x4.json'
import json32 from './data/32x32.json'

export default class DataLoader {

    constructor(app) {

        this.app = app
        this.handleButton = this.handleButton.bind(this)
        this.canvas = app.canvas
        this.currentColorNode = document.querySelector('._current_color');
        this.API_KEY = '2887c5cdabcfdda6eb369774636e205dc3fbb66527438b259580c3f60db977f9';
        this.town = null;

    }

    handleButton(e) {

        const val = e.target.getAttribute('val');
        console.log(this.app.sizeControl.size)
        if (val === 'image') {
            this.town = document.querySelector('._town').value;
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
        const resize = this.app.sizeControl.size / this.canvas.width;
        console.log(`resize = ${resize}`)
        let dWidth; let dHeight;
        
        img.onload = () => {

            const max = this.app.canvas.width;
            console.log(`max = ${max}`)
            console.log(img.width, img.height)
            // img.width *= resize; img.height *= resize
            console.log(img.width, img.height)
            if (parseInt(img.width) >= parseInt(img.height)) {

                const k = (img.height/img.width)
                dWidth = max;
                dHeight = Math.floor(dWidth * k)
                
            }

            else {

                const k = (img.width/img.height)
                dHeight = max;
                dWidth = Math.floor(dHeight * k)

            }

            console.log(`dWidth = ${dWidth} dHeight = ${dHeight}`)

            const dx = (max - dWidth)/2 > 0 ? (max - dWidth)/2 : 0
            const dy = (max - dHeight)/2 > 0 ? (max - dHeight)/2 : 0

            ctx.drawImage(img, dx, dy, dWidth, dHeight);

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

    async getRandomImage(_town) {

        const town = _town ? _town.split(' ').join('') : "Minsk"
        const url = `https://api.unsplash.com/photos/random?query=town,${town}&client_id=${this.API_KEY}`

        await fetch(url).then(res => res.json()).then(data => { 
                try {

                    const src = data.urls.small;
                    console.log(src)
                    this.drawImage(src)

                }
                catch {

                    this.drawImage('../src/js/DataLoad/data/testImage.png')
                    
                }
         });

    }


}