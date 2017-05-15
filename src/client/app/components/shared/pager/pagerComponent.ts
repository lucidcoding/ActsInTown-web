import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PagerViewModel } from './pagerViewModel';
import { Option } from '../../../common/option.common';
import * as Constants from '../../../common/constants';

@Component({
    moduleId: module.id,
    selector: 'sd-pager',
    templateUrl: 'pagerComponent.html',
    styleUrls: ['pagerComponent.css']
})
export class PagerComponent {
    @Input() records: number;
    @Input() currentPage: number;
    @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();
    public viewModel: PagerViewModel;

    ngOnInit() {
        let pages = 8;//Math.ceil(this.records / Constants.recordsPerPage);
        let pageNumbers: number[] = [];

        for (let i = 1; i <= pages; i++) {
            pageNumbers.push(i);
        }

        this.viewModel = {
            show: pages > 1,
            pageNumbers: pageNumbers,
            lastPage: pages
        };
    }
    
    selectPage($event: any, page: number) {
        event.preventDefault();
        this.pageSelected.emit(page);
    }
}
