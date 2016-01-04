var bookStoreControllers = angular.module("BookStoreControllers",[]);

bookStoreControllers.controller('BookListCtrl',['$scope','Book',
	function($scope,Book){
		$scope.books = Book.query();
	}
]);

bookStoreControllers.controller('CartCtrl',['$scope',
	function($scope){

	}
]);