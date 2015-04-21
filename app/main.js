var app = angular.module('Mangare', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav',
  function($scope, $mdSidenav) {
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
    console.log('done');
  }
]);
