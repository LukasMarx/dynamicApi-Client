import * as Quill from 'quill';

import * as Delta from 'quill-delta';
import Parchment from 'parchment';

const Block = Quill.import('blots/block/embed');

export class IFrame extends Block {
  static blotName = 'i-frame';
  static tagName = 'iframe';
  static TAB = '  ';
  static className = 'i-frame';

  static create(value) {
    let node = super.create();
    node.setAttribute('src', value.src);
    return node;
  }

  static value(node) {
    return {
      src: node.getAttribute('src')
    };
  }

  //   static formats(node) {
  //     return {
  //       src: node.getAttribute('src')
  //     };
  //   }

  //   delta() {
  //     let text = (<any>this).domNode.textContent;
  //     if (text.endsWith('\n')) {
  //       // Should always be true
  //       text = text.slice(0, -1);
  //     }
  //     return text.split('\n').reduce((delta, frag) => {
  //       const value = delta.insert(frag).insert('\n', (<any>this).formats());
  //       return value;
  //     }, new Delta());
  //   }
}
