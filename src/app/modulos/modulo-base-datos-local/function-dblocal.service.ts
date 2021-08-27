import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class FunctionDblocalService {

  constructor(private dbService: NgxIndexedDBService) { }

  setAdd(nameTabla: string, registro: any) {
    return this.dbService.add(nameTabla, registro);
  }

  getByKey(nameTabla: string, id: number) {
    return this.dbService.getByKey(nameTabla, id);
  }

  setUpdate(nameTabla: string, registro: any) {
    return this.dbService.update(nameTabla, registro);
  }
}
