import { Option } from '../../../common/option.common';

export class EditUserViewModel {
    id: string;
	userTypes: Option[];
	userTypeSelected: boolean;
	firstName: string;
	lastName: string;
	stageName: string;
}
