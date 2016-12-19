import { Option } from '../../../common/option.common';
import { ElementState } from '../../../common/elementState';

export class AddSpotViewModel {
    bookedState: string;
    bookedStateOptions: Option[];
    scheduledFor: Date;
    durationMinutes: number;
    durationMinutesOptions: Option[];
    countyId: string;
    countyOptions: Option[];
    countyOptionsLoaded: boolean;
    townId: string;
    townOptions: Option[];
    townOptionsLoaded: boolean;
    venueName: string;
    description: string;
    elementState: ElementState;
    validationErrors: string[];
}
