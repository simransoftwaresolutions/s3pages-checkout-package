export const LineHeightForm = ( MediumEditor :any ) => {

    const LineHeightExtension = MediumEditor.Extension.extend({
        name: 'line-height',
        action: 'lineHeight',
        aria: 'line height',
        contentDefault: '<b>LH</b>',
        contentFA: '<i class="fa fa-text-height"></i>',
      
        handleClick() {
          this.selectionState = this.base.exportSelection();
          this.base.checkSelection();
          this.lineHeightDropdown();
        },
      
        getButton() {
          const button = this.document.createElement('button');
          button.className = 'medium-editor-action medium-editor-action-lineHeight';
          button.innerHTML = this.contentDefault;
          button.title = this.aria;
          return button;
        },
      
        lineHeightDropdown() {
          const dropdown = this.document.createElement('div');
          dropdown.className = 'medium-editor-dropdown';
          dropdown.innerHTML = `
            <input type="range" min="1" max="2" step="0.1" value="1.5" class="medium-editor-line-height-range">
            <span class="medium-editor-line-height-value">1.5</span>
          `;
      
          const rangeInput = dropdown.querySelector('.medium-editor-line-height-range');
          const valueSpan = dropdown.querySelector('.medium-editor-line-height-value');
      
          rangeInput.addEventListener('input', () => {
            const lineHeightValue = rangeInput.value;
            valueSpan.textContent = lineHeightValue;
            this.execAction('lineHeight', lineHeightValue);
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

    return LineHeightExtension;
}