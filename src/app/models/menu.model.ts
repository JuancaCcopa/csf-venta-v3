export class MenuCustomModel
{
    label: string;
    icon: string;
    routerLink?: string;
    items?: MenuCustomModel[];

    constructor() {
        this.label = '';
        this.icon = '';
    }
}