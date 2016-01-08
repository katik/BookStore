var bookStoreServices = angular.module('BookStoreServices',['ngResource','ngCookies']);

bookStoreServices.factory('Book',['$resource','$cookies',
	function($resource,$cookies){
		var service = {}; 
		var books = booklist;
		var cart = [] ;
		if($cookies.get("D-Cart")){
			var cookies = JSON.parse($cookies.get("D-Cart"));
			cart = convertFromCookies(cookies);
		}
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
			$cookies.put("D-Cart",JSON.stringify(convertToCookies(cart)));
		}

		service.removeBookFromCart = function(isbn){
			angular.forEach(cart,function(e,i){
				if (e["ISBN"] === isbn) {
					cart.splice(i,1);
					return false;
				};
			});
			$cookies.put("D-Cart",JSON.stringify(convertToCookies(cart)));
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

		//convert from cookie item's isbn and num to cart item
		function convertFromCookies(array){
			var cart = [];
			angular.forEach(array,function(e){
				var book = getBookById(e.ISBN);
				var cartBook = angular.extend({},book);
				cartBook["num"] = e.num;
				cart.push(cartBook);
			});
			return cart;
		}

		//save cart item's  isbn and num to cookie format
		function convertToCookies(array){
			var cookies = [];
			angular.forEach(array,function(e){
				var book = getBookById(e.ISBN);
				var cookie = {};
				cookie["num"] = e.num;
				cookie["ISBN"] = e.ISBN;
				cookies.push(cookie);
			});
			return cookies;
		}
		return service;
	}
]);