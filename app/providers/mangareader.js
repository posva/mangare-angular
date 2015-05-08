angular.module('Mangare').factory('MangaReader', ['$http', '$q',
  function($http, $q) {
    'use strict';
    var host = 'http://www.mangareader.net';
    var get = function(uri) {
      return $http.get('/provide?url=' + encodeURI(host + uri));
    };
    console.log('loaded');
    var reListElements = new RegExp('<li><a href="(/[^"]+)"> ?([^<]+)</a>(<span class)?', 'g'),
      reName = /class="aname">([^<]+)/,
      reAlternateName = /Alternate Name[^<]*<[^>]*>\n?<td>([^<]+)/i,
      reNumberOfChapters = /class="chico_manga".*\n?<a[^>]*>.*([0-9]+)<.a/i,
      reChapters = /class="chico_manga".*\n?<a +href="([^"]+)[^>]*>[^<]+<.a> : ([^<]+)?/ig,
      reChapterPage = /id="img"[^>]*src="([^"]+)/i,
      reNextPage = /<a[^>]*href="([^"]+)"[^>]*>next/i,
      reChapterAllPages = /id="selectpage".*\n(?:.*<option.*\n)*/i,
      reChapterSinglePage = /<option[^>]*value="([^"]+)".*\n/gi;

    var MangaReader = {
      host: host,
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
      },
      getManga: function(manga) {
        var deferred = $q.defer();
        get(manga.uri).success(function(data, status, headers, config) {
          var manga = {};
          manga.name = reName.exec(data)[1];
          manga.alternate = reAlternateName.exec(data);
          manga.alternate = manga.alternate && manga.alternate[1];
          manga.chapters = [];
          data = data.substring(data.indexOf('id="chapterlist"'));
          var match = reChapters.exec(data);
          var index = 1;
          while (match) {
            manga.chapters.push({
              index: index,
              uri: match[1],
              name: (match[2] && match[2] + ' (' + index + ')') || manga.name + ' ' + index
            });
            match = reChapters.exec(data);
            ++index;
          }
          deferred.resolve(manga);
        }).error(function(data, status, headers, config) {
          deferred.reject('Error in getManga: ' + status);
        });
        return deferred.promise;
      },
      getChapter: function(chapter) {
        var deferred = $q.defer();
        get(chapter.uri).success(function(data, status, headers, config) {
          console.log('Getting chapter');
          var chapter = {};
          chapter.pages = [];
          chapter.uris = [];
          chapter.pages.push(reChapterPage.exec(data)[1]);
          var pagesText = reChapterAllPages.exec(data)[0];
          var match = reChapterSinglePage.exec(pagesText);
          // we already got first page
          chapter.uris.push(match[1]);
          match = reChapterSinglePage.exec(pagesText);
          var index = 0;
          while (match) {
            ++index;
            chapter.uris.push(match[1]);
            match = reChapterSinglePage.exec(pagesText);
          }
          chapter.uris.forEach(function(uri, index) {
            if (uri) {
              get(uri).success(function(data, status, headers, config) {
                chapter.pages[index] = reChapterPage.exec(data)[1];
              }).error(function(data, status, headers, config) {
                chapter.pages[index] = null;
              });
            } else {
              chapter.pages[index] = null;
            }
          });
          deferred.resolve(chapter);
        }).error(function(data, status, headers, config) {
          deferred.reject('Error in getChapter: ' + status);
        });
        return deferred.promise;
      }
    };
    return MangaReader;
  }
]);
