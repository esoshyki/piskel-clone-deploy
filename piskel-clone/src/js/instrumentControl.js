import CursorControl from './cursorControl';

export default class InstrumentConrtol {

    constructor() {
        this.instrument = localStorage.getItem("instrument") ? localStorage.getItem("instrument") : 'pencil';
        this.selectedNode = document.querySelector('[name=pencil]');
        this.changeSelect = this.changeSelect.bind(this);
        this.changeInstrument = this.changeInstrument.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.cursorControl = new CursorControl;

        // this.changeInstrument(this.instrument);
    }

    changeInstrument(instrument) {

        const instr = document.querySelector(`[name=${instrument}]`)
        this.changeSelect(instr, instrument)

    }

    changeSelect(node, instrument) {

        if (!this.selectedNode) {
            this.selectedNode = node
        }

        else {

            if (this.selectedNode === node) {
                this.selectedNode.classList.remove('selected');
                this.selectedNode = null
                this.instrument = null
                return 
            }

            else {
                this.selectedNode.classList.remove('selected');
                this.selectedNode = node;
            }

        }

        this.selectedNode.classList.add('selected');
        this.instrument = instrument;
        this.cursorControl.changeCursor(this.instrument)

    }

    handleClick(e) {

        if (e.target.classList[0] !=='_artist_item') return // если не попал по кнопке ретурн

        const instrument = e.target.getAttribute('name')

        this.changeSelect(e.target, instrument)

    }

    handlePress(e) {

        if (e.keyCode === 112) {
            this.changeInstrument('pencil');
        }

        if (e.keyCode === 98) {
            this.changeInstrument('fill_bucket')
        }

        if (e.keyCode === 99) {
            this.changeInstrument('color_picker')
        }
    }

    start() {

        document.querySelector('._artist').addEventListener('click', this.handleClick);
        window.addEventListener('keypress', this.handlePress);

        window.addEventListener('unload', () => {

            localStorage.setItem("instrument", this.instrument);
        
        })
       
    }

}