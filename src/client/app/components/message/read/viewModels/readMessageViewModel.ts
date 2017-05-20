import { ElementState } from '../../../../common/elementState';
import { ReadMessagePreviousMessageViewModel } from './ReadMessagePreviousMessageViewModel';

export class ReadMessageViewModel {
    messageId: string;
    senderFullName: string;
    senderImageUrl: string;
    title: string;
    sentOnString: string;
    body: string;
    elementState: ElementState;
    previousMessages: ReadMessagePreviousMessageViewModel[];
    previousMessagePage: number;
    previousMessageCount: number;
}
