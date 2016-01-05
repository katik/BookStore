var bookStoreServices = angular.module('BookStoreServices',['ngResource']);

bookStoreServices.factory('Book',['$resource',
	function($resource){
	    return booklist;
	}
]);