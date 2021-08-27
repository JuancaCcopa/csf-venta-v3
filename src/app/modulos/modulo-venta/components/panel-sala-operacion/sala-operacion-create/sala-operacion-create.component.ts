import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../../../../services/demo.service';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { LanguageService } from '../../../../../services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sala-operacion-create',
  templateUrl: './sala-operacion-create.component.html',
  styleUrls: ['./sala-operacion-create.component.css']
})
export class SalaOperacionCreateComponent implements OnInit {
  cols: any[];
  cars: any[];
  selectedCar: any;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor(private demoService: DemoService,
              public lenguageService: LanguageService,
              private readonly router: Router) { }

  ngOnInit(): void {

    this.demoService.getSala().then(cars => this.cars = cars);

        this.cols = [
            { field: 'codigo', header: 'Codigo' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'lote', header: 'Lote' },
            // { field: 'ubicacion', header: 'Ubicación' },
            { field: 'sala', header: 'Sala' },
            { field: 'adicional', header: 'Cantidad' },
        ];
  }

  goLecturarProducto() {
    this.router.navigate(['/main/modulo-ve/sala-operacion-lectura'])
  }

}
