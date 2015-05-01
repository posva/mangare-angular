angular.module('Mangare').factory('MangaReader', ['$http', '$q',
  function($http, $q) {
    var host = 'http://www.mangareader.net';
    var get = function(uri) {
      return $http.get('/provide?url=' + encodeURI(host + uri));
    };
    console.log('loaded');
    var MangaReader = {
      getList: function() {
        var deferred = $q.defer();
        get('/alphabetical').success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).error(function(data, status, headers, config) {
          deferred.reject('Error in getList: ' + status);
        });
        return deferred.promise;
      }
    };
    return MangaReader;
  }
]);
