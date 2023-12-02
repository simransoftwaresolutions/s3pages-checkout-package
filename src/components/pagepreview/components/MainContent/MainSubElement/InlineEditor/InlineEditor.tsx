import React from 'react';
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');
import { FontNameForm } from './fontName';
import { FontSizeForm } from './fontSize';
import { FontColorForm } from './fontColor';
import { FontBackColorForm } from './backgroundColor';

if (typeof document !== 'undefined') {
  var MediumEditor = require('medium-editor');
}

export default class InlineEditor extends React.Component<any,any> {
  medium: any;
  _updated: any;
  static defaultProps = {
    tag: 'span'
  };

  constructor(props:any) {
    super(props);

    this.state = {
      text: this.props.text
    };
  }

  componentDidMount() {
    const FontSizeButton = FontSizeForm(MediumEditor);
    const FontNameButton = FontNameForm(MediumEditor);
    const FontColorButton = FontColorForm(MediumEditor);
    const FontBackColorButton = FontBackColorForm(MediumEditor);

    this.medium = new MediumEditor(`#${this.props.id}`, {
                                          placeholder: false,
                                          toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'textColor', 'textBackColor', 'companySizes', 'fontnameext'] },
                                         
                                          disableReturn: false,
                                          disableDoubleReturn: true,
                                          
                                          extensions: {
                                            textColor: new FontColorButton(),
                                            textBackColor: new FontBackColorButton(),
                                            companysizes: new FontSizeButton(),
                                            fontnameext: new FontNameButton(),
                                          }
                                        } 
                                   );
    this.medium.subscribe('editableInput', (e:any, editable:any) => {
      this._updated = true;
      this.change(editable.innerHTML);      
    });
  }

  componentDidUpdate() {
    this.medium.restoreSelection();
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.text !== prevState.text) {
      return { text: nextProps.text };
    }
    return null;
  }


  render() {
    const {
      options,
      text,
      tag,
      contentEditable,
      dangerouslySetInnerHTML,
      ...props
    } = this.props;

    const innerHTML = { __html: this.state.text };

    if (this.medium) {
      this.medium.saveSelection();
    }
    return React.createElement(tag, {
      ...props,
      dangerouslySetInnerHTML: innerHTML
    });

  }

  change(text:any) {
    if (this.props.onChange) this.props.onChange(text, this.medium);
  }
}