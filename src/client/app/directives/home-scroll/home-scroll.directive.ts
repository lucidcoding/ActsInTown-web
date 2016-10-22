import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: '[homeScroll]' })
export class HomeScrollDirective {
    constructor(el: ElementRef, renderer: Renderer) {
       renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }
}
