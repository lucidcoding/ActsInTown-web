import { Conversation } from '../../conversation/responses/conversationResponse';
import { User } from '../../user/responses/user';

export class Message {
    _id: string;
    conversation: Conversation;
    userId: string;
    addedOn: Date;
    body: string;
}