import { Option } from '../../../common/option.common';

export class SearchAvailableSpotsViewModel {
    startDate: Date;
    endDate: Date;
    townId: string;
    townOptions: Option[];
    townOptionsLoaded: boolean;
}
