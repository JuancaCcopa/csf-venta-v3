import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

const defaultUser = null;

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  public user$ = new BehaviorSubject(defaultUser);

  constructor(private sessionService: SessionService, private router: Router) {

    let data = null;

    if (this.sessionService.getItem('currentUser')) {
      data = this.sessionService.getItemDecrypt('currentUser');
    }

    if ( data != null)
    {
      this.user$.next(data);
    }
  }

  public getIdUsuario(): number {
    return Number(this.sessionService.getItemDecrypt('idUsuario'));
  }

  public getIdEmpleado(): number {
    return Number(this.sessionService.getItemDecrypt('idEmpleado'));
  }

  public getNombreCompletoUsuario(): string {
    return this.sessionService.getItemDecrypt('nombre');
  }

  public getCodigoCentroCosto(): string {
    return this.sessionService.getItemDecrypt('codCentroCosto');
  }

  public getDescripcionCentroCosto(): string {
    return this.sessionService.getItemDecrypt('desCentroCosto');
  }

  public getEmail(): string {
    return this.sessionService.getItemDecrypt('email');
  }

  public getUsuario() {
    return this.sessionService.getItemDecrypt('usuario');
  }

  public getPerfil() {
    return this.sessionService.getItemDecrypt('idPerfil');
  }

  public setUser(user: any)
  {
    this.sessionService.setItemEncrypt('currentUser', user);
    this.user$.next(user);
  }

  public logout()
  {
    this.sessionService.logout();
    this.user$.next(defaultUser);
    this.redirecciona();
  }

  private redirecciona() {
    this.router.navigate(['/login']);
  }
}
