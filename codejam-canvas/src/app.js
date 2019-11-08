import './style/style.sass'
import Canvas from './js/canvas.js'
import Artist from './js/artist'

const App = new Canvas()
const AppArtist = new Artist(App.canvas)

App.start()
AppArtist.start()
