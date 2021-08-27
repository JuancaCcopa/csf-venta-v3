import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-auto-complete',
  templateUrl: './control-auto-complete.component.html',
  styleUrls: ['./control-auto-complete.component.css']
})
export class ControlAutoCompleteComponent implements OnInit {

  // Variable que recibira una lista para ser mostrada en el control
  @Input() iData: modeloAutoComplete[];
  // Variable que emitira el item seleccionado de la lista recibida
  @Output() oItemData = new EventEmitter<modeloAutoComplete>();

  item: modeloAutoComplete;

  filteredDataSingle: any[];

  constructor() { }

  ngOnInit(): void {
    this.filteredDataSingle = this.iData;
  }

  filterDataSingle(event) {
    let query = event.query;
    this.filteredDataSingle = this.filterCountry(query, this.iData);
  }

  filterCountry(query, data: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < data.length; i++) {
        let country = data[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }
    return filtered;
  }

  onSelect(event) {
    this.oItemData.emit(this.item);
  }

  onClear(event) {
    this.oItemData.emit(this.item);
  }
}

interface modeloAutoComplete {
  name: string;
  code: string;
}
