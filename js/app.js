var bookStoreApp = angular.module('BookStoreApp', [
  'ngRoute',
  'BookStoreControllers',
  'BookStoreServices'
  
]);

bookStoreApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/booklist', {
        templateUrl: 'partial/bookList.html',
        controller: 'BookListCtrl'
      }).
      when('/book/:bookId', {
        templateUrl: 'partials/bookDetail.html',
        controller: 'BookDetailCtrl'
      }).
      otherwise({
        redirectTo: '/booklist'
      });
  }]);