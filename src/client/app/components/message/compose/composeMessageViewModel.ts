import { ElementState } from '../../../common/elementState';

export class ComposeMessageViewModel {
    recipientId: string;
    recipientName: string;
    recipientImageUrl: string;
    title: string;
    body: string;
    replyToMessageId: string;
    elementState: ElementState;
}
