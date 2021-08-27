import { MenuModel } from './menu.model';

export class CustomMenuItem {
    label: string;
    data: MenuModel;
    icon: string;
    children?: CustomMenuItem[];

    constructor() {
        this.label = '';
        this.data = null;
        this.icon = '';
        this.children = null;
    }

}
