import { Injectable } from '@angular/core';
import { CifrarDataService } from './cifrar-data.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cifrarDataService: CifrarDataService) {}

  /**
   * Cifrado set session storage item
   */
  setItemEncrypt(key: string, value: any) {
    // Obtenemos el dato encriptado
    let valueEncrypt = this.cifrarDataService.encrypt(value);
    this.setItem(key, valueEncrypt);
  }
  /**
   * Cifrado get session storage item
   */
  getItemDecrypt(key: string) {
    // Obtenemos el dato encriptado
    let value = this.getItem(key);
    let valueEncrypt = this.cifrarDataService.decrypt(value);
    return valueEncrypt;
  }

  /**
   * set session storage item
   */
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    
  }

  /**
   * get session storage item
   */
  getItem(key: string): any {
    let value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  /**
   * remove session storage item
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * remove all session storage items
   */
  clear() {
    localStorage.clear();
  }

  logout() {
    let estacion = null;
    let usuario = '';
    if (this.getItem('usuario')) {
      usuario = this.getItem('usuario')
    }
    this.clear();
    this.setItem('usuario', usuario);
  }
}
