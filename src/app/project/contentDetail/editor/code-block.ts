import * as Quill from 'quill';

import * as Delta from 'quill-delta';
import Parchment from 'parchment';

const Block = Quill.import('formats/code-block');

export class MyCodeBlock extends Block {
  static blotName = 'my-code-block';
  static tagName = 'PRE';
  static TAB = '  ';
  static className = 'code';

  static create(value) {
    let node = super.create();
    if (typeof value === 'string') {
      value = JSON.parse(value);
    }
    node.setAttribute('language', value.lang);
    node.setAttribute('location', value.src);
    return node;
  }

  static value(node) {
    return {
      lang: node.getAttribute('language'),
      src: node.getAttribute('location')
    };
  }

  static formats(node) {
    return JSON.stringify({
      lang: node.getAttribute('language'),
      src: node.getAttribute('location')
    });
  }

  delta() {
    let text = (<any>this).domNode.textContent;
    if (text.endsWith('\n')) {
      // Should always be true
      text = text.slice(0, -1);
    }
    return text.split('\n').reduce((delta, frag) => {
      const value = delta.insert(frag).insert('\n', (<any>this).formats());
      return value;
    }, new Delta());
  }
}
