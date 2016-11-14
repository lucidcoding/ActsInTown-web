import { Town } from '../../town/responses/town.response';
import { User } from '../../user/responses/user';

export class Spot {
    id: string;
    user: User;
	scheduledFor: Date;
	durationMinutes: number;
	town: Town;
	venueName: string;
	addedOn: Date;
	cancelled: boolean;
    description: string;
}
