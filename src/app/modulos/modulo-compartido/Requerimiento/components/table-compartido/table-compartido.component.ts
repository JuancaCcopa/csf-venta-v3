import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-compartido',
  templateUrl: './table-compartido.component.html',
  styleUrls: ['./table-compartido.component.css']
})
export class TableCompartidoComponent implements OnInit {
  @Input() datosRecibidos;
  @Input() idEditado: number = 0;
  @Input() cabecera;
  @Output() anular = new EventEmitter<any>();
  @Output() modificar = new EventEmitter<any>();
  @Input() NomClase: string;
  @Input() nomColumnaClase: string;
  @Input() loading: boolean;
  // @Input() opciones;
  opciones: any = [];
  itemElegido: any;

  constructor() {}
  ngOnInit() {
    this.opciones = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => {
          this.update();
        },
      },
      {
        label: 'Anular',
        icon: 'pi pi-times',
        command: () => {
          this.delete();
        },
      },
    ];
  }
  verOpciones(event: any) {
    this.itemElegido = event;
  }

  save(severity: string) {
    // this.messageService.add({severity:severity, summary:'Success', detail:'Data Saved'});
  }

  update() {
    this.modificar.emit(this.itemElegido);

    // this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
  }

  delete() {
    this.anular.emit(this.itemElegido);
    // this.messageService.add({severity:'success', summary:'Success', detail:'Data Deleted'});
  }

}
