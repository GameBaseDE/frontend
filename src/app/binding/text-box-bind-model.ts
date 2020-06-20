import {ErrorBindModel} from './error-bind-model';

interface ITextBoxBindModel {
  value?: string;
  error: ErrorBindModel;
}

export class TextBoxBindModel implements ITextBoxBindModel {
  value = '';
  error = new ErrorBindModel();
}

