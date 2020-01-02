!function(t){var e={};function s(a){if(e[a])return e[a].exports;var i=e[a]={i:a,l:!1,exports:{}};return t[a].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(a,i,function(e){return t[e]}.bind(null,i));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="./",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);s(1);var a=(t,e,...s)=>{const a=document.createElement(t);return Object.entries(e).forEach(([t,e])=>{a.style[t]=e}),[...s].forEach(t=>{a.classList.add(t)}),a};class i{constructor(t){this.app=t,this.line=a("div",{},"_line"),this.selected=null}handling(t){"_item"===t.target.classList[0]&&(this.app.pensize=t.target.dataset.pensize,t.target.classList.contains("selected")||(this.selected.classList.remove("selected"),this.selected=t.target,t.target.classList.add("selected")))}start(){const t=document.createDocumentFragment(),e=document.createElement("div");e.className="_pen-size";const s=document.createElement("span");s.innerHTML="Pen size",[1,2,4,8].forEach(t=>{const e=a("div",{},"_item");e.innerHTML=`${t}x`,e.dataset.pensize=t,t==this.app.pensize&&(e.classList.add("selected"),this.selected=e),this.line.appendChild(e)}),e.appendChild(s),e.appendChild(this.line),t.appendChild(e),document.querySelector(".menu").appendChild(t),this.line.addEventListener("click",this.handling.bind(this))}}class n{constructor(t){this.app=t,this.color_content=document.createElement("div"),this.current_color=document.createElement("div"),this.previous_color=document.createElement("div"),this.pallete=document.createElement("div"),this.color_menu=document.createElement("div")}changeColor(t){if(t!==this.app.current_color){const e=this.app.current_color;this.current_color.style.background=t,this.app.current_color=t,this.current_color.dataset.color=t,this.previous_color.style.background=e,this.app.previous_color=e,this.previous_color.dataset.color=e}}handle(t){const{target:e}=t;if("_item"===e.className){const{color:t}=e.dataset;this.changeColor(t)}}start(){const t=document.createDocumentFragment();this.color_content.className="_color_menu",this.color_menu.className="_colors",this.pallete.className="_pallete",this.current_color.className="_item",this.previous_color.className="_item";["#FF0000","#FFA500","#FFFF00","#008000","#0000FF","#00008B","#831383"].forEach(t=>{const e=document.createElement("div");e.className="_item",e.dataset.color=t,e.style.background=t,this.pallete.appendChild(e)}),this.current_color.style.background=this.app.current_color,this.current_color.dataset.color=this.app.current_color,this.previous_color.style.background=this.app.previous_color,this.previous_color.dataset.color=this.app.previous_color;const e=document.createElement("div"),s=document.createElement("div");e.className="_line",s.className="_line",e.appendChild(this.current_color),s.appendChild(this.previous_color);const a=document.createElement("span");a.innerHTML="Current Color";const i=document.createElement("span");i.innerHTML="Previous Color",e.appendChild(a),s.appendChild(i),this.color_menu.appendChild(e),this.color_menu.appendChild(s);const n=document.createElement("h4");n.innerHTML="Color Pallete",this.color_content.appendChild(this.color_menu),this.color_content.appendChild(n),this.color_content.appendChild(this.pallete),t.appendChild(this.color_content),document.querySelector(".menu").appendChild(t),this.color_content.addEventListener("click",this.handle.bind(this))}}class r{constructor(t){this.app=t,this.API_KEY="2887c5cdabcfdda6eb369774636e205dc3fbb66527438b259580c3f60db977f9",this.canvas_center=this.app.app.canvas_center}handleInput(t){if(13===t.which){const{value:e}=t.target;this.getRandomImage(e)}}async getRandomImage(t){const e=`https://api.unsplash.com/photos/random?query=town,${t?t.split(" ").join(""):"Minsk"}&client_id=${this.API_KEY}`;await fetch(e).then(t=>t.json()).then(t=>this.canvas_center.load_image.call(this.canvas_center,t.urls.small)).catch(()=>this.canvas_center.load_image.call(this.canvas_center,"../src/js/DataLoad/data/testImage.png"))}start(){this.app.input.addEventListener("keyup",this.handleInput.bind(this))}}class c{constructor(t){this.app=t,this.input=document.createElement("input"),this.grayscale=document.createElement("div"),this.clear_canvas=document.createElement("div"),this.data_loader=new r(this)}start(){const t=document.createDocumentFragment(),e=document.createElement("div");e.className="_data_menu";const s=document.createElement("div");s.className="menu_button",s.dataset.value="image";const a=document.createElement("div");a.className="_data_menu_town";const i=document.createElement("h4");i.innerHTML="Load random image";const n=document.createElement("label");n.className="_label",n.innerHTML="Choose Town",a.appendChild(i),a.appendChild(n),a.appendChild(this.input),this.grayscale.className="_grayscale",this.grayscale.innerHTML="To grayscale",this.clear_canvas.className="_clearcanvas",this.clear_canvas.innerHTML="Clear canvas",e.appendChild(a),e.appendChild(this.grayscale),e.appendChild(this.clear_canvas),t.appendChild(e),document.querySelector("main").appendChild(t),this.data_loader.start(),this.grayscale.addEventListener("click",this.app.canvas_center.grayscale),this.clear_canvas.addEventListener("click",()=>this.app.canvas_center.clear_canvas())}}class o{constructor(t,e){this.app=t,this.content=document.createElement("div"),this.instruments=["pencil","fill_bucket","color_picker","test"],this.selected=e.instrument||"pencil"}changeCursor(){const{instrument:t}=this.app,e=this.app.frames.canvas.content;"pencil"===t?e.style.cursor="url('../src/assets/cursors/pencil.cur'), url(http://www.rw-designer.com/cursor-extern.php?id=131078), auto":"fill_bucket"===t?e.style.cursor="url('../src/assets/cursors/bucket.cur'), url(http://www.rw-designer.com/cursor-extern.php?id=24051), auto":"color_picker"===t&&(e.style.cursor="url('../src/assets/cursors/color-picker.cur'), url(http://www.rw-designer.com/cursor-extern.php?id=360), auto")}handler(t){const{target:e}=t;e.dataset.instrument!==this.app.instrument&&(this.selected.classList.remove("selected"),e.classList.add("selected"),this.selected=e,this.app.instrument=e.dataset.instrument,this.changeCursor())}start(){this.content.className="instrument-panel",this.instruments.forEach(t=>{const e=document.createElement("div");e.className="_item",t===this.app.instrument&&(e.classList.add("selected"),this.selected=e),e.dataset.instrument=t,this.content.appendChild(e)}),this.changeCursor(),document.querySelector(".menu").appendChild(this.content),this.content.addEventListener("click",this.handler.bind(this)),document.querySelector("body").style.cursor="auto",window.onunload=()=>{localStorage.setItem("instrument",this.selected)}}}class h{constructor(t,e){this.body=a("div",{width:"96px",height:"96px"},"__item"),this.canvas=a("canvas",{width:"96px",height:"96px"},"__canvas"),this.canvas.width=32,this.canvas.height=32,this.number=a("div",{},"__number"),this.copy=a("div",{},"__copy"),this.delete=a("div",{},"__delete"),this.move=a("div",{},"__move"),this.body.appendChild(this.canvas),this.body.appendChild(this.number),this.body.appendChild(this.copy),this.body.appendChild(this.delete),this.body.appendChild(this.move),this.ctx=this.canvas.getContext("2d"),this.frames_field=t,this.app=this.frames_field.app,this.id=e,this.render=this.render.bind(this),this.main_canvas=this.frames_field.canvas,this.get_image_data=this.get_image_data.bind(this)}render(t,e){this.body.dataset.position=t,this.body.style.position="relative",this.body.style.top="0",this.id=t,this.number.innerHTML=t,e.appendChild(this.body),this.frames_field.frames.length<=1?(this.delete.style.visibility="0",this.move.style.top="24px"):(this.delete.style.visibility="1",this.move.style.top="0")}add_selection(){this.body.classList.add("selected")}remove_selection(){this.body.classList.remove("selected")}put_image_data(t){const e=new Image(this.canvas.width,this.canvas.width);e.src=t,e.onload=()=>this.ctx.drawImage(e,0,0)}get_image_data(){return this.canvas.toDataURL("image/png")}}class l{constructor(t){this.app=t}drawSquare(t){this.app.ctx.fillRect(t[0],t[1],t[2],t[2])}draw(t){const e=t=>{this.app.ctx.fillRect(t[0],t[1],t[2],t[2])},s=(t,s)=>{const a=this.app.getSquare(t);if(a!==s){e(a);const t=this.app.canvas.toDataURL("image/png");this.app.frame.put_image_data(t)}};this.drawSquare(t),this.app.canvas.addEventListener("mousemove",s),this.app.canvas.addEventListener("mouseup",()=>{this.app.shadow_canvas.style.zIndex="5",this.app.canvas.removeEventListener("mousemove",s)}),this.app.canvas.addEventListener("mouseleave",()=>{this.app.canvas.removeEventListener("mousemove",s),this.app.shadow_canvas.style.zIndex="5"})}}class d{constructor(t){this.app=t}draw(t){this.app.shadow_canvas.style.zIndex="0";const e=t=>{const{data:e}=this.app.ctx.getImageData(t[0],t[1],1,1);return(t=>{const e=t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);return e&&4===e.length?`#${`0${parseInt(e[1],10).toString(16)}`.slice(-2)}${`0${parseInt(e[2],10).toString(16)}`.slice(-2)}${`0${parseInt(e[3],10).toString(16)}`.slice(-2)}`:""})(`rgba(${e[0]},${e[1]},${e[2]},${e[3]}`)},s=e(t),a=this.app.canvas.width,i=t=>{const a=t[1]-1;if(a<0)return!1;const i=[t[0],a,1];return s===e(i)},n=t=>{const i=t[1]+1;if(i>a-t[2])return!1;const n=[t[0],i,1];return s===e(n)};if(s===this.app.app.current_color)return null;let r,c,o;const h=[],l=[],d=t=>{if((t=>{const a=t[0]-1;if(a<0)return!1;const i=[a,t[1],1];return s===e(i)})(t)){const e=t[0]-1,s=t[1],a=1;h.push([e,s,a])}if((t=>{const i=t[0]+1;if(i>a-1)return;const n=[i,t[1],1];return s===e(n)})(t)){const e=t[0]+1,s=t[1],a=1;l.push([e,s,a])}},p=t=>{for(r=t[0],c=t[1],o=1;i([r,c,1]);)c-=1;for(this.app.ctx.fillRect(r,c,1,1);n([r,c,1]);)this.app.ctx.fillRect(r,c,1,1),d([r,c,1]),c+=1;d([r,c,1]),this.app.ctx.fillRect(r,c,1,1)};for(p(t);l.length>0;)p(l.pop());for(;h.length>0;)p(h.pop())}}class p{constructor(t){this.app=t}pick_color(t){const e=(t=>{const{data:e}=this.app.ctx.getImageData(t[0]+2,t[1]+2,1,1);return(t=>{const e=t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);return e&&4===e.length?`#${`0${parseInt(e[1],10).toString(16)}`.slice(-2)}${`0${parseInt(e[2],10).toString(16)}`.slice(-2)}${`0${parseInt(e[3],10).toString(16)}`.slice(-2)}`:""})(`rgba(${e[0]},${e[1]},${e[2]},${e[3]}`)})(t);this.app.app.color_controll.changeColor(e)}}class m{constructor(t){this.frames=t,this.app=t.app,this.content=a("div",{},"canvas-container"),this.canvas=a("canvas",{},"canvas_main"),this.shadow_canvas=a("canvas",{opacity:"0.6"},"shadow-canvas"),this.ctx=this.canvas.getContext("2d"),this.pencil=new l(this),this.bucket=new d(this),this.color_picker=new p(this),this.grayscale=this.grayscale.bind(this),this.frame=null,document.querySelector("main").appendChild(this.content)}update_canvas_size(){this.change_by_size()}getSquare(t){const e=512/this.canvas.width,s=Math.floor((t.pageX-this.content.offsetLeft)/e),a=Math.floor((t.pageY-this.content.offsetTop)/e),i=this.app.pensize;return[i*Math.floor(s/i),i*Math.floor(a/i),i]}grayscale(){null!==this.app.image_data&&this.changeImageToGrayscale()}changeImageToGrayscale(){const t=(t=>{const{data:e}=t;for(let t=0;t<e.length;t+=4){const s=.34*e[t]+.5*e[t+1]+.16*e[t+2];e[t]=s,e[t+1]=s,e[t+2]=s}return t})(this.ctx.getImageData(0,0,this.canvas.width,this.canvas.width));this.ctx.putImageData(t,0,0)}draw(t){t.preventDefault(),this.shadow_canvas.style.zIndex="0",this.ctx.fillStyle=this.app.current_color;const e=this.getSquare(t);"pencil"===this.app.instrument&&this.pencil.draw(e),"fill_bucket"===this.app.instrument&&this.bucket.draw(e),"color_picker"===this.app.instrument&&this.color_picker.pick_color(e);const s=this.canvas.toDataURL("image/png");this.frame.put_image_data(s)}clear_canvas(){this.ctx.fillStyle="#FFFFFF",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.width),this.ctx.fillStyle=this.app.current_color}reload_canvas(t){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.width);const e=new Image(this.canvas.width,this.canvas.width);e.src=t,e.onload=()=>{this.ctx.drawImage(e,0,0)}}getImageData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height)}load_image(t){this.clear_canvas();const e=new Image;let s,a;e.src=t||"../src/js/DataLoad/data/image.png",e.setAttribute("crossorigin","anonymous"),e.onload=()=>{const t=this.canvas.width;if(parseInt(e.width)>=parseInt(e.height)){const i=e.height/e.width;s=t,a=Math.floor(s*i)}else{const i=e.width/e.height;a=t,s=Math.floor(a*i)}const i=(t-s)/2>0?(t-s)/2:0,n=(t-a)/2>0?(t-a)/2:0;this.ctx.drawImage(e,i,n,s,a),this.app.image_data=this.getImageData()}}change_by_size(){const t=new Image(this.app.canvas_size,this.app.canvas_size);t.src=this.canvas.toDataURL("image/png"),this.canvas.width=this.app.canvas_size,this.canvas.height=this.app.canvas_size,t.setAttribute("crossorigin","anonymous"),t.onload=()=>{this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(t,0,0,this.canvas.width,this.canvas.width)}}shadow_handling(t){const e=this.shadow_canvas.getContext("2d");this.shadow_canvas.style.zIndex="5",e.fillStyle="grey";let s=this.getSquare(t);const a=t=>{e.fillRect(t[0],t[1],t[2],t[2])};a(s);this.content.addEventListener("mousemove",(t=>{const i=this.getSquare(t);(t=>s[1]===t[1]&&s[0]===t[0])(i)||(e.clearRect(s[0],s[1],s[2],s[2]),a(i),s=i)}).bind(this))}start(){this.canvas.width=32,this.canvas.height=32,this.shadow_canvas.width=32,this.shadow_canvas.height=32,this.content.appendChild(this.canvas),this.content.appendChild(this.shadow_canvas),this.ctx.imageSmoothingEnabled=!1,this.content.addEventListener("mousedown",this.draw.bind(this)),this.content.addEventListener("mouseenter",this.shadow_handling.bind(this))}remove_canvas(){this.content.removeChild(this.canvas)}}class u{constructor(t){this.frames=t,this.content=a("div",{display:"flex",flexDirection:"column",padding:"0",minWidth:"100px",margin:"0 10px 10px 10px"},"player"),this.player_canvas_container=a("div",{width:"192px",height:"192px",border:"2px solid yellow",display:"flex",justifyContent:"center",alignItems:"center"},"__player-canvas-container"),this.player_canvas=a("canvas",{width:"32px",height:"32px",margin:"auto",imageRendering:"pixelated"},"_canvas"),this.player_canvas.width=32,this.player_canvas.height=32,this.canvas_size=32,this.ctx=this.player_canvas.getContext("2d"),this.speed=parseInt(localStorage.getItem("player_speed"))||12,this.speed_node=a("span",{fontSize:"1.2rem",color:"black",textAlign:"center",margin:"5px 0"},"_speed"),this.speed_node.innerHTML=`${this.speed} x `,this.input=a("input",{margin:"2px 0"},"_range"),this.input.min="0",this.input.max="24",this.input.type="range",this.input.value=this.speed,this.interval=null,this.index=0,this.full_screen=!1,this.canvasSizeConteiner=a("div",{display:"flex",flexDirection:"row",height:"50px",marginBottom:"5px"},"__change-canvas-size"),[1,6,"Full"].forEach(t=>{const e=a("button",{width:"100%",height:"50px",margin:"0 5px 0 5px"},"__item");e.innerHTML=t,1===t&&(e.dataset.size=32),6===t&&(e.dataset.size=192),"Full"===t&&(e.dataset.size="full"),e.addEventListener("click",this.changeSize.bind(this)),this.canvasSizeConteiner.appendChild(e)}),this.content.appendChild(this.canvasSizeConteiner)}changeSize(t){const e=t.target.dataset.size;parseInt(e)?(this.canvas_size=parseInt(e),this.changeCanvasSize(parseInt(e))):this.player_canvas_container.requestFullscreen()}fullScreenHandle(){this.full_screen?(this.full_screen=!1,this.changeCanvasSize(this.canvas_size)):(this.full_screen=!0,this.changeCanvasSize(512))}changeCanvasSize(t){this.player_canvas.style.width=`${t}px`,this.player_canvas.style.height=`${t}px`}update_speed_node(){this.speed_node.innerHTML=`${this.speed} x`}animate(){const t=this.frames;this.index>=t.length&&(this.index=t.length-1);const e=t[this.index].get_image_data(),s=new Image(this.canvas_size,this.canvas_size);s.src=e,s.onload=()=>{this.ctx.clearRect(0,0,this.canvas_size,this.canvas_size),this.ctx.drawImage(s,0,0)};const a=this.index+1>=t.length?0:this.index+1;this.index=a}start(){this.player_canvas_container.appendChild(this.player_canvas),this.content.appendChild(this.player_canvas_container),this.content.appendChild(this.speed_node),this.content.appendChild(this.input),document.querySelector("main").appendChild(this.content),this.input.addEventListener("change",t=>{this.speed=t.target.value,this.update_speed_node(),window.clearInterval(this.interval),0!=this.speed&&(this.interval=setInterval(this.animate.bind(this),Math.floor(1e3/this.speed)))}),this.interval=setInterval(this.animate.bind(this),Math.floor(1e3/this.speed)),document.addEventListener("fullscreenchange",this.fullScreenHandle.bind(this))}}class _{constructor(t,e){this.app=t,this.content=a("div",{},"frames-container"),this.conteiner=a("div",{},"__frames"),this.add_frame_button=a("button",{},"__add-frame"),this.add_frame_button.innerHTML="Add Frame",this.frames=[],this.selected=parseInt(e.selected_frame)||0,this.canvas=new m(this),this.player=new u(this.frames),this.get_selected_frame=this.get_selected_frame.bind(this),this.fake_node=a("div",{},"__fake-node")}start(){this.canvas.start(),localStorage.getItem("frames")&&(this.frames=localStorage.getItem("frames").split("###").map((t,e)=>{const s=new h(this,e);return s.put_image_data.call(s,t),e===this.selected&&(this.canvas.reload_canvas(t),this.canvas.frame=s),s})),this.player.frames=this.frames,document.querySelector("main").appendChild(this.content),this.content.appendChild(this.conteiner),this.content.appendChild(this.add_frame_button),this.frames.length?this.redraw():this.addFrame(),this.add_frame_button.addEventListener("click",this.addFrame.bind(this)),this.conteiner.addEventListener("click",this.handle_click.bind(this)),this.conteiner.addEventListener("mousedown",this.start_move.bind(this));const t=this.frames[this.selected];this.add_selection(t),this.player.start(),this.content.onunload=()=>{const t=this.frames.reduce((t,e)=>{const s=t;return s.push(e.get_image_data.call(e)),s},[]);localStorage.setItem("frames",t.join("###")),localStorage.setItem("selected_frame",this.selected)}}get_selected_frame(){return this.frames[this.selected]}addFrame(){const t=this.frames.length+1,e=new h(this,t);this.frames.push(e),this.redraw()}delete_all_frames(){const t=this.conteiner;for(;t.firstChild;)t.firstChild.remove()}redraw(){const t=this.conteiner;this.frames.map((e,s)=>(e.render(s+1,t),e))}remove_selection(){this.frames[this.selected].remove_selection()}add_selection(t){t.add_selection(),this.canvas.reload_canvas(t.get_image_data())}set_frame(t){const e=t.dataset.position||t.parentNode.dataset.position;this.remove_selection(),this.selected=e-1;const s=this.frames[this.selected];this.canvas.frame=s,this.add_selection(s)}copy_frame(t){this.delete_all_frames();const e=this.frames[t],s=new h(this,t),a=new Image;a.src=e.get_image_data(),a.onload=()=>s.ctx.drawImage(a,0,0);const i=this.frames.slice(0,t+1);i.push(s);const n=this.frames.slice(t+1);this.frames=i.concat(n),this.player.frames=this.frames,this.redraw()}delete_frame(t){const e=this.frames[t-1]?this.frames[t-1]:this.frames[t+1];this.delete_all_frames();const s=this.frames.slice(0,t),a=this.frames.slice(t+1);this.frames=s.concat(a),this.selected=t-1,this.player.frames=this.frames,this.redraw(),this.add_selection(e),this.canvas.frame=e}add_frame_to_position(t,e){const s=t,a=e,i=this.frames[s],n=this.frames[a];this.frames[s]=n,this.frames[a]=i,this.selected=a,this.canvas.frame=i,this.redraw(),this.player.frames=this.frames}get_frame_by_index(t){const e=this.frames.slice(0,t+1),s=e.pop(),a=this.frames.slice(t+1);return this.frames=e.concat(a),this.player.frames=this.frames,s}start_move(t){if("__move"===t.target.className){this.set_frame(t.target.parentNode);const e=t.target.parentNode,s=t.pageY,a=this.conteiner.offsetHeight,i=this.conteiner.offsetTop-e.offsetTop,n=this.conteiner.offsetTop+a-e.offsetTop-96;e.style.position="absolute",e.style.zIndex="100";const r=e.dataset.position-1;let c=0;const o=t=>{c=t-s,c>=i&&c<=n&&(e.style.top=`${c}px`)},h=t=>o(t.pageY);window.addEventListener("mousemove",h);const l=()=>{window.removeEventListener("mousemove",h);const t=Math.floor(a/this.frames.length),s=Math.round(c/t);e.style.zIndex="",this.add_frame_to_position(r,r+s),window.removeEventListener("mouseup",l)};window.addEventListener("mouseup",l)}}handle_click(t){const e=t.target.className;if("__item"===e||"__item"===t.target.parentNode.className)this.set_frame.call(this,t.target);else if("__copy"===e){const e=t.target.parentNode.dataset.position-1;this.copy_frame(e)}else if("__delete"===e){const e=t.target.parentNode.dataset.position-1;this.delete_frame(e)}}}new class{constructor(t){this.pensize=t.pensize||4,this.current_color=t.current_color||"#000001",this.previous_color=t.previous_color||"#ffffff",this.instrument=t.instrument||"pencil",this.image_data=t.image_data||null,this.pensize_controll=new i(this),this.color_controll=new n(this),this.frames=new _(this,t),this.data_menu=new c(this),this.instrument_control=new o(this,t)}start(){this.instrument_control.start(),this.pensize_controll.start(),this.color_controll.start(),this.frames.start(),window.onunload=()=>{const t=this.frames.frames.reduce((t,e)=>{const s=t;return s.push(e.get_image_data.call(e)),s},[]);localStorage.setItem("instrument",this.instrument),localStorage.setItem("current_color",this.current_color),localStorage.setItem("previous_color",this.previous_color),localStorage.setItem("pensize",this.pensize),localStorage.setItem("frames",t.join("###")),localStorage.setItem("selected_frame",this.frames.selected),localStorage.setItem("player_speed",this.frames.player.speed)}}}({pensize:localStorage.getItem("pensize"),current_color:localStorage.getItem("current_color"),previous_color:localStorage.getItem("previous_color"),instrument:localStorage.getItem("instrument"),frames:localStorage.getItem("frames"),selected_frame:localStorage.getItem("selected_frame")}).start()},function(t,e){}]);