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
