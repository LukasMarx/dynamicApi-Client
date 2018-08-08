import { environment } from '../../../../environments/environment';
import * as Quill from 'quill';
import { projectService } from './projectService';

const IMG = Quill.import('formats/image');

const ATTRIBUTES = ['alt', 'height', 'width'];

export class Picture extends IMG {
  static create(value) {
    const node = super.create(environment.assetUrl + '/' + projectService.projectId + '/asset/' + value + '/webp');
    node.setAttribute('raw', value);
    return node;
  }

  // static formats(domNode) {
  //     // const format = {image: {}};
  //     // if (domNode.hasAttribute('src')) {
  //     //     format.image['src'] = domNode.getAttribute('src');
  //     // }
  //     // if (domNode.hasAttribute('srcset')) {
  //     //     format.image['srcset'] = domNode.getAttribute('srcset');
  //     // }
  //     // return format;
  // }

  static value(domNode) {
    const src = domNode.getAttribute('raw');

    return src;
  }

  format(name, value) {
    if (value) {
      (<any>this).domNode.setAttribute(name, value);
    } else {
      (<any>this).removeAttribute(name);
    }
  }
}
