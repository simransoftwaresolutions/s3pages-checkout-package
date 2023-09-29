export const TestColorForm = ( MediumEditor :any ) => {

    const ColorExtension = MediumEditor.Extension.extend({
        name: 'testcolor',
        action: 'applyColor',
        aria: 'apply color',
        contentDefault: '<b>C</b>',
        contentFA: '<i class="fa fa-font"></i>',
      
        handleClick() {
          this.selectionState = this.base.exportSelection();
          this.base.checkSelection();
          this.colorDropdown();
        },
      
        getButton() {
          const button = this.document.createElement('button');
          button.className = 'medium-editor-action medium-editor-action-color';
          button.innerHTML = this.contentDefault;
          button.title = this.aria;
          return button;
        },
      
        colorDropdown() {
          const dropdown = this.document.createElement('div');
          dropdown.className = 'medium-editor-dropdown';
          dropdown.innerHTML = `
            <input type="color" class="medium-editor-color-input">
            <button class="medium-editor-color-apply">Apply</button>
          `;
      
          const colorInput = dropdown.querySelector('.medium-editor-color-input');
          const applyButton = dropdown.querySelector('.medium-editor-color-apply');
      
          applyButton.addEventListener('click', () => {
            const colorValue = colorInput.value;
            this.execAction('applyColor', colorValue);
            this.base.importSelection(this.selectionState);
            this.base.checkSelection();
            this.base.showToolbar();
          });
      
          this.base.saveSelection();
          this.base.showToolbarActions(dropdown);
        },
      
        isActive() {
          return false;
        },
      
        isDisplayed() {
          return true;
        },
      
        setInactive() {},
      });
    return ColorExtension;
}