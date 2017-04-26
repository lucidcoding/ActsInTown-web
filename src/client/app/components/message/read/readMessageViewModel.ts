import { ElementState } from '../../../common/elementState';

export class ReadMessageViewModel {
    messageId: string;
    senderFullName: string;
    senderImageUrl: string;
    title: string;
    sentOnString: string;
    body: string;
    elementState: ElementState;
}
