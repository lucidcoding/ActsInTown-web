import { ViewConversationMessageViewModel } from './viewConversationMessageViewModel';
import { ElementState } from '../../../../common/elementState';

export class ViewConversationViewModel {
    id: string;
    otherUserName: string;
    messages: ViewConversationMessageViewModel[];
    newMessageBody: string;
    elementState: ElementState;
    page: number;
}