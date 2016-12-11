import { SearchSpotsResultsViewModelRow } from './searchSpotsResultsViewModelRow';
import { ElementState } from '../../../../common/elementState';

export class SearchSpotsResultsViewModel {
    bookedState: string;
    startDate: Date;
    endDate: Date;
    townName: string;
    spots: SearchSpotsResultsViewModelRow[];
    spotsState: ElementState;
}
