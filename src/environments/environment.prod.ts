export const environment = {
  production: true,
  // tslint:disable-next-line
  restApiURL: window['env']['restApiURL'] || `${location.protocol}//${location.hostname}:${location.port}`
};
