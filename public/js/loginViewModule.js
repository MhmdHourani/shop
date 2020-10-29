// firebase api
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

// sign in to dasshbord
var LoginViewModel = function () {
	var self = this;
	let username = '';
	var result = [];

	function checkLoginUser() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				console.log('user is sign in already');
				var email = user.email;
				db.collection('UserInfo')
					.get()
					.then((comingData) => {
						comingData.docs.forEach((oneData) => {
							result.push(oneData.data());
						});
						if (result.length > 0) {
							result.forEach((data) => {
								console.log(data);
								if ((data.email = email)) {
									username = data.name;
									setCookie('userNameShopify', username);
								} else {
									username = 'this is not';
								}
							});
						}
						console.log('inside', username);
					})
					.then(() => {
						$.ajax({
							url:
								'https://5508b86bac3a0a741a216ea7b9711895:c9643de4510f517efd6d240e08193574@loqtaps-dev.myshopify.com/admin/api/2020-10/orders.json',
							type: 'GET',
							crossDomain: true,
							success: function (data) {
								console.log(data);
							},
							error: function (error) {
								console.log(error);
							},
							headers: {
								'Access-Control-Allow-Origin': '*',
							},
						});

						window.location.replace('table.html');
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				console.log('user in not sign in yet');
			}
		});
	}
	checkLoginUser();
	console.log(username);

	self.userEmail = ko.observable('').extend({
		email: true,
		required: true,
	});

	self.userPassword = ko.observable('').extend({
		required: true,
	});

	self.login = () => {
		var errors = ko.validation.group(self, { deep: true });
		console.log(errors());
		if (errors().length > 1) {
			errors.showAllMessages();
			return;
		}
		auth
			.signInWithEmailAndPassword(self.userEmail(), self.userPassword())
			.then((token) => {
				setCookie('TokenFromFirebase', token.user.l);
				// window.location.replace('table.html');
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

var form = document.querySelector('#formId');
ko.applyBindings(new LoginViewModel(), form);

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
