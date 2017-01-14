import { ViewConversationMessageViewModel } from './viewConversationMessageViewModel';
import { ElementState } from '../../../../common/elementState';

export class ViewConversationViewModel {
    id: string;
    userNames: string[];
    messages: ViewConversationMessageViewModel[];
    newMessageBody: string;
    elementState: ElementState;
    page: number;
}