import { Option } from '../../../common/option.common';
import { ElementState } from '../../../common/elementState';

export class SearchSpotsViewModel {
    bookedState: string;
    startDate: Date;
    endDate: Date;
    townId: string;
    townOptions: Option[];
    townOptionsLoaded: boolean;
    elementState: ElementState;
}
