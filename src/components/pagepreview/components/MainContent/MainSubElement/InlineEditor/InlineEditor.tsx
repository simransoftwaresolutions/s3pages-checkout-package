import React from 'react';
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');
import { FontNameForm } from './fontName';
import { FontSizeForm } from './fontSize';

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
    // const mediumEditorColorButtons = require('./medium-editor-colorpicker-buttons').get(MediumEditor);
    // const mediumEditorColorButtons1 = require('./medium-editor-colorpicker-buttons1').get(MediumEditor);
  
    // const TextColorButtonClass = mediumEditorColorButtons.TextColorButtonClass;
    // const TextColorButtonClass1 = mediumEditorColorButtons1.TextColorButtonClass;

    const FontSizeButton = FontSizeForm(MediumEditor);
    const FontNameButton = FontNameForm(MediumEditor);

    this.medium = new MediumEditor(`#${this.props.id}`, {
                                          placeholder: false,
                                          toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor','companySizes', 'fontnameext'] },
                                         
                                          disableReturn: false,
                                          disableDoubleReturn: true,
                                          
                                          extensions: {
                                            // textcolor: new TextColorButtonClass(),
                                            // bgcolor: new TextColorButtonClass1(),
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

  // componentWillReceiveProps(nextProps:any) {
  //   if (nextProps.text !== this.state.text && !this._updated) {
  //     this.setState({ text: nextProps.text });
  //   }

  //   if (this._updated) this._updated = false;
  // }
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