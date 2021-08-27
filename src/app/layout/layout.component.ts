import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuDinamicoService } from '../services/menu-dinamico.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  darkTheme = false;

  menuMode = 'horizontal';

  theme = 'green-light';

  selectedColor = 'green';

  topbarMenuActive: boolean;

  overlayMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  layoutMenuScroller: HTMLDivElement;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  menuHoverActive: boolean;

  configClick: boolean;

  configActive: boolean;

  model: any[];

  constructor(private menuService: MenuService,
              public menuDinamicoService: MenuDinamicoService) {}

  ngOnInit() {
    this.model = this.menuDinamicoService.getObtieneMenuDinamico();
  }

  changeTheme(theme) {
      this.selectedColor = theme;
      theme = this.selectedColor + (this.darkTheme ? '-dark' : '-light');
      this.changeStyleSheetsColor('theme-css', 'theme-' + theme + '.css');
      this.changeStyleSheetsColor('layout-css', 'layout-' + theme + '.css');
      this.theme = theme;

      if (theme.indexOf('dark') !== -1) {
        this.darkTheme = true;
      } else {
        this.darkTheme = false;
      }
  }

  changeDarkOrLight(isDark: boolean) {
      if (this.darkTheme !== isDark) {
          this.darkTheme = isDark;
          this.changeTheme(this.selectedColor);
      }
  }

  changeStyleSheetsColor(id, value) {
      const element = document.getElementById(id);
      const urlTokens = element.getAttribute('href').split('/');
      urlTokens[urlTokens.length - 1] = value;

      const newURL = urlTokens.join('/');

      this.replaceLink(element, newURL);
  }

  isIE() {
      return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  replaceLink(linkElement, href) {
      if (this.isIE()) {
          linkElement.setAttribute('href', href);
      }
      else {
          const id = linkElement.getAttribute('id');
          const cloneLinkElement = linkElement.cloneNode(true);

          cloneLinkElement.setAttribute('href', href);
          cloneLinkElement.setAttribute('id', id + '-clone');

          linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

          cloneLinkElement.addEventListener('load', () => {
              linkElement.remove();
              cloneLinkElement.setAttribute('id', id);
          });
      }
  }

  onLayoutClick() {
      if (!this.topbarItemClick) {
          this.activeTopbarItem = null;
          this.topbarMenuActive = false;
      }

      if (!this.menuClick) {
          if (this.isHorizontal() || this.isSlim()) {
              this.menuService.reset();
          }

          if (this.overlayMenuActive || this.staticMenuMobileActive) {
              this.hideOverlayMenu();
          }

          this.menuHoverActive = false;
      }

      if (this.configActive && !this.configClick) {
          this.configActive = false;
      }

      this.configClick = false;
      this.topbarItemClick = false;
      this.menuClick = false;
  }

  onMenuButtonClick(event) {
      this.menuClick = true;
      this.topbarMenuActive = false;

      if (this.isOverlay()) {
          this.overlayMenuActive = !this.overlayMenuActive;
      }
      if (this.isDesktop()) {
          this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
          this.staticMenuMobileActive = !this.staticMenuMobileActive;
      }

      event.preventDefault();
  }

  onMenuClick() {
      this.menuClick = true;
  }

  onTopbarMenuButtonClick(event) {
      this.topbarItemClick = true;
      this.topbarMenuActive = !this.topbarMenuActive;

      this.hideOverlayMenu();

      event.preventDefault();
  }

  onTopbarItemClick(event, item) {
      this.topbarItemClick = true;

      if (this.activeTopbarItem === item) {
          this.activeTopbarItem = null;
      } else {
          this.activeTopbarItem = item;
      }

      event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }

  onConfigClick(event) {
      this.configClick = true;
  }

  isHorizontal() {
      return this.menuMode === 'horizontal';
  }

  isSlim() {
      return this.menuMode === 'slim';
  }

  isOverlay() {
      return this.menuMode === 'overlay';
  }

  isStatic() {
      return this.menuMode === 'static';
  }

  isMobile() {
      return window.innerWidth < 1025;
  }

  isDesktop() {
      return window.innerWidth > 1024;
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  hideOverlayMenu() {
      this.overlayMenuActive = false;
      this.staticMenuMobileActive = false;
  }
}
