import { ListConversationsRowViewModel } from './listConversationsRowViewModel';
import { ElementState } from '../../../../common/elementState';

export class ListConversationsViewModel {
    rows: ListConversationsRowViewModel[];
    elementState: ElementState;
    page: number;
}
