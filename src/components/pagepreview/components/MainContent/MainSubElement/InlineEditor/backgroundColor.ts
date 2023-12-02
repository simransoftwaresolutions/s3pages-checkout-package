export const FontBackColorForm = ( MediumEditor :any ) => {
    var okayBtn:any;
    var colorBtn:any;
    var colorIp:any;

    let FontBackColorFormEle = MediumEditor.extensions.form.extend({
        name: 'textBackColor',
        action: 'text-back-color',
        aria: 'text back color',
        contentDefault: '<b style="background:#fff;color:#000;padding:2px;">A</b>',
        contentFA: '<i class="fa fa-paint-brush"></i>',
        init: function () { MediumEditor.extensions.form.prototype.init.apply(this, arguments);},
        handleClick: function (event:Event) {
            event.preventDefault();
            event.stopPropagation();
            if (!this.isDisplayed()){
                this.showForm();
                if(okayBtn) okayBtn.style.display = "none";
                if(colorBtn) colorBtn.style.display = "block";
            } 
            return false;
        },
        getForm: function () {
            if (!this.form) this.form = this.createForm();
            return this.form;
        },
        isDisplayed: function () {return this.getForm().style.display === 'block';},
        hideForm: function () { this.getForm().style.display = 'none';},
        showForm: function () {
            this.base.saveSelection();
            this.hideToolbarDefaultActions();
            this.getForm().style.display = 'block';
            this.setToolbarPosition();
        },
        destroy: function () {
            if (!this.form) return false;
            if (this.form.parentNode) this.form.parentNode.removeChild(this.form);
            delete this.form;
        },
        doFormSave: function () {
            this.base.restoreSelection();
            this.base.checkSelection();
        },
        applyColor: function (ev:any, clr:string = "") {
            ev.preventDefault();
            ev.stopPropagation();
            this.base.saveSelection();
            var savedSelection = this.base.exportSelection();
            var color = clr !== "" ? clr : ev.target.style.backgroundColor;
            this.document.execCommand('styleWithCSS', false, 'true');
            this.document.execCommand('backColor', false, color);
            this.base.importSelection(savedSelection);
            this.base.checkSelection();
        },
        createForm: function () {
            var doc = this.document,
            form = doc.createElement('div');
            form.className = 'medium-editor-toolbar-form';
            form.id = 'medium-editor-toolbar-form-fontbackcolor-' + this.getEditorId();
            var pickerColors = [ 
                "#1abc9c", "#2ecc71", "#16a085", "#27ae60",
                "#f1c40f", "#e67e22", "#f39c12", "#e74c3c",
                "#3498db", "#2980b9", "#9b59b6", "#8e44ad",
                "#34495e", "#2c3e50", "#bdc3c7", "#95a5a6"
            ];

            var colorGrid = doc.createElement('div');
            var colorPicker = doc.createElement('div');
            colorPicker.style.position = "relative";
            colorPicker.style.paddind = "2px";
            okayBtn = doc.createElement('div');
            okayBtn.textContent = 'Apply';
            okayBtn.style.color = '#fff';
            okayBtn.style.border = '1px solid #fff';
            okayBtn.style.borderRadius = '5px';
            okayBtn.style.padding = '0px 2px';
            okayBtn.style.margin = '2px';
            okayBtn.style.textAlign = "center";
            okayBtn.style.cursor = "pointer";
            okayBtn.style.fontSize = "15px";
            okayBtn.style.display = "none";
            okayBtn.addEventListener('click', (ev:Event)=>this.applyColor(ev, colorIp.value));
            colorPicker.appendChild(okayBtn);
            colorIp = doc.createElement('input');
            colorIp.type = "color";
            colorIp.style.position = "absolute";
            colorIp.style.top = "0px";
            colorIp.style.opacity = "0";
            colorIp.style.width = "1px";
            colorIp.style.height = "1px";
            colorIp.addEventListener('click', function(ev: Event) {ev.stopPropagation();});
            colorPicker.appendChild(colorIp);
            
            colorBtn = doc.createElement('div');
            colorBtn.textContent = 'Show More';
            colorBtn.style.color = '#fff';
            colorBtn.style.border = '1px solid #fff';
            colorBtn.style.borderRadius = '5px';
            colorBtn.style.padding = '0px 2px';
            colorBtn.style.margin = '2px';
            colorBtn.style.textAlign = "center";
            colorBtn.style.cursor = "pointer";
            colorBtn.style.fontSize = "15px";
            colorBtn.addEventListener('click', function(ev: Event) {
                ev.stopPropagation();
                okayBtn.style.display = "block";
                colorBtn.style.display = "none";
                colorIp.click();
            });

            var c = 0;
            for(var i=0; i<4; i++){
                var colorInnerGrid = doc.createElement('div');
                colorInnerGrid.style.display = "flex";
                for(var j=0; j<4; j++){
                    var square = doc.createElement('div');
                    square.style.backgroundColor = pickerColors[c];
                    square.style.width = "20px";
                    square.style.height = "20px";
                    square.style.margin = "2px";
                    square.style.zIndex = "99";
                    square.style.cursor = "pointer";
                    square.style.border = "1px solid #fff";
                    square.style.borderRadius = "3px";
                    square.addEventListener('click', (ev:Event) => this.applyColor(ev));
                    colorInnerGrid.appendChild(square);
                    c++;
                }
                colorGrid.appendChild(colorInnerGrid);
            }
            colorGrid.appendChild(colorBtn);
            form.addEventListener('click', function(ev:Event) {
                ev.stopPropagation();
                okayBtn.style.display = "none";
                colorBtn.style.display = "block";
            });
            form.appendChild(colorGrid);
            form.appendChild(colorPicker);
            form.style.position = "relative";
            return form;
        },
    });

  return FontBackColorFormEle;
}