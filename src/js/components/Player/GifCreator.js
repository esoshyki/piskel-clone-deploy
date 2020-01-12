import create from '../CreateNode';

export default class GifCreator {
    constructor(player) {
        this.player = player
        this.createGif = this.createGif.bind(this);
    }

    createGif() {
        const size = this.player.canvas_size;
        const gif_element = create('image', {
        height: `${size}px`,
        width: `${size}px`,            
        }, '__gif')

        var gif = new GIF({
            workers: 2,
            quality: 10,
            workerScript: "../node_modules/gif.js.optimized/dist/gif.worker.js"
          });
        
        this.player.frames.forEach(el => {
            gif.addFrame(el.canvas, {delay: 200})
        })
        
        gif.on('finished', (blob) => {
            console.log('finished')
            window.open(URL.createObjectURL(blob))
        });

        gif.render()
        console.log(gif)
        document.querySelector('main').appendChild(gif_element)
                                                                                                                                                                                                                                                                                        
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
}                                                   