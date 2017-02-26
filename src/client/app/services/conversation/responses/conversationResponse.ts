import { User } from '../../user/responses/user';

export class Conversation {
    entity: {
        _id: string;
        users: {
            userId: string;
            read: boolean;
        }[];
    };
    otherUserIds: string[];
}