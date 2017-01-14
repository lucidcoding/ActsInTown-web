import { Conversation } from '../../conversation/responses/conversationResponse';
import { User } from '../../user/responses/user';

export class Message {
    id: string;
    conversation: Conversation;
    user: User;
    addedOn: Date;
    body: string;
}