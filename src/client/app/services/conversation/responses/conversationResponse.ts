import { User } from '../../user/responses/user';

export class Conversation {
    _id: string;
    users: {
        userId: string;
        read: boolean;
    }[];
}