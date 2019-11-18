import './style/style.sass'
import App from './js/app'

const app = new App

app.start()

const imageData = localStorage.getItem("imageData");
const currentColor = localStorage.getItem("currentColor");
const previousColor = localStorage.getItem("previousColor");
const penSize = localStorage.getItem("penSize");
const size = localStorage.getItem("size")

if (imageData) {

    const img = new Image;
    img.src = imageData;
    img.onload = () => {
        app.canvas.getContext('2d').drawImage(img, 0,0)
    }
    
}

if (penSize) {
    app.ratio = penSize
    app.sizeControl.changeByRatio(penSize)
} 

if (['128','256','512'].includes(size)) {
    app.sizeControl.size = size;
    app.sizeControl.changeBySize(size)
}

if (currentColor && previousColor) {

    app.colorContoll.changeColorPallete(previousColor);
    app.colorContoll.changeColorPallete(currentColor);
    app.ctx.fillStyle = currentColor;
    app.colorContoll.ctx.fillStyle = currentColor

}

 
window.addEventListener('unload', () => {

    localStorage.setItem("currentColor", app.colorContoll.currentColor);
    localStorage.setItem("previousColor", app.colorContoll.previousColor);
    localStorage.setItem("imageData", (app.canvas.toDataURL()))
    localStorage.setItem("penSize",  app.ratio)
    localStorage.setItem("size", app.sizeControl.size)

})