import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

@Component({
  selector: 'app-sala-operacion-lectura',
  templateUrl: './sala-operacion-lectura.component.html',
  styleUrls: ['./sala-operacion-lectura.component.css']
})
export class SalaOperacionLecturaComponent implements OnInit {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor() { }

  ngOnInit(): void {
  }

}
