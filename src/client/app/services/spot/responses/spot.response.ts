import { Town } from '../../town/responses/town.response';

export class Spot {
    id: string;
    //user: User;
	scheduledFor: Date;
	durationMinutes: number;
	town: Town;
	venueName: string;
	addedOn: Date;
	cancelled: boolean;
}
