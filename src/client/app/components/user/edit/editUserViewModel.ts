import { Option } from '../../../common/option.common';

export class EditUserViewModel {
    id: string;
	userTypeOptions: Option[];
    userTypeIds: string[];
	userTypeSelected: boolean;
	firstName: string;
	lastName: string;
	stageName: string;
}
