import './style/style.sass'
import App from './js/app'


const data = {
    pensize : localStorage.getItem("pensize"),
    current_color : localStorage.getItem("current_color"),
    previous_color : localStorage.getItem("previous_color"),
    instrument : localStorage.getItem("instrument"),
    frames: localStorage.getItem("frames"),
    selected_frame: localStorage.getItem("selected_frame")
}

const app = new App(data)

app.start()

 
// window.addEventListener('unload', () => {

//     localStorage.setItem("pensize", app.pensize);
//     localStorage.setItem("canvas_size", app.canvas_size);
//     localStorage.setItem("current_color", app.current_color);
//     localStorage.setItem("previous_color",  app.previous_color);
//     localStorage.setItem("instrument", app.instrument);
//     localStorage.setItem("image_data", app.image_data);

// })