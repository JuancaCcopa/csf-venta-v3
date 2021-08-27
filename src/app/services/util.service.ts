import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  fecha_AAAAMMDD(fecha: string | Date): string {
    const day = new Date(fecha).getDate();
    const month = new Date(fecha).getMonth() + 1;
    const year = new Date(fecha).getFullYear();
    const fechaFinal = `${year}-${month}-${day}`;
    return fechaFinal;
  }

  fecha_AAAAMMDD_F112(fecha: string | Date): string {
    var day = new Date(fecha).getDate().toString();
    var month = (new Date(fecha).getMonth() + 1).toString();
    const year = new Date(fecha).getFullYear();
    if(Number(day)<10) day="0"+day.toString();
    if(Number(month)<10) month="0"+month.toString();

    const fechaFinal = `${year}${month}${day}`;

    return fechaFinal;
  }

  fecha_DDMMYYYYHHMM(fecha: Date): string {
    const day = this.padLeft(new Date(fecha).getDate(),2);
    const month = this.padLeft(new Date(fecha).getMonth() + 1,2);
    const year = new Date(fecha).getFullYear();
    const hour = this.padLeft(new Date(fecha).getHours(),2);
    const minute = this.padLeft(new Date(fecha).getMinutes(),2);
    const fechaFinal = `${day}/${month}/${year} ${hour}:${minute}`;
    return fechaFinal;
  }

  padLeft(value: number, lon: number): string {
    return value.toString().padStart(lon,'0')
  }

  recortarMensajeApiExito(msg: string): string {
    return msg.split(',')[0];
  }

  fechaApi_POST(fecha: Date): string {
    fecha.setHours(0, -fecha.getTimezoneOffset(), 0, 0);
    return fecha.toISOString();
  }

  validar_email(email)
  {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  convertirListaEmail(cadenaEmail: string): string[]{
    let miCadena = cadenaEmail;
    let posicion = miCadena.indexOf(';');
    let posiInicio = 0;

    let listDtaemail: string[] = [];

    if (posicion === -1)
    {
      listDtaemail.push(miCadena);
    }

    while (posicion !== -1) {

      let data = miCadena.substr(posiInicio, posicion);
      listDtaemail.push(data);
      miCadena = miCadena.substr(posicion + 1);
      posicion = miCadena.indexOf(';');

      if (posicion === -1)
      {
        listDtaemail.push(miCadena);
      }
    }
    return listDtaemail;
  }

  validaListEmail(email: string): string{

    var lista = this.convertirListaEmail(email);
    let msg = '';

    lista.forEach(x => {
      let validoEmail = this.validar_email(x);
      if (!validoEmail) {
        msg += '/' + x;
      }
    });

    return msg;
  }

  restarDia(fecha: string | Date, dias) {
    if (typeof fecha === 'string') {
      fecha = new Date(fecha);
    }
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  }
  sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  recortarMensajeApiError(msg: string): string {
    return msg.split(';')[0];
  }

  onRedondearDecimal(numero: number, decimales: number): number {
    let isNumero = Number(numero.toFixed(decimales));
    return isNumero;
  }

  convertirMayuscula(data: string): string {

    data = data === null ? '': data;
    data = data === undefined ? '' : data;

    let mayus = data.toUpperCase();

    return mayus;

  }
}
