import {ErrorBindModel} from './bindingmodels';

interface ITextBoxBindModel {
  value?: string;
  error: ErrorBindModel;
}

export class TextBoxBindModel implements ITextBoxBindModel {
  value = '';
  error: ErrorBindModel;
}

