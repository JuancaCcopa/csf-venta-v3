import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFileRutaSolicitudVale'
})
export class NameFileRutaSolicitudValePipe implements PipeTransform {
  transform(value: string): string {
    const name = value.slice(value.indexOf('\\SV_TDV\\') + 8, value.length);
    return name;
  }
}
