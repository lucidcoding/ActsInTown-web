import { SearchAvailableSpotsResultsViewModelRow } from './searchAvailableSpotsResultsViewModelRow';

export class SearchAvailableSpotsResultsViewModel {
    startDate: Date;
    endDate: Date;
    townName: string;
    spots: SearchAvailableSpotsResultsViewModelRow[];
    spotsLoaded: boolean;
}
