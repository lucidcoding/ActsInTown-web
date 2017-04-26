import { ListReceivedMessagesRowViewModel } from './listReceivedMessagesRowViewModel';
import { ElementState } from '../../../../common/elementState';

export class ListReceivedMessagesViewModel {
    rows: ListReceivedMessagesRowViewModel[];
    elementState: ElementState;
    page: number;
    records: number;
}
