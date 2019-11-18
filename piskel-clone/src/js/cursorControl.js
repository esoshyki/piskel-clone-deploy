export default class CursorControl {

    changeCursor(instrument) {

        if (instrument === 'pencil') {
            document.body.style.cursor = "url('../src/assets/cursors/pencil.cur'), pointer"
        }
        else if (instrument === 'fill_bucket') {
            document.body.style.cursor = "url('../src/assets/cursors/bucket.cur'), pointer"
        }
        else if (instrument === 'color_picker') {
            document.body.style.cursor = "url('../src/assets/cursors/color-picker.cur'), pointer"
        }
    }
}