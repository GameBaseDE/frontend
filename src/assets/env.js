(function(window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["restApiURL"] = `${location.protocol}//${location.hostname}:${location.port}`;
})(this);
