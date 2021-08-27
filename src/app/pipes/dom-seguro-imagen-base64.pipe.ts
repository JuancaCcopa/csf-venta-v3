import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSeguroImagenBase64'
})
export class DomSeguroImagenBase64Pipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(imagenBase64: string): any {
    if (imagenBase64) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl( `${ imagenBase64 }` );
    } else {
      return this.domSanitizer.bypassSecurityTrustResourceUrl( `${ 'assets/layout/images/imagenNoDisponible.png' }` ) ;
    }
  }

}
