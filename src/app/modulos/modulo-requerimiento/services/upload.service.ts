import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  serverUrl: string = 'https://file.io';
  constructor(private httpClient: HttpClient) {}

  public sendFormData(formData) {
    return this.httpClient.post<any>(this.serverUrl, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
