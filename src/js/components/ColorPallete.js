import create from './Create';

var tinycolor = require('tinycolor2');

export default class ColorPallete {
    constructor(controll) {
        this.controll = controll;
        this.color = null;
        this.panel;
        this.show_pallete = create('button', 'color-pallete-button')
        this.show_pallete.innerHTML = 'Choose Color';
        this.color_picker;

    }

    mainFunc() {

    }

    start() {
        const app = this;

        app.controll.color_content.appendChild(this.show_pallete);
        const panel = create('div', 'color-picker-panel');
        const row_one = create('div', 'panel-row');
        const swatches = create('div', 'swatches default-swatches');
        const eyedropper = create('button', 'button eyedropper');
        eyedropper.innerHTML = 'Get Color';
        row_one.appendChild(swatches);
        row_one.appendChild(eyedropper);

        const row_two = create('div', 'panel-row');
        const spectrum_map = create('div', 'spectrum-map');
        const spectrum_cursor = create('button', 'color-cursor');
        spectrum_cursor.id = 'spectrum-cursor';
        const spectrum_canvas = create('canvas', 'spectrum-canvas');
        spectrum_canvas.id = 'spectrum-canvas'
        spectrum_map.appendChild(spectrum_cursor);
        spectrum_map.appendChild(spectrum_canvas);

        const hue_map = create('div', 'hue-map');
        const hue_cursor = create('button', 'color-cursor');
        hue_cursor.id = 'hue-cursor';
        const hue_canvas = create('canvas', 'hue-canvas');
        hue_canvas.id = 'hue-canvas';
        hue_map.appendChild(hue_cursor);
        hue_map.appendChild(hue_canvas);

        row_two.appendChild(spectrum_map);
        row_two.appendChild(hue_map);

        const row_three = create('div', 'panel-row');
        const rgb_fields = create('div', 'field-group value-fields rgb-fields active');
        rgb_fields.id = 'rgb-fields';

        const r_field_group = create('div', 'field-group');
        const r_label = create('label', 'field-label');
        r_label.for = '';
        r_label.innerHTML = 'R:';
        const r_input = create('input', 'field-input rgb-input');
        r_input.type = 'number';
        r_input.max = '255';
        r_input.min = '0';
        r_input.id = 'red';
        r_field_group.appendChild(r_label);
        r_field_group.appendChild(r_input);

        const g_field_group = create('div', 'field-group');
        const g_label = create('label', 'field-label');
        g_label.for = '';
        g_label.innerHTML = 'G:';
        const g_input = create('input', 'field-input rgb-input');
        g_input.type = 'number';
        g_input.max = '255';
        g_input.min = '0';
        g_input.id = 'green';
        g_field_group.appendChild(g_label);
        g_field_group.appendChild(g_input);

        const b_field_group = create('div', 'field-group');
        const b_label = create('label', 'field-label');
        b_label.for = '';
        b_label.innerHTML = 'B:';
        const b_input = create('input', 'field-input rgb-input');
        b_input.type = 'number';
        b_input.max = '255';
        b_input.min = '0';
        b_input.id = 'blue';
        b_field_group.appendChild(b_label);
        b_field_group.appendChild(b_input);

        rgb_fields.appendChild(r_field_group);
        rgb_fields.appendChild(g_field_group);
        rgb_fields.appendChild(b_field_group);
        
        const hex_field = create('div', 'field-group value-fields hex-field');
        hex_field.id = 'hex-field';
        const hex_label = create('label', 'field-label');
        hex_label.for = '';
        hex_label.innerHTML = 'Hex:';
        const hex = create('input', 'field-input');
        hex.type = 'text';
        hex.id = 'hex';
        hex_field.appendChild(hex_label);
        hex_field.appendChild(hex);

        const mode_toggle = create('button', 'button mode-toggle');
        mode_toggle.id = 'mode-toggle';
        mode_toggle.innerHTML = 'Mode';

        row_three.appendChild(rgb_fields);
        row_three.appendChild(hex_field);
        row_three.appendChild(mode_toggle);

        const row_four = create('div', 'panel-row');
        const panel_header = create('h2', 'panel-header');
        panel_header.innerHTML = 'User Colors';
        const user_swatches = create('div', 'swatches custom-swatches');
        user_swatches.id = 'user-swatches';
        const add_swatch = create('button', 'button add-swatch');
        add_swatch.id = 'add-swatch';
        const color_indicator = create('span', 'color-indicator');
        color_indicator.id = 'color-indicator';
        const span = create('span', '');
        span.innerHTML = 'Add to Swatches';
        add_swatch.appendChild(color_indicator);
        add_swatch.appendChild(span);

        row_four.appendChild(panel_header);
        row_four.appendChild(user_swatches);
        row_four.appendChild(add_swatch);

        panel.appendChild(row_one);
        panel.appendChild(row_two);
        panel.appendChild(row_three);
        panel.appendChild(row_four);

        this.controll.color_content.appendChild(panel);

        this.panel = panel;
        this.panel.style.display = 'none';

        const spectrumCtx = spectrum_canvas.getContext('2d');
        let spectrumRect = spectrum_canvas.getBoundingClientRect();

        const hueCtx = hue_canvas.getContext('2d');
        let hueRect = hue_canvas.getBoundingClientRect();
        
        let currentColor = '';
        let hue = 0;
        let saturation = 1;
        let lightness = .5;
        let hex_color = '';
        
        function ColorPicker(){
          this.addDefaultSwatches();
          createShadeSpectrum();
          createHueSpectrum();
        };
        
        ColorPicker.prototype.defaultSwatches = [
          '#FFFFFF', 
          '#FFFB0D', 
          '#0532FF', 
          '#FF9300', 
          '#00F91A', 
          '#FF2700', 
          '#000000', 
          '#686868', 
          '#EE5464', 
          '#D27AEE', 
          '#5BA8C4', 
          '#E64AA9'
        ];
        
        function createSwatch(target, color){
          let swatch = document.createElement('button');
          swatch.classList.add('swatch');
          swatch.setAttribute('title', color);
          swatch.style.backgroundColor = color;

          swatch.addEventListener('click', function(){
            let color = tinycolor(this.style.backgroundColor);     

            colorToPos(color);
            setColorValues(color);
          });
          target.appendChild(swatch);

          refreshElementRects();
        };
        
        ColorPicker.prototype.addDefaultSwatches = function() {
          for(let i = 0; i < this.defaultSwatches.length; ++i){
            createSwatch(swatches, this.defaultSwatches[i]);
          } 
        }
        
        function refreshElementRects(){
          spectrumRect = spectrum_canvas.getBoundingClientRect();
          hueRect = hue_canvas.getBoundingClientRect();
        }
        
        function createShadeSpectrum(color) {
          let canvas = spectrum_canvas;
          let ctx = spectrumCtx;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        
          if(!color) color = '#f00';
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        
          var whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          whiteGradient.addColorStop(0, "#fff");
          whiteGradient.addColorStop(1, "transparent");
          ctx.fillStyle = whiteGradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        
          var blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          blackGradient.addColorStop(0, "transparent");
          blackGradient.addColorStop(1, "#000");
          ctx.fillStyle = blackGradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        
          canvas.addEventListener('mousedown', function(e){
            startGetSpectrumColor(e);
          });
        };
        
        function createHueSpectrum() {
          var canvas = hue_canvas;
          var ctx = hueCtx;
          var hueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          hueGradient.addColorStop(0.00, "hsl(0,100%,50%)");
          hueGradient.addColorStop(0.17, "hsl(298.8, 100%, 50%)");
          hueGradient.addColorStop(0.33, "hsl(241.2, 100%, 50%)");
          hueGradient.addColorStop(0.50, "hsl(180, 100%, 50%)");
          hueGradient.addColorStop(0.67, "hsl(118.8, 100%, 50%)");
          hueGradient.addColorStop(0.83, "hsl(61.2,100%,50%)");
          hueGradient.addColorStop(1.00, "hsl(360,100%,50%)");
          ctx.fillStyle = hueGradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          canvas.addEventListener('mousedown', function(e){
            startGetHueColor(e);
          });
        };
        
        function colorToHue(color){
          var color = tinycolor(color);
          var hueString = tinycolor('hsl '+ color.toHsl().h + ' 1 .5').toHslString();
          return hueString;
        };
        
        function colorToPos(color){
          var color = tinycolor(color);
          var hsl = color.toHsl();
          hue = hsl.h;
          var hsv = color.toHsv();
          var x = spectrumRect.width * hsv.s;
          var y = spectrumRect.height * (1 - hsv.v);
          var hueY = hueRect.height - ((hue / 360) * hueRect.height);
          updatespectrum_cursor(x,y);
          updatehue_cursor(hueY);
          setCurrentColor(color);
          createShadeSpectrum(colorToHue(color));   
        };
        
        function setColorValues(color){  
          //convert to tinycolor object
          var color = tinycolor(color);
          var rgbValues = color.toRgb();
          var hexValue = color.toHex();
          //set inputs
          r_input.value = rgbValues.r;
          g_input.value = rgbValues.g;
          b_input.value = rgbValues.b;
          hex.value = hexValue;
        };
        
        function setCurrentColor(color){
          color = tinycolor(color);
          hex_color = `#${color.toHex()}`
          currentColor = color;
          color_indicator.style.backgroundColor = color;
          const header = document.querySelector('header');
          header.style.backgroundColor = color; 
          spectrum_cursor.style.backgroundColor = color; 
          hue_cursor.style.backgroundColor = 'hsl('+ color.toHsl().h +', 100%, 50%)';
        };
        
        function updatehue_cursor(y){
          hue_cursor.style.top = y + 'px';
        }
        
        function updatespectrum_cursor(x, y){
          //assign position
          spectrum_cursor.style.left = x + 'px';
          spectrum_cursor.style.top = y + 'px';  
        };
        
        var startGetSpectrumColor = function(e) {
          getSpectrumColor(e);
          spectrum_cursor.classList.add('dragging');
          window.addEventListener('mousemove', getSpectrumColor);
          window.addEventListener('mouseup', endGetSpectrumColor);
        };
        
        function getSpectrumColor(e) {
          // got some help here - http://stackoverflow.com/questions/23520909/get-hsl-value-given-x-y-and-hue
          e.preventDefault();
          //get x/y coordinates
          var x = e.pageX - spectrumRect.left;
          var y = e.pageY - spectrumRect.top;
          //constrain x max
          if(x > spectrumRect.width){ x = spectrumRect.width}
          if(x < 0){ x = 0}
          if(y > spectrumRect.height){ y = spectrumRect.height}
          if(y < 0){ y = .1}  
          //convert between hsv and hsl
          var xRatio = x / spectrumRect.width * 100;
          var yRatio = y / spectrumRect.height * 100; 
          var hsvValue = 1 - (yRatio / 100);
          var hsvSaturation = xRatio / 100;
          lightness = (hsvValue / 2) * (2 - hsvSaturation);
          saturation = (hsvValue * hsvSaturation) / (1 - Math.abs(2 * lightness - 1));
          var color = tinycolor('hsl ' + hue + ' ' + saturation + ' ' + lightness);
          setCurrentColor(color);  
          setColorValues(color);
          updatespectrum_cursor(x,y);
        };
        
        function endGetSpectrumColor(e){
          spectrum_cursor.classList.remove('dragging');
          window.removeEventListener('mousemove', getSpectrumColor);
        };
        
        function startGetHueColor(e) {
          getHueColor(e);
          hue_cursor.classList.add('dragging');
          window.addEventListener('mousemove', getHueColor);
          window.addEventListener('mouseup', endGetHueColor);
        };
        
        function getHueColor(e){
          e.preventDefault();
          var y = e.pageY - hueRect.top;
          if (y > hueRect.height){ y = hueRect.height};
          if (y < 0){ y = 0};  
          var percent = y / hueRect.height;
          hue = 360 - (360 * percent);
          var hueColor = tinycolor('hsl '+ hue + ' 1 .5').toHslString();
          var color = tinycolor('hsl '+ hue + ' ' + saturation + ' ' + lightness).toHslString();
          createShadeSpectrum(hueColor);
          updatehue_cursor(y, hueColor)
          setCurrentColor(color);
          setColorValues(color);
        };

        const hidePallete = () => {
          app.panel.style.display = 'none';
          app.show_pallete.removeEventListener('click', hidePallete)
        }

        const showPallete = () => {
          app.panel.style.display = 'block'
          app.show_pallete.addEventListener('click', hidePallete)
          refreshElementRects()
        }
        
        function endGetHueColor(e){
            hue_cursor.classList.remove('dragging');
          window.removeEventListener('mousemove', getHueColor);
        };
        
        // Add event listeners
        
        r_input.addEventListener('change', function(){
            var color = tinycolor('rgb ' + r_input.value + ' ' + g_input.value + ' ' + b_input.value );
            colorToPos(color);
        });
        
        g_input.addEventListener('change', function(){
            var color = tinycolor('rgb ' + r_input.value + ' ' + g_input.value + ' ' + b_input.value );
            colorToPos(color);
        });
        
        b_input.addEventListener('change', function(){
            var color = tinycolor('rgb ' + r_input.value + ' ' + g_input.value + ' ' + b_input.value );
            colorToPos(color);
        });
        
        add_swatch.addEventListener('click', function(){  
          createSwatch(user_swatches, currentColor);
        });
        
        mode_toggle.addEventListener('click', function(){
          if(rgb_fields.classList.contains('active') ? rgb_fields.classList.remove('active') : rgb_fields.classList.add('active'));
          if(hex_field.classList.contains('active') ? hex_field.classList.remove('active') : hex_field.classList.add('active'));
        });

        eyedropper.addEventListener('click', () => {
            this.panel.style.display = 'none';
            app.controll.changeColor(hex_color);
        })

        app.show_pallete.addEventListener('click', showPallete)
        
        window.addEventListener('resize', function(){
          refreshElementRects();
        });
        
        this.color_picker = new ColorPicker();


    }
}