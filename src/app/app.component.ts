import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { VariablesGlobales } from './interface/variables-globales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private readonly servicioDeviceDetector: DeviceDetectorService) {}

  ngOnInit() {

    this.getDatosDispositivo();
  }

  getDatosDispositivo() {
    const _nombreDispositivo = this.servicioDeviceDetector.getDeviceInfo().device;
    const _esMovil: boolean = this.servicioDeviceDetector.isMobile();
    const _esTablet: boolean = this.servicioDeviceDetector.isTablet();
    const _esDesktop: boolean = this.servicioDeviceDetector.isDesktop();
    VariablesGlobales._DISPOSITIVO = {
      nombreDispositivo: _nombreDispositivo ? _nombreDispositivo : '',
      esMovil: _esMovil,
      esTablet: _esTablet,
      esDesktop: _esDesktop
    };
  }
}
