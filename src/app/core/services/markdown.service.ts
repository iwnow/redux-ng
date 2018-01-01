import { Injectable } from '@angular/core';
import * as sd from 'showdown';

@Injectable()
export class MarkdownService {
  readonly converter;

  constructor() {
    this.converter = new sd.Converter()
  }

  render(source) {
    return this.log(this.converter.makeHtml(source));
  }

  log(o) {
    console.log(o)
    return o;
  }

}
