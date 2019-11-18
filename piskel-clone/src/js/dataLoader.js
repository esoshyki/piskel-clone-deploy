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
        this.imageData = null;

    }

    handleButton(e) {

        const val = e.target.getAttribute('val');
        if (val === 'image') {
            this.town = document.querySelector('._town').value;
            this.getRandomImage(this.town)
        }

        else if (e.target.className === '_grayscale') {
            if (this.imageData === null) {
                alert('Please, load the image before grayscaling');
                return
            }
            this.changeImageToGrayscale()
        }

        else if (e.target.className === '_clearcanvas') {
            this.clearCanvas()
        }

    }

    changeImageToGrayscale() {
        const data = this.grayscaleImageData(this.imageData);
        this.canvas.getContext('2d').putImageData(data, 0, 0)
        console.log(data)
    }

    grayscaleImageData(imageData) {
        const data = imageData.data
        for (var i = 0; i < data.length; i += 4) {
            var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]
            data[i] = brightness
            data[i + 1] = brightness
            data[i + 2] = brightness
        }
        return imageData
    }

    getImageData() {

        const canvas = this.canvas;
        const context = canvas.getContext('2d')
        return context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }

    drawImage(url) {

        this.clearCanvas()
        const ctx = this.canvas.getContext('2d');
        const img = new Image();
        img.src = url ? url : '../src/js/DataLoad/data/image.png';
        img.setAttribute('crossorigin', 'anonymous')
        let dWidth; let dHeight;
        
        img.onload = () => {

            const max = this.app.canvas.width;

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

            const dx = (max - dWidth)/2 > 0 ? (max - dWidth)/2 : 0
            const dy = (max - dHeight)/2 > 0 ? (max - dHeight)/2 : 0

            ctx.drawImage(img, dx, dy, dWidth, dHeight);
            this.imageData = this.getImageData();
            // this.imageURL = document.querySelector('.canvas_main').toDataURL('image/png')
            };
        }
        
    clearCanvas() {

        this.canvas.getContext('2d').clearRect(0,0,this.app.canvas.width,this.app.canvas.width)

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

        const menu = document.querySelector('._data_menu');
        menu.addEventListener('click', this.handleButton);

    }

    async getRandomImage(_town) {

        const town = _town ? _town.split(' ').join('') : "Minsk"

        const url = `https://api.unsplash.com/photos/random?query=town,${town}&client_id=${this.API_KEY}` ;
        await fetch(url).then(res => res.json()).then(data => { 
                try {

                    const src = data.urls.small;
                    this.drawImage(src)

                }

                catch(err) {

                    this.drawImage('../src/js/DataLoad/data/testImage.png')
                    
                }
         });

    }


}