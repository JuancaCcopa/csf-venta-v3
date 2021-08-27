import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFileRuta'
})
export class NameFileRutaPipe implements PipeTransform {

  transform(value: string): string {
    const name = value.slice(value.indexOf('\\RQ_TDV\\') + 8, value.length);
   return name;
  }
}
