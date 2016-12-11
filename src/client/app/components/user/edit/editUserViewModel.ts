import { Option } from '../../../common/option.common';
import { ElementState } from '../../../common/elementState';

export class EditUserViewModel {
    id: string;
	userTypes: Option[];
	userTypeSelected: boolean;
	firstName: string;
	lastName: string;
	stageName: string;
    elementState: ElementState;
}
