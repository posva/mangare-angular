angular.module('Mangare').factory('MangaReader', ['$http', '$q',
  function($http, $q) {
    var host = 'http://www.mangareader.net';
    var get = function(uri) {
      return $http.get('/provide?url=' + encodeURI(host + uri));
    };
    console.log('loaded');
    var reListElements = new RegExp('<li><a href="(/[^"]+)"> ?([^<]+)</a>(<span class)?', 'g');
    var MangaReader = {
      getList: function() {
        var deferred = $q.defer();
        get('/alphabetical').success(function(data, status, headers, config) {
          var p1, p2, text;
          p1 = data.indexOf('class="content_bloc2"');
          p2 = data.indexOf('id="adfooter"');
          text = data.substr(p1, p2 - p1);
          var list = [];
          var match = reListElements.exec(text);
          while (match) {
            list.push({
              uri: match[1],
              name: match[2],
              completed: match[3] ? '✔ ' : '⚒ '
            });
            match = reListElements.exec(text);
          }
          deferred.resolve(list);
        }).error(function(data, status, headers, config) {
          deferred.reject('Error in getList: ' + status);
        });
        return deferred.promise;
      }
    };
    return MangaReader;
  }
]);
