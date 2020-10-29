//// firebase api key
var firebaseConfig = {
	apiKey: 'AIzaSyCnxIY6xZz39f4ZalxgLimohuoKBxFhWCI',
	authDomain: 'shopwebsite-e5a7b.firebaseapp.com',
	databaseURL: 'https://shopwebsite-e5a7b.firebaseio.com',
	projectId: 'shopwebsite-e5a7b',
	storageBucket: 'shopwebsite-e5a7b.appspot.com',
	messagingSenderId: '647207238478',
	appId: '1:647207238478:web:6db311ae29e9169368fc1f',
	measurementId: 'G-GJYWH66EZE',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

var tableViewModule = function () {
	var self = this;
	var username = getCookie('userNameShopify');

	self.userNameNavbar = ko.observable(username);

	self.logout = () => {
		auth.signOut().then(() => {
			console.log('Sign Out sucssufly');
			window.location.replace('login.html');
		});
	};

	var orders = [
		{
			ordername: 'bone',
			orderPosition: 'new',
			orderCount: 'order',
			orderprice: '$34',
			orderDate: '2020',
		},
	];

	self.orders = ko.observableArray(orders);
};

ko.applyBindings(new tableViewModule(), document.querySelector('#wrapper'));

// heler function

function setCookie(cname, cvalue) {
	document.cookie = cname + '=' + cvalue + ';' + ';path=/';
}

function getCookie(cname) {
	var cookies = document.cookie
		.split(';')
		.map((cookie) => cookie.split('='))
		.reduce(
			(accumulator, [key, value]) => ({
				...accumulator,
				[key.trim()]: decodeURIComponent(value),
			}),
			{}
		);
	return cookies[cname];
}
