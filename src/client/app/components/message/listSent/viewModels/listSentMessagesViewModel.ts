import { ListSentMessagesRowViewModel } from './listSentMessagesRowViewModel';
import { ElementState } from '../../../../common/elementState';

export class ListSentMessagesViewModel {
    rows: ListSentMessagesRowViewModel[];
    elementState: ElementState;
    page: number;
    records: number;
}
