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
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);