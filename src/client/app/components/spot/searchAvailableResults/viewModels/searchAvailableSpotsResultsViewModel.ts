import { SearchAvailableSpotsResultsViewModelRow } from './searchAvailableSpotsResultsViewModelRow';
import { ElementState } from '../../../../common/elementState';

export class SearchAvailableSpotsResultsViewModel {
    startDate: Date;
    endDate: Date;
    townName: string;
    spots: SearchAvailableSpotsResultsViewModelRow[];
    spotsState: ElementState;
}
