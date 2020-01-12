import create from '../Create';

export default class Transform {
    constructor(canvas) {
        this.canvas = canvas;
        this.content = create('div', 'transform', {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: '20px',
            border: '1px solid white',
            justifyContent: 'center'
        })
        this.content.appendChild(create('span', '_title', {
            fontSize: '1rem',

        }));
        this.panel = create('div', '_conteiner', {
            display: 'flex',
            flexDirection: 'row'
        })
        this.current_element = null;
    }

    work(e) {
        this.current_element = e.target.dataset.instrument;

        if (this.current_element === 'flip-verticaly') {

        }

        if (this.current_element === 'counter-clockwise-rotation') {
            const size = this.canvas.canvas.width;
            const imageDate = this.canvas.ctx.getImageData(0, 0, size, size);
            this.canvas.ctx.rotate(-90 * Math.PI / 180);
            this.canvas.ctx.translate(0, size)
 
            // this.canvas.ctx.translate(this.canvas.canvas.width,  this.canvas.canvas.height)
        }
        console.log(this.current_element)
    }

    start() {
        const player = this.canvas.frames.player.content;
        this.content.innerHTML = 'Transform'
        this.content.appendChild(this.panel)
        player.appendChild(this.content);

        const instruments = ['flip-verticaly', 'counter-clockwise-rotation', 'clone', 'align'];
        const descriptions = [
            `
              <div>Flip vertically <span class='tooltip-shortcut'></span></div>
              
            <div class='tooltip-descriptor'>
              <span class='tooltip-descriptor-button'>ALT</span>
              Flip horizontally
            </div>
          
            <div class='tooltip-descriptor'>
              <span class='tooltip-descriptor-button'>CTRL</span>
              Apply to all layers
            </div>
          
            <div class='tooltip-descriptor'>
              <span class='tooltip-descriptor-button'>SHIFT</span>
              Apply to all frames
            </div>
          `,
          `
            <div>Counter-clockwise rotation <span class='tooltip-shortcut'></span></div>
                <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>ALT</span>
                Clockwise rotation
            </div>

            <div class='tooltip-descriptor'>
            <span class='tooltip-descriptor-button'>CTRL</span>
            Apply to all layers
            </div>
            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>SHIFT</span>
                Apply to all frames
            </div>
        `,
        `
            <div>Clone current layer to all frames <span class='tooltip-shortcut'></span></div>
        `,
        `
            <div>Align image to the center <span class='tooltip-shortcut'></span></div>
                <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>CTRL</span>
                Apply to all layers
            </div>

            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>SHIFT</span>
                Apply to all frames
            </div>
        `
        ]
        instruments.forEach((el, idx) => {
            const element = create('button', '_item', {
                width: '40px',
                height: '40px',
                });
                element.dataset.instrument = el;
                this.panel.appendChild(element);
                element.addEventListener('click', this.work.bind(this));
                const descrip = create('div', 'tooltip-container', {
                    position: 'absolute',
                    display: 'none',
                    width: '200px'
                });
                const x = element.offsetLeft; 
                const y =  element.offsetTop;
                descrip.innerHTML = descriptions[idx];
                descrip.style.left = `${x - 50}px`
                descrip.style.top = `${y + 50}px`;
                this.panel.appendChild(descrip);
                element.addEventListener('mouseenter', () => {
                    descrip.style.display = 'block'
                })
                element.addEventListener('mouseleave', () => {
                    descrip.style.display = 'none'
                })
        })


    }


}