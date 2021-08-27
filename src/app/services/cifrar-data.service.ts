import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CifrarDataService {

  private tokenFromUI = '123456$#@$^@1CSF';

  // Declare this key and iv values in declaration
  

  encrypt(data: any): any {
    // Modelo 1
    if (!data) {
      return '';
    }
    if (data.toString() === '') {
      return '';
    }

    let vkey = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let viv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), vkey,
    {
        keySize: 128 / 8,
        iv: viv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();

  }

  decrypt(data: any): any {
    if (!data) {
      return '';
    }
    if (data.toString() === '') {
      return '';
    }
    let vkey = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let viv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    var decrypted = CryptoJS.AES.decrypt(
      data, vkey, {
        keySize: 128 / 8,
        iv: viv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return decrypted.toString(CryptoJS.enc.Utf8);

  }
}
