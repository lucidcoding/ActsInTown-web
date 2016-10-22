import { Option } from '../../../common/option.common';

export class AddSpotViewModel {
    scheduledFor: Date;
    durationMinutes: number;
    durationMinutesOptions: Option[];
    townId: string;
    townOptions: Option[];
    townOptionsLoaded: boolean;
    venueName: string;
}
