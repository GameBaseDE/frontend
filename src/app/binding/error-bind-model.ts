export interface IErrorBindModel {
  errorMessage: string;
  hasError: boolean;
}

export class ErrorBindModel implements IErrorBindModel {
  errorMessage = '';
  hasError = false;
}
