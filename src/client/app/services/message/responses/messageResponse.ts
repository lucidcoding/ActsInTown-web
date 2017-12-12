import { Conversation } from '../../conversation/responses/conversationResponse';
import { User } from '../../user/responses/user';

export class Message {
    id: string;
    conversation: Conversation;
    sender: User;
    recipient: User;
    sentOn: Date;
    deleted: boolean;
    read: boolean;
    title: string;
    body: string;
}
