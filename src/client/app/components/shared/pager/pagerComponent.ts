import { Component, Input } from '@angular/core';
import { PagerViewModel } from './pagerViewModel';
import { Option } from '../../../common/option.common';

@Component({
    moduleId: module.id,
    selector: 'sd-pager',
    templateUrl: 'pagerComponent.html',
    styleUrls: ['pagerComponent.css']
})
export class PagerComponent {
    @Input() records: number;
    @Input() currentPage: number;
    public viewModel: PagerViewModel;

    ngOnInit() {
        let pages = this.records;
        let pageNumbers: number[] = [];

        for (let i = 1; i <= pages; i++) {
            pageNumbers.push(i);
        }

        this.viewModel = {
            pageNumbers: pageNumbers
        };
    }
}
