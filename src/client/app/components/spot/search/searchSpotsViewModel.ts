import { Option } from '../../../common/option.common';
import { ElementState } from '../../../common/elementState';
import { BookedState } from '../../../common/bookedState';

export class SearchSpotsViewModel {
    bookedState: BookedState;
    startDate: Date;
    endDate: Date;
    townId: string;
    townOptions: Option[];
    townOptionsLoaded: boolean;
    elementState: ElementState;
}
