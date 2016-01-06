var bookStoreControllers = angular.module("BookStoreControllers",[]);

bookStoreControllers.controller('BookListCtrl',['$scope','Book',
	function($scope,Book){
		$scope.current = {};
		$scope.query = "";
		$scope.books =Book.getBooks();
		$scope.cart = Book.getCart();
		$scope.setCurrent = function(current){
			$scope.current = current;
		}
		$scope.comfirmEdit = function(book){
			var res = Book.updateBook(book);
			if(res){
				hidePopupDiv($('#editBookLayer'));
			}
		}
		$scope.deleteBook = function(isbn){
			Book.deleteBook(isbn);
		}
		$scope.addBookToCart = function(isbn){
			Book.addBookToCart(isbn);
		}
		$scope.removeBookFromCart = function(isbn) {
			Book.removeBookFromCart(isbn);
		} 
	}
]);

bookStoreControllers.controller('CartCtrl',['$scope',
	function($scope){
		this.total = 0;
		$scope.show = true;
		
		$scope.toggleShow = function(){
			$scope.show = !$scope.show;
		}

		$scope.getTotal = function(){
			return Object.keys($scope.$parent.cart).map(function(k){
				return (+$scope.$parent.cart[k].price *0.64) *(+$scope.$parent.cart[k].num);
			}).reduce(function(a,b){return a+b;},0);
		}
	}
]);