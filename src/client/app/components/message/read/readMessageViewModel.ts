import { ElementState } from '../../../common/elementState';

export class ReadMessageViewModel {
    messageId: string;
    senderFullName: string;
    title: string;
    sentOn: Date;
    body: string;
    elementState: ElementState;
}
