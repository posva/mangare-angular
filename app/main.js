angular.module('Mangare').
controller('AppCtrl', ['$scope', '$q', '$http', 'MangaReader',
  function($scope, $q, $http, MangaReader) {
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
    MangaReader.getList().then(function(list) {
      $scope.mangaList = list;
    });

    var manga = {
      name: 'Hunter X Hunter',
      alternate: 'HxH',
      year: 1998,
      status: 'ongoing',
      author: 'Togashi, Yoshihiro',
      artist: 'Togashi, Yoshihiro',
      genres: [
        'action',
        'adventure',
        'comedy',
        'fantasy',
        'shounen',
        'super power'
      ],
      chapters: 349,
    };

    var chapter = {
      title: 'Chapter 4: The Monstrous Red -fox',
      pages: [
        'http://i32.mangareader.net/hunter-x-hunter/4/hunter-x-hunter-1638649.jpg',
        'http://i28.mangareader.net/hunter-x-hunter/4/hunter-x-hunter-1638651.jpg',
        'http://i12.mangareader.net/hunter-x-hunter/4/hunter-x-hunter-1638653.jpg',
        'http://i12.mangareader.net/hunter-x-hunter/4/hunter-x-hunter-1638655.jpg',
        'http://i11.mangareader.net/naruto/688/naruto-5102197.jpg'
      ]
    };

    $scope.chapter = chapter;

    $scope.pages = [];

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

    $scope.totalPages = chapter.pages.length;
    $scope.downloadedPages = 0;
    $scope.builtPages = 0;

    //chapter.pages.forEach(function(url, index) {
    //downloadImageAsBase64(url, function(encoded) {
    //$scope.pages[index] = {
    //data: encoded,
    //dimensions: null,
    //type: null
    //};
    //writeTypeOfPage($scope.pages[index]);
    //});
    //});

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
