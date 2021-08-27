import { Component, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-header-breadcrumb',
  templateUrl: './header-breadcrumb.component.html',
  styleUrls: ['./header-breadcrumb.component.css']
})
export class HeaderBreadcrumbComponent implements OnDestroy {

  subscription: Subscription;

  items: MenuItem[];

  constructor(public breadcrumbService: BreadcrumbService) {
      this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
          this.items = response;
      });
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
