angular.module('Mangare', ['ngMaterial', 'ngMdIcons']).
constant('Fuse', window.Fuse).
config(function($mdThemingProvider) {
  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .accentPalette('light-green')
    .dark();
});
