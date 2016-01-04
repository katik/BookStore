var bookStoreServices = angular.module('bookStoreServices',['ngResource']);

bookStoreServices.factory('Book',['$resource',
	function($resource){
		return $resource();
	}]);