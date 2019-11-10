import './style/style.sass'
import Canvas from './js/canvas.js'
import Artist from './js/artist'

const App = new Canvas()
const AppArtist = new Artist(App.canvas);

App.start()
AppArtist.start()

const imageData = localStorage.getItem("imageData");
const instrument = localStorage.getItem("instrument");
const currentColor = localStorage.getItem("currentColor");
const previousColor = localStorage.getItem("previousColor");

if (imageData) {

    const img = new Image;
    img.src = imageData;
    img.onload = () => {
        App.canvas.getContext('2d').drawImage(img, 0,0)
    }
    
}

if (instrument !== 'null' && instrument !== 'pencil') {

    AppArtist.changeInstrument(instrument)
}


if (currentColor && previousColor) {

    AppArtist.colorContoll.changeColorPallete(previousColor);
    AppArtist.colorContoll.changeColorPallete(currentColor);
    AppArtist.ctx.fillStyle = currentColor;
    AppArtist.colorContoll.ctx.fillStyle = currentColor

}

 
window.addEventListener('unload', () => {

    localStorage.setItem("currentColor", AppArtist.colorContoll.currentColor);
    localStorage.setItem("previousColor", AppArtist.colorContoll.previousColor);
    localStorage.setItem("instrument", AppArtist.instrument);
    localStorage.setItem("imageData", (AppArtist.canvas.toDataURL()))

})