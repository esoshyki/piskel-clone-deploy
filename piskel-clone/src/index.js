import './style/style.sass'
import App from './js/app'

const app = new App

app.start()

const imageData = localStorage.getItem("imageData");
const instrument = localStorage.getItem("instrument");
const currentColor = localStorage.getItem("currentColor");
const previousColor = localStorage.getItem("previousColor");

if (imageData) {

    const img = new Image;
    img.src = imageData;
    img.onload = () => {
        app.canvas.getContext('2d').drawImage(img, 0,0)
    }
    
}

if (instrument !== null && instrument !== 'pencil') {

    app.changeInstrument(instrument)
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
    localStorage.setItem("instrument", app.instrument);
    localStorage.setItem("imageData", (app.canvas.toDataURL()))

})