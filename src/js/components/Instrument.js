import create from "./Create";

export default class Instrument {
    constructor(App, data) {

        this.app = App;
        this.content = document.createElement('div');
        this.instruments = [
            'pencil', 'fill_bucket', 'all_pixel_bucket','color_picker', 'mirror', 'eraser', 'stroke', 'rectangle', 'circle', 'dithering', 'lighten', 'move'
        ];
        if (this.instruments.includes(data.instrument)) {
            this.selected = data.instrument;
        }
        else {
            this.selected = 'pencil';
            this.app.instrument = 'pencil';
        }

        this.setInstrument = this.setInstrument.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    changeCursor() {

        const { instrument } = this.app;
        const target = this.app.frames.canvas.content;
        if (instrument === 'pencil') {

            target.style.cursor = "url('../src/assets/cursors/pencil.cur'), pointer";

        } else if (instrument === 'fill_bucket') {

            target.style.cursor = "url('../src/assets/cursors/bucket.cur'), pointer";

        } else if (instrument === 'color_picker') {

            target.style.cursor = "url('../src/assets/cursors/color-picker.cur'), pointer";

        } else if (instrument === 'eraser') {
            
            target.style.cursor = "url('../src/assets/cursors/eraser.cur'), url(http://www.rw-designer.com/cursor-extern.php?id=72976), pointer"
        } else if (instrument === 'stroke') {

            target.style.cursor = "url('../src/assets/cursors/stroke.cur'), url(http://www.rw-designer.com/cursor-extern.php?id=79402), pointer"; 

        } else if (instrument === 'circle') {

            target.style.cursor = "url('../src/assets/cursors/circle.cur'), auto"

        } else if (instrument === 'rectangle') {

            target.style.cursor = "url('../src/assets/cursors/rect.cur'), url(http://cur.cursors-4u.net/cursors/cur-1/cur5.cur), auto"

        } else if (instrument === 'mirror') {

            target.style.cursor = "url('../src/assets/cursors/mirror.cur'), url(http://cur.cursors-4u.net/holidays/hol-5/hol449.cur), auto"

        } else if (instrument === 'dithering') {

            target.style.cursor = "url('../src/assets/cursors/dithering.cur'), url(http://cur.cursors-4u.net/sports/spo-7/spo724.cur), auto"

        } else if (instrument === 'all_pixel_bucket') {

            target.style.cursor = "url('../src/assets/cursors/bucket.cur'), pointer";
    
        } else if (instrument === 'lighten') {

            target.style.cursor = "url('../src/assets/cursors/lighten.cur'), url(http://cur.cursors-4u.net/nature/nat-11/nat1009.cur), auto"

        } else if (instrument === 'move') {

            target.style.cursor = 'grab'

        }
    }

    handler(e) {
        if (!this.selected) {this.selected = 'eraser'}
        const { target } = e;
        if (target.dataset.instrument !== this.app.instrument) {

            this.selected.classList.remove('selected');
            target.classList.add('selected');
            this.selected = target;
            this.app.instrument = target.dataset.instrument;
            this.changeCursor();

        }

    }

    setInstrument(instrument) {
        this.app.instrument = instrument;
        this.changeCursor();
        this.selected.classList.remove('selected');
        this.selected = document.querySelector(`._item[data-instrument=${instrument}]`)
        this.selected.classList.add('selected');
    }

    keyPress(e) {

        if (e.keyCode === 112) {
            this.setInstrument('pencil')
        } else if (e.keyCode === 98) {
            this.setInstrument('fill_bucket') 
        } else if (e.keyCode === 97) {
            this.setInstrument('all_pixel_bucket') 
        } else if (e.keyCode === 111) {
            this.setInstrument('color_picker') 
        } else if (e.keyCode === 118) {
            this.setInstrument('mirror')
        } else if (e.keyCode === 101) {
            this.setInstrument('eraser')
        } else if (e.keyCode === 108) {
            this.setInstrument('stroke')
        } else if (e.keyCode === 114) {
            this.setInstrument('rectangle')
        } else if (e.keyCode === 99) {
            this.setInstrument('circle')
        } else if (e.keyCode === 116) {
            this.setInstrument('dithering')
        } else if (e.keyCode === 117) {
            this.setInstrument('lighten')
        }

    }

    start() {

        const original_titles = [
        `    
            <div>Pen tool <span class='tooltip-shortcut'>(P)</span></div>
        `,
        `
                <div>Paint bucket tool <span class='tooltip-shortcut'>(B)</span></div>
        `,
        `
            <div>Paint all pixels of the same color <span class='tooltip-shortcut'>(A)</span></div>
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
            <div>Color picker <span class='tooltip-shortcut'>(O)</span></div>
        `,
        `
            <div>Vertical Mirror pen <span class='tooltip-shortcut'>(V)</span></div>
            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>CTRL</span>
                Use horizontal axis
            </div>
            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>SHIFT</span>
                Use horizontal and vertical axis
            </div>
        `,
        `
            <div>Eraser tool <span class='tooltip-shortcut'>(E)</span></div>
        `,
        `
            <div>Stroke tool <span class='tooltip-shortcut'>(L)</span></div>
            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>SHIFT</span>
                Hold shift to draw straight lines
            </div>
        `,
        `
            <div>Rectangle tool <span class='tooltip-shortcut'>(R)</span></div>
            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>SHIFT</span>
                Keep 1 to 1 ratio
            </div>
        `,
        `
            <div>Circle tool <span class='tooltip-shortcut'>(C)</span></div>
            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>SHIFT</span>
                Keep 1 to 1 ratio
            </div>
        `,
        `
            <div>Dithering tool <span class='tooltip-shortcut'>(T)</span></div>
        `,
        `
            <div>Lighten <span class='tooltip-shortcut'>(U)</span></div>
            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>CTRL</span>
                Darken
            </div>
            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>SHIFT</span>
                Apply only once per pixel
            </div>
        `,
        `
        <div>Move tool <span class='tooltip-shortcut'>(M)</span></div>
            <div class='tooltip-descriptor'>
                <span class='tooltip-descriptor-button'>CTRL</span>
                Apply to all layers
            </div>
        <div class='tooltip-descriptor'>
            <span class='tooltip-descriptor-button'>SHIFT</span>
            Apply to all frames
        </div>
        <div class='tooltip-descriptor'>
            <span class='tooltip-descriptor-button'>ALT</span>
            Wrap canvas borders
        </div>
        `
        ]

        this.content.className = 'instrument-panel';
        this.instruments.forEach((val, idx) => {

            const el = document.createElement('div');
            el.className = '_item';
            if (val === this.app.instrument) {

                el.classList.add('selected');
                this.selected = el;
                
            }
            el.dataset.instrument = val;
            el.dataset.original_title = original_titles[idx];
            el.addEventListener('mouseenter', () => {
                const element = create('div', 'tooltip-container')
                const x = el.offsetLeft; 
                const y =  el.offsetTop;
                element.innerHTML = el.dataset.original_title;
                element.style.left = `${x + 50}px`
                element.style.top = `${y + 50}px`
                this.content.appendChild(element);

                el.addEventListener('mouseleave', () => {
                    element.remove()
                })

            })
            this.content.appendChild(el);

        });
        this.changeCursor();
        document.querySelector('.menu').appendChild(this.content);

        this.content.addEventListener('click', this.handler.bind(this));
        document.querySelector('body').style.cursor = 'auto';

        window.addEventListener('keypress', this.keyPress)

        window.onunload = () => {

            localStorage.setItem('instrument', this.selected);

        };

    }
}
