/**
 * @license
 * Fuse - Lightweight fuzzy-search
 *
 * Copyright (c) 2012 Kirollos Risk <kirollos@gmail.com>.
 * All Rights Reserved. Apache Software License 2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(t){function e(t,n){this.list=t,this.options=n=n||{};var i,o,s,r;for(i=0,r=["sort","includeScore","shouldSort"],o=r.length;o>i;i++)s=r[i],this.options[s]=s in n?n[s]:e.defaultOptions[s];for(i=0,r=["searchFn","sortFn","keys","getFn"],o=r.length;o>i;i++)s=r[i],this.options[s]=n[s]||e.defaultOptions[s]}var n=function(t,e){if(e=e||{},this.options=e,this.options.location=e.location||n.defaultOptions.location,this.options.distance="distance"in e?e.distance:n.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:n.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||n.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen>this.options.maxPatternLength)throw new Error("Pattern length is too long");this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet()};n.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},n.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},n.prototype._bitapScore=function(t,e){var n=t/this.patternLen,i=Math.abs(this.options.location-e);return this.options.distance?n+i/this.options.distance:i?1:n},n.prototype.search=function(t){if(t=this.options.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0};var e,n,i,o,s,r,a,h,p,c=t.length,l=this.options.location,f=this.options.threshold,u=t.indexOf(this.pattern,l),d=this.patternLen+c,g=1,m=[];for(-1!=u&&(f=Math.min(this._bitapScore(0,u),f),u=t.lastIndexOf(this.pattern,l+this.patternLen),-1!=u&&(f=Math.min(this._bitapScore(0,u),f))),u=-1,e=0;e<this.patternLen;e++){for(i=0,o=d;o>i;)this._bitapScore(e,l+o)<=f?i=o:d=o,o=Math.floor((d-i)/2+i);for(d=o,s=Math.max(1,l-o+1),r=Math.min(l+o,c)+this.patternLen,a=Array(r+2),a[r+1]=(1<<e)-1,n=r;n>=s;n--)if(p=this.patternAlphabet[t.charAt(n-1)],a[n]=0===e?(a[n+1]<<1|1)&p:(a[n+1]<<1|1)&p|((h[n+1]|h[n])<<1|1)|h[n+1],a[n]&this.matchmask&&(g=this._bitapScore(e,n-1),f>=g)){if(f=g,u=n-1,m.push(u),!(u>l))break;s=Math.max(1,2*l-u)}if(this._bitapScore(e+1,l)>f)break;h=a}return{isMatch:u>=0,score:g}};var i=function(t,e,n){var s,r,a;if(e){a=e.indexOf("."),-1!==a?(s=e.slice(0,a),r=e.slice(a+1)):s=e;var h=t[s];if(h)if(r||"string"!=typeof h&&"number"!=typeof h)if(o.isArray(h))for(var p=0,c=h.length;c>p;p++)i(h[p],r,n);else r&&i(h,r,n);else n.push(h)}else n.push(t);return n},o={deepValue:function(t,e){return i(t,e,[])},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)}};e.defaultOptions={id:null,caseSensitive:!1,includeScore:!1,shouldSort:!0,searchFn:n,sortFn:function(t,e){return t.score-e.score},getFn:o.deepValue,keys:[]},e.prototype.search=function(t){var e,n,i,s,r=new this.options.searchFn(t,this.options),a=this.list,h=a.length,p=this.options,c=this.options.keys,l=c.length,f=[],u={},d=[],g=function(t,e,n){if(void 0!==t&&null!==t)if("string"==typeof t)i=r.search(t),i.isMatch&&(s=u[n],s?s.score=Math.min(s.score,i.score):(u[n]={item:e,score:i.score},f.push(u[n])));else if(o.isArray(t))for(var a=0;a<t.length;a++)g(t[a],e,n)};if("string"==typeof a[0])for(var m=0;h>m;m++)g(a[m],m,m);else for(var m=0;h>m;m++)for(n=a[m],e=0;l>e;e++)g(p.getFn(n,c[e]),n,m);p.shouldSort&&f.sort(p.sortFn);for(var y=p.includeScore?function(t){return f[t]}:function(t){return f[t].item},v=p.id?function(t){f[t].item=p.getFn(f[t].item,p.id)[0]}:function(){},m=0,b=f.length;b>m;m++)v(m),d.push(y(m));return d},"object"==typeof exports?module.exports=e:"function"==typeof define&&define.amd?define(function(){return e}):t.Fuse=e}(this);
angular.module('Mangare', ['ngMaterial', 'ngMdIcons']).
constant('Fuse', window.Fuse).
config(function($mdThemingProvider) {
  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .accentPalette('light-green')
    .dark();
});

angular.module('Mangare').filter('mangaFilter', ['Fuse',
  function(Fuse) {
    var fuse = new Fuse([], {
      keys: ['name', 'author']
    });
    return function(input, filter, list, enabled) {
      if ((typeof enabled !== 'undefined' && !enabled) || filter === '')
        return input;
      fuse.list = list;
      return fuse.search(filter);
    };
  }
]);

angular.module('Mangare').
controller('AppCtrl', ['$scope', '$q', '$http', 'MangaReader', '$mdDialog',
  function($scope, $q, $http, MangaReader, $mdDialog) {
    logoIcons = ['book', 'bookmark_outline', 'insert_emoticon', 'tablet'];
    logoIconIndex = 0;
    $scope.logoIcon = logoIcons[logoIconIndex];
    setInterval(function() {
      if (++logoIconIndex >= logoIcons.length)
        logoIconIndex = 0;
      $scope.logoIcon = logoIcons[logoIconIndex];
      $scope.$apply();
    }, 1500);

    $scope.mangaList = [];
    $scope.searchManga = '';
    $scope.fuseFilter = false;
    $scope.listLimit = 10;
    MangaReader.getList().then(function(list) {
      $scope.mangaList = list;
    });

    $scope.goToManga = function(manga) {
      MangaReader.getManga(manga).then(function(manga) {
        $scope.manga = manga;
      });
    };

    $scope.searchChapter = '';
    $scope.chapterFuseFilter = false;
    $scope.chapterSearchLimit = 10;
    $scope.chapter = null;
    $scope.goToChapter = function(chapter) {
      MangaReader.getChapter(chapter).then(function(chapter) {
        $scope.downloadedPages = 0;
        $scope.builtPages = 0;
        $scope.chapter = chapter;
      });
    };

    var downloadImageAsBase64 = function(url, callback) {
      $http.get('/page?url=' + url)
        .success(function(data, status, headers, config) {
          callback(data);
        })
        .error(function(data, status, headers, config) {
          console.log('ERROR downloading', url);
        });
    };

    var getImageDimensions = function(imageData) {
      var img = new Image();
      var deferred = $q.defer();
      img.onload = function() {
        deferred.resolve({
          width: img.width,
          height: img.height
        });
      };
      img.src = imageData;
      return deferred.promise;
    };

    var getPageType = function(dimensions) {
      if (dimensions.width > dimensions.height) {
        return ['a3', 'l'];
      } else {
        return ['a4', 'p'];
      }
    };

    var addImageToPDF = function(pdf, image) {
      pdf.pages++;
      if (pdf.pages > 1) {
        pdf.addPage.apply(pdf, image.type);
      }
      pdf.addImage(image.data, 0, 0, image.type[1] === 'l' ? 420 : 210, 297);
      $scope.builtPages++;
    };

    var writeTypeOfPage = function(page) {
      var dimPromise = getImageDimensions(page.data);
      dimPromise.then(function(dimensions) {
        var type = getPageType(dimensions);
        console.log(dimensions);
        console.log(type);
        page.type = type;
        page.dimensions = dimensions;
        $scope.downloadedPages++;
      });
    };

    $scope.downloadPages = function(chapter) {
      $scope.pages = [];
      chapter.pages.forEach(function(url, index) {
        downloadImageAsBase64(url, function(encoded) {
          $scope.pages[index] = {
            data: encoded,
            dimensions: null,
            type: null
          };
          writeTypeOfPage($scope.pages[index]);
        });
      });
    };

    $scope.downloadPDF = function() {
      generatePDF($scope.pages);
    };
    var generatePDF = function(pages) {
      //var pdf = new jsPDF(pages[0].type[0], pages[0].type[1]);
      var pdf = new jsPDF();
      $scope.pdf = pdf;
      $scope.builtPages = 0;
      pdf.pages = 0;
      pages.forEach(function(page) {
        addImageToPDF(pdf, page);
      });
      pdf.save('wow.pdf');
    };
  }
]);

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZ1c2UubWluLmpzIiwibW9kdWxlLmpzIiwiZmlsdGVycy5qcyIsIm1haW4uanMiLCJwcm92aWRlcnMvbWFuZ2FyZWFkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIEZ1c2UgLSBMaWdodHdlaWdodCBmdXp6eS1zZWFyY2hcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIgS2lyb2xsb3MgUmlzayA8a2lyb2xsb3NAZ21haWwuY29tPi5cbiAqIEFsbCBSaWdodHMgUmVzZXJ2ZWQuIEFwYWNoZSBTb2Z0d2FyZSBMaWNlbnNlIDIuMFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4hZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0LG4pe3RoaXMubGlzdD10LHRoaXMub3B0aW9ucz1uPW58fHt9O3ZhciBpLG8scyxyO2ZvcihpPTAscj1bXCJzb3J0XCIsXCJpbmNsdWRlU2NvcmVcIixcInNob3VsZFNvcnRcIl0sbz1yLmxlbmd0aDtvPmk7aSsrKXM9cltpXSx0aGlzLm9wdGlvbnNbc109cyBpbiBuP25bc106ZS5kZWZhdWx0T3B0aW9uc1tzXTtmb3IoaT0wLHI9W1wic2VhcmNoRm5cIixcInNvcnRGblwiLFwia2V5c1wiLFwiZ2V0Rm5cIl0sbz1yLmxlbmd0aDtvPmk7aSsrKXM9cltpXSx0aGlzLm9wdGlvbnNbc109bltzXXx8ZS5kZWZhdWx0T3B0aW9uc1tzXX12YXIgbj1mdW5jdGlvbih0LGUpe2lmKGU9ZXx8e30sdGhpcy5vcHRpb25zPWUsdGhpcy5vcHRpb25zLmxvY2F0aW9uPWUubG9jYXRpb258fG4uZGVmYXVsdE9wdGlvbnMubG9jYXRpb24sdGhpcy5vcHRpb25zLmRpc3RhbmNlPVwiZGlzdGFuY2VcImluIGU/ZS5kaXN0YW5jZTpuLmRlZmF1bHRPcHRpb25zLmRpc3RhbmNlLHRoaXMub3B0aW9ucy50aHJlc2hvbGQ9XCJ0aHJlc2hvbGRcImluIGU/ZS50aHJlc2hvbGQ6bi5kZWZhdWx0T3B0aW9ucy50aHJlc2hvbGQsdGhpcy5vcHRpb25zLm1heFBhdHRlcm5MZW5ndGg9ZS5tYXhQYXR0ZXJuTGVuZ3RofHxuLmRlZmF1bHRPcHRpb25zLm1heFBhdHRlcm5MZW5ndGgsdGhpcy5wYXR0ZXJuPWUuY2FzZVNlbnNpdGl2ZT90OnQudG9Mb3dlckNhc2UoKSx0aGlzLnBhdHRlcm5MZW49dC5sZW5ndGgsdGhpcy5wYXR0ZXJuTGVuPnRoaXMub3B0aW9ucy5tYXhQYXR0ZXJuTGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIlBhdHRlcm4gbGVuZ3RoIGlzIHRvbyBsb25nXCIpO3RoaXMubWF0Y2htYXNrPTE8PHRoaXMucGF0dGVybkxlbi0xLHRoaXMucGF0dGVybkFscGhhYmV0PXRoaXMuX2NhbGN1bGF0ZVBhdHRlcm5BbHBoYWJldCgpfTtuLmRlZmF1bHRPcHRpb25zPXtsb2NhdGlvbjowLGRpc3RhbmNlOjEwMCx0aHJlc2hvbGQ6LjYsbWF4UGF0dGVybkxlbmd0aDozMn0sbi5wcm90b3R5cGUuX2NhbGN1bGF0ZVBhdHRlcm5BbHBoYWJldD1mdW5jdGlvbigpe3ZhciB0PXt9LGU9MDtmb3IoZT0wO2U8dGhpcy5wYXR0ZXJuTGVuO2UrKyl0W3RoaXMucGF0dGVybi5jaGFyQXQoZSldPTA7Zm9yKGU9MDtlPHRoaXMucGF0dGVybkxlbjtlKyspdFt0aGlzLnBhdHRlcm4uY2hhckF0KGUpXXw9MTw8dGhpcy5wYXR0ZXJuLmxlbmd0aC1lLTE7cmV0dXJuIHR9LG4ucHJvdG90eXBlLl9iaXRhcFNjb3JlPWZ1bmN0aW9uKHQsZSl7dmFyIG49dC90aGlzLnBhdHRlcm5MZW4saT1NYXRoLmFicyh0aGlzLm9wdGlvbnMubG9jYXRpb24tZSk7cmV0dXJuIHRoaXMub3B0aW9ucy5kaXN0YW5jZT9uK2kvdGhpcy5vcHRpb25zLmRpc3RhbmNlOmk/MTpufSxuLnByb3RvdHlwZS5zZWFyY2g9ZnVuY3Rpb24odCl7aWYodD10aGlzLm9wdGlvbnMuY2FzZVNlbnNpdGl2ZT90OnQudG9Mb3dlckNhc2UoKSx0aGlzLnBhdHRlcm49PT10KXJldHVybntpc01hdGNoOiEwLHNjb3JlOjB9O3ZhciBlLG4saSxvLHMscixhLGgscCxjPXQubGVuZ3RoLGw9dGhpcy5vcHRpb25zLmxvY2F0aW9uLGY9dGhpcy5vcHRpb25zLnRocmVzaG9sZCx1PXQuaW5kZXhPZih0aGlzLnBhdHRlcm4sbCksZD10aGlzLnBhdHRlcm5MZW4rYyxnPTEsbT1bXTtmb3IoLTEhPXUmJihmPU1hdGgubWluKHRoaXMuX2JpdGFwU2NvcmUoMCx1KSxmKSx1PXQubGFzdEluZGV4T2YodGhpcy5wYXR0ZXJuLGwrdGhpcy5wYXR0ZXJuTGVuKSwtMSE9dSYmKGY9TWF0aC5taW4odGhpcy5fYml0YXBTY29yZSgwLHUpLGYpKSksdT0tMSxlPTA7ZTx0aGlzLnBhdHRlcm5MZW47ZSsrKXtmb3IoaT0wLG89ZDtvPmk7KXRoaXMuX2JpdGFwU2NvcmUoZSxsK28pPD1mP2k9bzpkPW8sbz1NYXRoLmZsb29yKChkLWkpLzIraSk7Zm9yKGQ9byxzPU1hdGgubWF4KDEsbC1vKzEpLHI9TWF0aC5taW4obCtvLGMpK3RoaXMucGF0dGVybkxlbixhPUFycmF5KHIrMiksYVtyKzFdPSgxPDxlKS0xLG49cjtuPj1zO24tLSlpZihwPXRoaXMucGF0dGVybkFscGhhYmV0W3QuY2hhckF0KG4tMSldLGFbbl09MD09PWU/KGFbbisxXTw8MXwxKSZwOihhW24rMV08PDF8MSkmcHwoKGhbbisxXXxoW25dKTw8MXwxKXxoW24rMV0sYVtuXSZ0aGlzLm1hdGNobWFzayYmKGc9dGhpcy5fYml0YXBTY29yZShlLG4tMSksZj49Zykpe2lmKGY9Zyx1PW4tMSxtLnB1c2godSksISh1PmwpKWJyZWFrO3M9TWF0aC5tYXgoMSwyKmwtdSl9aWYodGhpcy5fYml0YXBTY29yZShlKzEsbCk+ZilicmVhaztoPWF9cmV0dXJue2lzTWF0Y2g6dT49MCxzY29yZTpnfX07dmFyIGk9ZnVuY3Rpb24odCxlLG4pe3ZhciBzLHIsYTtpZihlKXthPWUuaW5kZXhPZihcIi5cIiksLTEhPT1hPyhzPWUuc2xpY2UoMCxhKSxyPWUuc2xpY2UoYSsxKSk6cz1lO3ZhciBoPXRbc107aWYoaClpZihyfHxcInN0cmluZ1wiIT10eXBlb2YgaCYmXCJudW1iZXJcIiE9dHlwZW9mIGgpaWYoby5pc0FycmF5KGgpKWZvcih2YXIgcD0wLGM9aC5sZW5ndGg7Yz5wO3ArKylpKGhbcF0scixuKTtlbHNlIHImJmkoaCxyLG4pO2Vsc2Ugbi5wdXNoKGgpfWVsc2Ugbi5wdXNoKHQpO3JldHVybiBufSxvPXtkZWVwVmFsdWU6ZnVuY3Rpb24odCxlKXtyZXR1cm4gaSh0LGUsW10pfSxpc0FycmF5OmZ1bmN0aW9uKHQpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KX19O2UuZGVmYXVsdE9wdGlvbnM9e2lkOm51bGwsY2FzZVNlbnNpdGl2ZTohMSxpbmNsdWRlU2NvcmU6ITEsc2hvdWxkU29ydDohMCxzZWFyY2hGbjpuLHNvcnRGbjpmdW5jdGlvbih0LGUpe3JldHVybiB0LnNjb3JlLWUuc2NvcmV9LGdldEZuOm8uZGVlcFZhbHVlLGtleXM6W119LGUucHJvdG90eXBlLnNlYXJjaD1mdW5jdGlvbih0KXt2YXIgZSxuLGkscyxyPW5ldyB0aGlzLm9wdGlvbnMuc2VhcmNoRm4odCx0aGlzLm9wdGlvbnMpLGE9dGhpcy5saXN0LGg9YS5sZW5ndGgscD10aGlzLm9wdGlvbnMsYz10aGlzLm9wdGlvbnMua2V5cyxsPWMubGVuZ3RoLGY9W10sdT17fSxkPVtdLGc9ZnVuY3Rpb24odCxlLG4pe2lmKHZvaWQgMCE9PXQmJm51bGwhPT10KWlmKFwic3RyaW5nXCI9PXR5cGVvZiB0KWk9ci5zZWFyY2godCksaS5pc01hdGNoJiYocz11W25dLHM/cy5zY29yZT1NYXRoLm1pbihzLnNjb3JlLGkuc2NvcmUpOih1W25dPXtpdGVtOmUsc2NvcmU6aS5zY29yZX0sZi5wdXNoKHVbbl0pKSk7ZWxzZSBpZihvLmlzQXJyYXkodCkpZm9yKHZhciBhPTA7YTx0Lmxlbmd0aDthKyspZyh0W2FdLGUsbil9O2lmKFwic3RyaW5nXCI9PXR5cGVvZiBhWzBdKWZvcih2YXIgbT0wO2g+bTttKyspZyhhW21dLG0sbSk7ZWxzZSBmb3IodmFyIG09MDtoPm07bSsrKWZvcihuPWFbbV0sZT0wO2w+ZTtlKyspZyhwLmdldEZuKG4sY1tlXSksbixtKTtwLnNob3VsZFNvcnQmJmYuc29ydChwLnNvcnRGbik7Zm9yKHZhciB5PXAuaW5jbHVkZVNjb3JlP2Z1bmN0aW9uKHQpe3JldHVybiBmW3RdfTpmdW5jdGlvbih0KXtyZXR1cm4gZlt0XS5pdGVtfSx2PXAuaWQ/ZnVuY3Rpb24odCl7Zlt0XS5pdGVtPXAuZ2V0Rm4oZlt0XS5pdGVtLHAuaWQpWzBdfTpmdW5jdGlvbigpe30sbT0wLGI9Zi5sZW5ndGg7Yj5tO20rKyl2KG0pLGQucHVzaCh5KG0pKTtyZXR1cm4gZH0sXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGV9KTp0LkZ1c2U9ZX0odGhpcyk7IiwiYW5ndWxhci5tb2R1bGUoJ01hbmdhcmUnLCBbJ25nTWF0ZXJpYWwnLCAnbmdNZEljb25zJ10pLlxyXG5jb25zdGFudCgnRnVzZScsIHdpbmRvdy5GdXNlKS5cclxuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZG9jcy1kYXJrJywgJ2RlZmF1bHQnKVxyXG4gICAgLnByaW1hcnlQYWxldHRlKCd5ZWxsb3cnKVxyXG4gICAgLmFjY2VudFBhbGV0dGUoJ2xpZ2h0LWdyZWVuJylcclxuICAgIC5kYXJrKCk7XHJcbn0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnTWFuZ2FyZScpLmZpbHRlcignbWFuZ2FGaWx0ZXInLCBbJ0Z1c2UnLFxyXG4gIGZ1bmN0aW9uKEZ1c2UpIHtcclxuICAgIHZhciBmdXNlID0gbmV3IEZ1c2UoW10sIHtcclxuICAgICAga2V5czogWyduYW1lJywgJ2F1dGhvciddXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCwgZmlsdGVyLCBsaXN0LCBlbmFibGVkKSB7XHJcbiAgICAgIGlmICgodHlwZW9mIGVuYWJsZWQgIT09ICd1bmRlZmluZWQnICYmICFlbmFibGVkKSB8fCBmaWx0ZXIgPT09ICcnKVxyXG4gICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgZnVzZS5saXN0ID0gbGlzdDtcclxuICAgICAgcmV0dXJuIGZ1c2Uuc2VhcmNoKGZpbHRlcik7XHJcbiAgICB9O1xyXG4gIH1cclxuXSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdNYW5nYXJlJykuXHJcbmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBbJyRzY29wZScsICckcScsICckaHR0cCcsICdNYW5nYVJlYWRlcicsICckbWREaWFsb2cnLFxyXG4gIGZ1bmN0aW9uKCRzY29wZSwgJHEsICRodHRwLCBNYW5nYVJlYWRlciwgJG1kRGlhbG9nKSB7XHJcbiAgICBsb2dvSWNvbnMgPSBbJ2Jvb2snLCAnYm9va21hcmtfb3V0bGluZScsICdpbnNlcnRfZW1vdGljb24nLCAndGFibGV0J107XHJcbiAgICBsb2dvSWNvbkluZGV4ID0gMDtcclxuICAgICRzY29wZS5sb2dvSWNvbiA9IGxvZ29JY29uc1tsb2dvSWNvbkluZGV4XTtcclxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoKytsb2dvSWNvbkluZGV4ID49IGxvZ29JY29ucy5sZW5ndGgpXHJcbiAgICAgICAgbG9nb0ljb25JbmRleCA9IDA7XHJcbiAgICAgICRzY29wZS5sb2dvSWNvbiA9IGxvZ29JY29uc1tsb2dvSWNvbkluZGV4XTtcclxuICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgfSwgMTUwMCk7XHJcblxyXG4gICAgJHNjb3BlLm1hbmdhTGlzdCA9IFtdO1xyXG4gICAgJHNjb3BlLnNlYXJjaE1hbmdhID0gJyc7XHJcbiAgICAkc2NvcGUuZnVzZUZpbHRlciA9IGZhbHNlO1xyXG4gICAgJHNjb3BlLmxpc3RMaW1pdCA9IDEwO1xyXG4gICAgTWFuZ2FSZWFkZXIuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24obGlzdCkge1xyXG4gICAgICAkc2NvcGUubWFuZ2FMaXN0ID0gbGlzdDtcclxuICAgIH0pO1xyXG5cclxuICAgICRzY29wZS5nb1RvTWFuZ2EgPSBmdW5jdGlvbihtYW5nYSkge1xyXG4gICAgICBNYW5nYVJlYWRlci5nZXRNYW5nYShtYW5nYSkudGhlbihmdW5jdGlvbihtYW5nYSkge1xyXG4gICAgICAgICRzY29wZS5tYW5nYSA9IG1hbmdhO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnNlYXJjaENoYXB0ZXIgPSAnJztcclxuICAgICRzY29wZS5jaGFwdGVyRnVzZUZpbHRlciA9IGZhbHNlO1xyXG4gICAgJHNjb3BlLmNoYXB0ZXJTZWFyY2hMaW1pdCA9IDEwO1xyXG4gICAgJHNjb3BlLmNoYXB0ZXIgPSBudWxsO1xyXG4gICAgJHNjb3BlLmdvVG9DaGFwdGVyID0gZnVuY3Rpb24oY2hhcHRlcikge1xyXG4gICAgICBNYW5nYVJlYWRlci5nZXRDaGFwdGVyKGNoYXB0ZXIpLnRoZW4oZnVuY3Rpb24oY2hhcHRlcikge1xyXG4gICAgICAgICRzY29wZS5kb3dubG9hZGVkUGFnZXMgPSAwO1xyXG4gICAgICAgICRzY29wZS5idWlsdFBhZ2VzID0gMDtcclxuICAgICAgICAkc2NvcGUuY2hhcHRlciA9IGNoYXB0ZXI7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZG93bmxvYWRJbWFnZUFzQmFzZTY0ID0gZnVuY3Rpb24odXJsLCBjYWxsYmFjaykge1xyXG4gICAgICAkaHR0cC5nZXQoJy9wYWdlP3VybD0nICsgdXJsKVxyXG4gICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SIGRvd25sb2FkaW5nJywgdXJsKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGdldEltYWdlRGltZW5zaW9ucyA9IGZ1bmN0aW9uKGltYWdlRGF0YSkge1xyXG4gICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHtcclxuICAgICAgICAgIHdpZHRoOiBpbWcud2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6IGltZy5oZWlnaHRcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgICAgaW1nLnNyYyA9IGltYWdlRGF0YTtcclxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBnZXRQYWdlVHlwZSA9IGZ1bmN0aW9uKGRpbWVuc2lvbnMpIHtcclxuICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPiBkaW1lbnNpb25zLmhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiBbJ2EzJywgJ2wnXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gWydhNCcsICdwJ107XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIGFkZEltYWdlVG9QREYgPSBmdW5jdGlvbihwZGYsIGltYWdlKSB7XHJcbiAgICAgIHBkZi5wYWdlcysrO1xyXG4gICAgICBpZiAocGRmLnBhZ2VzID4gMSkge1xyXG4gICAgICAgIHBkZi5hZGRQYWdlLmFwcGx5KHBkZiwgaW1hZ2UudHlwZSk7XHJcbiAgICAgIH1cclxuICAgICAgcGRmLmFkZEltYWdlKGltYWdlLmRhdGEsIDAsIDAsIGltYWdlLnR5cGVbMV0gPT09ICdsJyA/IDQyMCA6IDIxMCwgMjk3KTtcclxuICAgICAgJHNjb3BlLmJ1aWx0UGFnZXMrKztcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHdyaXRlVHlwZU9mUGFnZSA9IGZ1bmN0aW9uKHBhZ2UpIHtcclxuICAgICAgdmFyIGRpbVByb21pc2UgPSBnZXRJbWFnZURpbWVuc2lvbnMocGFnZS5kYXRhKTtcclxuICAgICAgZGltUHJvbWlzZS50aGVuKGZ1bmN0aW9uKGRpbWVuc2lvbnMpIHtcclxuICAgICAgICB2YXIgdHlwZSA9IGdldFBhZ2VUeXBlKGRpbWVuc2lvbnMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRpbWVuc2lvbnMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHR5cGUpO1xyXG4gICAgICAgIHBhZ2UudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgcGFnZS5kaW1lbnNpb25zID0gZGltZW5zaW9ucztcclxuICAgICAgICAkc2NvcGUuZG93bmxvYWRlZFBhZ2VzKys7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuZG93bmxvYWRQYWdlcyA9IGZ1bmN0aW9uKGNoYXB0ZXIpIHtcclxuICAgICAgJHNjb3BlLnBhZ2VzID0gW107XHJcbiAgICAgIGNoYXB0ZXIucGFnZXMuZm9yRWFjaChmdW5jdGlvbih1cmwsIGluZGV4KSB7XHJcbiAgICAgICAgZG93bmxvYWRJbWFnZUFzQmFzZTY0KHVybCwgZnVuY3Rpb24oZW5jb2RlZCkge1xyXG4gICAgICAgICAgJHNjb3BlLnBhZ2VzW2luZGV4XSA9IHtcclxuICAgICAgICAgICAgZGF0YTogZW5jb2RlZCxcclxuICAgICAgICAgICAgZGltZW5zaW9uczogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogbnVsbFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHdyaXRlVHlwZU9mUGFnZSgkc2NvcGUucGFnZXNbaW5kZXhdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5kb3dubG9hZFBERiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBnZW5lcmF0ZVBERigkc2NvcGUucGFnZXMpO1xyXG4gICAgfTtcclxuICAgIHZhciBnZW5lcmF0ZVBERiA9IGZ1bmN0aW9uKHBhZ2VzKSB7XHJcbiAgICAgIC8vdmFyIHBkZiA9IG5ldyBqc1BERihwYWdlc1swXS50eXBlWzBdLCBwYWdlc1swXS50eXBlWzFdKTtcclxuICAgICAgdmFyIHBkZiA9IG5ldyBqc1BERigpO1xyXG4gICAgICAkc2NvcGUucGRmID0gcGRmO1xyXG4gICAgICAkc2NvcGUuYnVpbHRQYWdlcyA9IDA7XHJcbiAgICAgIHBkZi5wYWdlcyA9IDA7XHJcbiAgICAgIHBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG4gICAgICAgIGFkZEltYWdlVG9QREYocGRmLCBwYWdlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHBkZi5zYXZlKCd3b3cucGRmJyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdNYW5nYXJlJykuZmFjdG9yeSgnTWFuZ2FSZWFkZXInLCBbJyRodHRwJywgJyRxJyxcclxuICBmdW5jdGlvbigkaHR0cCwgJHEpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBob3N0ID0gJ2h0dHA6Ly93d3cubWFuZ2FyZWFkZXIubmV0JztcclxuICAgIHZhciBnZXQgPSBmdW5jdGlvbih1cmkpIHtcclxuICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Byb3ZpZGU/dXJsPScgKyBlbmNvZGVVUkkoaG9zdCArIHVyaSkpO1xyXG4gICAgfTtcclxuICAgIGNvbnNvbGUubG9nKCdsb2FkZWQnKTtcclxuICAgIHZhciByZUxpc3RFbGVtZW50cyA9IG5ldyBSZWdFeHAoJzxsaT48YSBocmVmPVwiKC9bXlwiXSspXCI+ID8oW148XSspPC9hPig8c3BhbiBjbGFzcyk/JywgJ2cnKSxcclxuICAgICAgcmVOYW1lID0gL2NsYXNzPVwiYW5hbWVcIj4oW148XSspLyxcclxuICAgICAgcmVBbHRlcm5hdGVOYW1lID0gL0FsdGVybmF0ZSBOYW1lW148XSo8W14+XSo+XFxuPzx0ZD4oW148XSspL2ksXHJcbiAgICAgIHJlTnVtYmVyT2ZDaGFwdGVycyA9IC9jbGFzcz1cImNoaWNvX21hbmdhXCIuKlxcbj88YVtePl0qPi4qKFswLTldKyk8LmEvaSxcclxuICAgICAgcmVDaGFwdGVycyA9IC9jbGFzcz1cImNoaWNvX21hbmdhXCIuKlxcbj88YSAraHJlZj1cIihbXlwiXSspW14+XSo+W148XSs8LmE+IDogKFtePF0rKT8vaWcsXHJcbiAgICAgIHJlQ2hhcHRlclBhZ2UgPSAvaWQ9XCJpbWdcIltePl0qc3JjPVwiKFteXCJdKykvaSxcclxuICAgICAgcmVOZXh0UGFnZSA9IC88YVtePl0qaHJlZj1cIihbXlwiXSspXCJbXj5dKj5uZXh0L2ksXHJcbiAgICAgIHJlQ2hhcHRlckFsbFBhZ2VzID0gL2lkPVwic2VsZWN0cGFnZVwiLipcXG4oPzouKjxvcHRpb24uKlxcbikqL2ksXHJcbiAgICAgIHJlQ2hhcHRlclNpbmdsZVBhZ2UgPSAvPG9wdGlvbltePl0qdmFsdWU9XCIoW15cIl0rKVwiLipcXG4vZ2k7XHJcblxyXG4gICAgdmFyIE1hbmdhUmVhZGVyID0ge1xyXG4gICAgICBob3N0OiBob3N0LFxyXG4gICAgICBnZXRMaXN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgIGdldCgnL2FscGhhYmV0aWNhbCcpLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcclxuICAgICAgICAgIHZhciBwMSwgcDIsIHRleHQ7XHJcbiAgICAgICAgICBwMSA9IGRhdGEuaW5kZXhPZignY2xhc3M9XCJjb250ZW50X2Jsb2MyXCInKTtcclxuICAgICAgICAgIHAyID0gZGF0YS5pbmRleE9mKCdpZD1cImFkZm9vdGVyXCInKTtcclxuICAgICAgICAgIHRleHQgPSBkYXRhLnN1YnN0cihwMSwgcDIgLSBwMSk7XHJcbiAgICAgICAgICB2YXIgbGlzdCA9IFtdO1xyXG4gICAgICAgICAgdmFyIG1hdGNoID0gcmVMaXN0RWxlbWVudHMuZXhlYyh0ZXh0KTtcclxuICAgICAgICAgIHdoaWxlIChtYXRjaCkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgIHVyaTogbWF0Y2hbMV0sXHJcbiAgICAgICAgICAgICAgbmFtZTogbWF0Y2hbMl0sXHJcbiAgICAgICAgICAgICAgY29tcGxldGVkOiBtYXRjaFszXSA/ICfinJQgJyA6ICfimpIgJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWF0Y2ggPSByZUxpc3RFbGVtZW50cy5leGVjKHRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcclxuICAgICAgICB9KS5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdFcnJvciBpbiBnZXRMaXN0OiAnICsgc3RhdHVzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0TWFuZ2E6IGZ1bmN0aW9uKG1hbmdhKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICBnZXQobWFuZ2EudXJpKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcbiAgICAgICAgICB2YXIgbWFuZ2EgPSB7fTtcclxuICAgICAgICAgIG1hbmdhLm5hbWUgPSByZU5hbWUuZXhlYyhkYXRhKVsxXTtcclxuICAgICAgICAgIG1hbmdhLmFsdGVybmF0ZSA9IHJlQWx0ZXJuYXRlTmFtZS5leGVjKGRhdGEpO1xyXG4gICAgICAgICAgbWFuZ2EuYWx0ZXJuYXRlID0gbWFuZ2EuYWx0ZXJuYXRlICYmIG1hbmdhLmFsdGVybmF0ZVsxXTtcclxuICAgICAgICAgIG1hbmdhLmNoYXB0ZXJzID0gW107XHJcbiAgICAgICAgICBkYXRhID0gZGF0YS5zdWJzdHJpbmcoZGF0YS5pbmRleE9mKCdpZD1cImNoYXB0ZXJsaXN0XCInKSk7XHJcbiAgICAgICAgICB2YXIgbWF0Y2ggPSByZUNoYXB0ZXJzLmV4ZWMoZGF0YSk7XHJcbiAgICAgICAgICB2YXIgaW5kZXggPSAxO1xyXG4gICAgICAgICAgd2hpbGUgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIG1hbmdhLmNoYXB0ZXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICB1cmk6IG1hdGNoWzFdLFxyXG4gICAgICAgICAgICAgIG5hbWU6IChtYXRjaFsyXSAmJiBtYXRjaFsyXSArICcgKCcgKyBpbmRleCArICcpJykgfHwgbWFuZ2EubmFtZSArICcgJyArIGluZGV4XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtYXRjaCA9IHJlQ2hhcHRlcnMuZXhlYyhkYXRhKTtcclxuICAgICAgICAgICAgKytpbmRleDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobWFuZ2EpO1xyXG4gICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ0Vycm9yIGluIGdldE1hbmdhOiAnICsgc3RhdHVzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0Q2hhcHRlcjogZnVuY3Rpb24oY2hhcHRlcikge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgZ2V0KGNoYXB0ZXIudXJpKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnR2V0dGluZyBjaGFwdGVyJyk7XHJcbiAgICAgICAgICB2YXIgY2hhcHRlciA9IHt9O1xyXG4gICAgICAgICAgY2hhcHRlci5wYWdlcyA9IFtdO1xyXG4gICAgICAgICAgY2hhcHRlci51cmlzID0gW107XHJcbiAgICAgICAgICBjaGFwdGVyLnBhZ2VzLnB1c2gocmVDaGFwdGVyUGFnZS5leGVjKGRhdGEpWzFdKTtcclxuICAgICAgICAgIHZhciBwYWdlc1RleHQgPSByZUNoYXB0ZXJBbGxQYWdlcy5leGVjKGRhdGEpWzBdO1xyXG4gICAgICAgICAgdmFyIG1hdGNoID0gcmVDaGFwdGVyU2luZ2xlUGFnZS5leGVjKHBhZ2VzVGV4dCk7XHJcbiAgICAgICAgICAvLyB3ZSBhbHJlYWR5IGdvdCBmaXJzdCBwYWdlXHJcbiAgICAgICAgICBjaGFwdGVyLnVyaXMucHVzaChtYXRjaFsxXSk7XHJcbiAgICAgICAgICBtYXRjaCA9IHJlQ2hhcHRlclNpbmdsZVBhZ2UuZXhlYyhwYWdlc1RleHQpO1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICAgIHdoaWxlIChtYXRjaCkge1xyXG4gICAgICAgICAgICArK2luZGV4O1xyXG4gICAgICAgICAgICBjaGFwdGVyLnVyaXMucHVzaChtYXRjaFsxXSk7XHJcbiAgICAgICAgICAgIG1hdGNoID0gcmVDaGFwdGVyU2luZ2xlUGFnZS5leGVjKHBhZ2VzVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjaGFwdGVyLnVyaXMuZm9yRWFjaChmdW5jdGlvbih1cmksIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh1cmkpIHtcclxuICAgICAgICAgICAgICBnZXQodXJpKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFwdGVyLnBhZ2VzW2luZGV4XSA9IHJlQ2hhcHRlclBhZ2UuZXhlYyhkYXRhKVsxXTtcclxuICAgICAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgY2hhcHRlci5wYWdlc1tpbmRleF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXB0ZXIucGFnZXNbaW5kZXhdID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNoYXB0ZXIpO1xyXG4gICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ0Vycm9yIGluIGdldENoYXB0ZXI6ICcgKyBzdGF0dXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1hbmdhUmVhZGVyO1xyXG4gIH1cclxuXSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==