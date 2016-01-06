var bookStoreServices = angular.module('BookStoreServices',['ngResource']);

bookStoreServices.factory('Book',['$resource',
	function($resource){
		var service = {}; 
		var books = booklist;
		var cart = [];
		service.getBooks = function (){
			return books;
		}

		service.getCart = function(){
			return cart;
		}

		service.updateBook = function(book){
			var isbn = book.ISBN;
			angular.forEach(books,function(e,i){
				if (e["ISBN"] === isbn) {
					books.splice(i,1,book);
					return false;
				};
			});
			return true;
		}

		service.deleteBook = function(isbn){
			angular.forEach(books,function(e,i){
				if (e["ISBN"] === isbn) {
					books.splice(i,1);
					return false;
				};
			});
		}

		service.addBookToCart = function(isbn){
			var book = getBookById(isbn);
			var cartBook = angular.extend({},book);
			cartBook["num"] = 0;
			var isNew = true;
			angular.forEach(cart,function(e){
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
				cart.push(cartBook);
			}
		}

		service.removeBookFromCart = function(isbn){
			angular.forEach(cart,function(e,i){
				if (e["ISBN"] === isbn) {
					cart.splice(i,1);
					return false;
				};
			});
		}

		function getBookById (isbn){
			var res = null;
			angular.forEach(books,function(e){
				if (e["ISBN"] === isbn) {
					res = e;
					return false;
				};
			});
			return res;
		}	

		return service;
	}
]);