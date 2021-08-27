import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-visor-pdf',
  templateUrl: './modal-visor-pdf.component.html',
  styleUrls: ['./modal-visor-pdf.component.css']
})
export class ModalVisorPdfComponent implements OnInit {

  @Input() isFile: Blob;
  @Input() isName: any;
  strBlobURL: any;

  BASE64_MARKER = ';base64,';
  file: string = '';

  constructor() { }

  ngOnInit(): void {
    this.handleInputChange(this.isFile);
  }

  async handleInputChange(files) {
    let _file = files;
    let pattern = /pdf-*/;
    let reader = new FileReader();
    if (!_file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
     reader.onloadend = await this._handleReaderLoaded.bind(this);
     await reader.readAsDataURL(_file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.strBlobURL =  reader.result;
    this.file = this.convertirBase64Afile(this.BlobToBase64_2(this.strBlobURL), `${this.isName}.pdf`);
  }

  BlobToBase64_2(blob) {
    let base64Index = blob.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    let base64 = blob.substring(base64Index);
    let raw = window.atob(base64);
    return base64;
  }

  convertirBase64Afile(archivoEnBase64, nombreArchivoSalida): any {
    const archivoABlob = this.convertirBase64ToBlob(archivoEnBase64);
    return window.URL.createObjectURL(archivoABlob);
  }

  convertirBase64ToBlob(dataURI): any {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf' });
    return blob;
  }

}
