import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { MyCodeBlock } from './code-block';
import { Picture } from './picture';

import * as Quill from 'quill';

import 'rxjs/add/operator/first';
import { MatDialog } from '@angular/material';
// import { ImagePickerComponent, LangPickerComponent } from '../modals/index';
import { isPlatformBrowser } from '@angular/common';
import { LangPickerComponent } from '../modals/index';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit, OnChanges {
  @ViewChild('editor') editorDOM;
  @Input() fullDelta;
  @Output() fullDeltaChange = new EventEmitter<any>();
  @Output() delta = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  editor: any;
  changesBeforeLoad;
  init = false;

  toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'my-code-block'],
    ['image', 'video', 'link'],

    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean']
  ];

  testBrowser: boolean;
  constructor(public dialog: MatDialog, @Inject(PLATFORM_ID) platformId: string) {
    this.testBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.testBrowser) {
      this.init = false;
      const options = {
        modules: {
          toolbar: this.toolbarOptions
          // ImageResize:{

          // }
        },
        readOnly: false,
        theme: 'snow'
      };
      // const codeblock = Quill.import('formats/code/codeblock');

      Quill.register(MyCodeBlock);
      Quill.register(Picture);
      //Quill.register('modules/imageResize', ImageResize);

      this.editor = new Quill(this.editorDOM.nativeElement, options);
      this.editor.on('text-change', (delta, oldDelta, source) => {
        if (source != 'silent') {
          this.fullDeltaChange.next(this.editor.getContents());
          var text = this.editor.getText();
          this.delta.next({
            delta: delta,
            wordCount: text.split(/\s+/).length
          });
        }
      });

      if (this.changesBeforeLoad != null) {
        this.editor.setContents(this.changesBeforeLoad);
      }
      const toolbar = this.editor.getModule('toolbar');
      toolbar.addHandler('image', value => {
        if (value) {
          const range = this.editor.getSelection();
          // const dialogRef = this.dialog.open(
          //     ImagePickerComponent,
          //     {}
          // );

          // dialogRef.afterClosed().subscribe(result => {
          //     this.editor.insertEmbed(
          //         range.index,
          //         'image',
          //         result,
          //         (<any>Quill).sources.USER
          //     );
          // });
        } else {
          this.editor.format('link', false);
        }
      });

      toolbar.addHandler('my-code-block', value => {
        if (value) {
          const range = this.editor.getSelection();

          const dialogRef = this.dialog.open(LangPickerComponent, {});

          dialogRef.afterClosed().subscribe(result => {
            this.editor.formatLine(range.index, range.length, 'my-code-block', {
              lang: result.lang,
              src: result.src
            });
            this.editor.setSelection(range.index + range.length + 1, 0);
          });
        } else {
          this.editor.format('my-code-block', false);
        }
      });

      (<any>this.editor).keyboard.addBinding({
        key: 'S',
        ctrlKey: true,
        handler: (range, context) => {
          this.save.emit(this.editor.getContents());
        }
      });
    }
  }

  ngOnChanges(evt) {
    if (this.editor != null && !this.init) {
      this.editor.setContents(evt['fullDelta'].currentValue, 'silent');
      var text = this.editor.getText();
      this.delta.next({
        delta: null,
        wordCount: text.split(/\s+/).length
      });
      this.init = true;
    } else if (!this.init) {
      this.changesBeforeLoad = evt['fullDelta'].currentValue;
    }
  }

  public getText(): string {
    return this.editor.getText();
  }
}
