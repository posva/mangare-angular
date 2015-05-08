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
