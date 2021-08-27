import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  themes: any[];

  lightThemes: any[];

  constructor(public app: LayoutComponent) {}

  ngOnInit() {
      this.themes = [
          {label: 'blue'},
          {label: 'green'},
          {label: 'cyan'},
          {label: 'purple'},
          {label: 'indigo'},
          {label: 'yellow'},
          {label: 'orange'},
          {label: 'pink'}
      ];
  }

  onConfigButtonClick(event) {
      this.app.configActive = !this.app.configActive;
      event.preventDefault();
  }

  onConfigCloseClick(event) {
      this.app.configActive = false;
      event.preventDefault();
  }
}
