import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-control-dropdown',
  templateUrl: './control-dropdown.component.html',
  styleUrls: ['./control-dropdown.component.css']
})
export class ControlDropdownComponent implements OnInit {
  // Variable que recibira una lista para ser mostrada en el control
  @Input() iData: modelo[];
  // Variable que emitira el item seleccionado de la lista recibida
  @Output() oItemData = new EventEmitter<modelo>();

  item: modelo;

  filteredDataSingle: modelo[];

  items: SelectItem[];

  constructor() { }

  ngOnInit(): void {
    this.filteredDataSingle = this.iData;
    this.items = [];
    this.onInsertaData();
  }

  onInsertaData() {
    if (this.filteredDataSingle.length > 0 ) {
      this.filteredDataSingle.forEach(element => {
        this.items.push({label: element.name, value: element.code});
      });
    }
  }

  onChange(event) {
    this.oItemData.emit(this.item);
  }

  onClear(event) {
    this.oItemData.emit(this.item);
  }
}

interface modelo {
  name: string;
  code: string;
}
