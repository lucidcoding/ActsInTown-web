import { NgModule } from '@angular/core';
import { LoadingSpinnerOverlayComponent } from './loadingSpinnerOverlayComponent';
import { LoadingSpinnerModule } from '../../shared/loadingSpinner/loadingSpinnerModule';

@NgModule({
    imports: [LoadingSpinnerModule],
    declarations: [LoadingSpinnerOverlayComponent],
    exports: [LoadingSpinnerOverlayComponent],
    providers: []
})

export class LoadingSpinnerOverlayModule { }
