var bookStoreControllers = angular.module("BookStoreControllers",[]);

bookStoreControllers.controller('BookListCtrl',['$scope','Book',
	function($scope,Book){
		$scope.current = null;
		$scope.query = "";
		$scope.books =Book;
		$scope.cart = [];
		$scope.setCurrent = function(book){
			$scope.current = book;
		}
		$scope.comfirmEdit = function(book){
			console.log(book);
		}

		function getBookById (isbn){
			var res = null;
			angular.forEach($scope.books,function(e){
				if (e["ISBN"] === isbn) {
					res = e;
					return false;
				};
			});
			return res;
		}		

		$scope.addBook = function(isbn){
			var book = getBookById(isbn);
			var cartBook = angular.extend({},book);
			cartBook["num"] = 0;
			var isNew = true;
			angular.forEach($scope.cart,function(e){
				if (e["ISBN"] === isbn) {
					cartBook = e;
					isNew = false;
					return false;
				};

			});

			if (book) {
				cartBook["num"]++;
			}
			if(isNew){
				$scope.cart.push(cartBook);
			}
		}

		$scope.removeBook = function(isbn){
			angular.forEach($scope.cart,function(e,i){
				if (e["ISBN"] === isbn) {
					$scope.cart.splice(i,1);
					return false;
				};
			});
		}
	}
]);

bookStoreControllers.controller('CartCtrl',['$scope',
	function($scope){
		$scope.show = true;
		
		$scope.toggleShow = function(){
			$scope.show = !$scope.show;
		}

	}
]);