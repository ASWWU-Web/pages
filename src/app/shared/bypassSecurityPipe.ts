// from : https://stackoverflow.com/questions/31548311/angular-html-binding
//        https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({name: 'bypassSecurity'})
export class BypassSecurityPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
