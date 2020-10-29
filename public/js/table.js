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
	var result = [];
	var username = getCookie('userNameShopify');

	// async function man() {
	// 	auth.onAuthStateChanged((user) => {
	// 		if (user) {
	// 			var email = user.email;
	// 			db.collection('UserInfo')
	// 				.get()
	// 				.then((comingData) => {
	// 					comingData.docs.forEach((oneData) => {
	// 						result.push(oneData.data());
	// 					});
	// 					if (result.length > 0) {
	// 						result.forEach((data) => {
	// 							console.log(data);
	// 							if ((data.email = email)) {
	// 								username = data.name;
	// 							} else {
	// 								username = 'this is not';
	// 							}
	// 						});
	// 					}
	// 				})
	// 				.catch((error) => {
	// 					console.log(error);
	// 				});
	// 		}
	// 	});
	// 	try {
	// 		console.log('this is in try', username, 'this');
	// 	} catch (error) {
	// 		console.log(error);
	// 		console.log('this is in cathc');
	// 		return;
	// 	}
	// }
	// man();
	// console.log(username);

	self.userNameNavbar = ko.observable(username);

	// function checkLoginUser() {
	// 	auth.onAuthStateChanged((user) => {
	// 		if (user) {
	// 			var email = user.email;
	// 			db.collection('UserInfo')
	// 				.get()
	// 				.then((comingData) => {
	// 					comingData.docs.forEach((oneData) => {
	// 						result.push(oneData.data());
	// 					});
	// 					if (result.length > 0) {
	// 						result.forEach((data) => {
	// 							if ((data.email = email)) {
	// 								username = data.name;
	// 							}
	// 						});
	// 					}
	// 					console.log(username);
	// 					console.log(self.userNameNavbar());
	// 				})
	// 				.catch((error) => {
	// 					console.log(error);
	// 				});
	// 		}
	// 	});
	// }
	// checkLoginUser();

	self.logout = () => {
		auth.signOut().then(() => {
			console.log('Sign Out sucssufly');
			window.location.replace('login.html');
		});
	};

	// self.getcurrentuserdata = () => {
	// getUser();
	// function getUser() {
	// 	var firstData = [];
	// 	firebase.auth().onAuthStateChanged((data) => {
	// 		if (data) {
	// 			db.collection('UserInfo')
	// 				.get()
	// 				.then((comingData) => {
	// 					comingData.docs.forEach((oneData) => {
	// 						firstData.push(oneData.data());
	// 					});
	// 				})
	// 				.catch((error) => {
	// 					console.log(error);
	// 				});
	// 		} else {
	// 			console.log('There no user signed in');
	// 		}
	// 	});
	// }

	// };
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
