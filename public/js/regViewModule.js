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

// create new user with email and password in authintication and mobile and name in cloud
var SignUpViewModel = function () {
	var self = this;

	self.userName = ko.observable('').extend({
		required: true,
		minLength: 3,
	});
	self.userPassword = ko.observable('').extend({
		required: true,
		minLength: 8,
	});
	self.userEmail = ko.observable('').extend({
		required: true,
		email: true,
	});
	self.userMobile = ko.observable('').extend({
		required: true,
		minLength: 6,
	});

	self.signup = () => {
		var errors = ko.validation.group(self, { deep: true });
		if (errors().length > 1) {
			return;
		}
		var tag = genarateTag(self.userName(), self.userEmail());
		auth
			.createUserWithEmailAndPassword(self.userEmail(), self.userPassword())
			.then((token) => {
				token = token.user.l;
				db.collection('UserInfo')
					.add({
						name: self.userName(),
						email: self.userEmail(),
						mobile: self.userMobile(),
						tag: tag,
					})
					.then((comingData) => {
						setCookie('tokenFromFirebase', token);
						self.userName = '';
						self.userPassword = '';
						self.userEmail = '';
						self.userMobile = '';
						window.location.replace('catalog-page.html');
					});
			})
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode == 'auth/weak-password') {
					alert('The password is too weak.');
				} else {
					alert(errorMessage);
				}
				console.log(error);
			});
	};
};
var form = document.querySelector('#formId');

ko.applyBindings(new SignUpViewModel(), form);
/*

// read the data from firebase firestore
db.collection('UserInfo')
	.get()
	.then((comingData) => {
		comingData.docs.forEach((oneData) => {
			console.log(oneData.data());
		});
	})
	.catch((error) => {
		console.log(error);
	});

////////////////////////////////////////////////////////////
*/

//////////////////////////////////
// helper function

// This finction to build a uniqe tag for every user and i use name and email and time
function genarateTag(name, email) {
	var tag = '';
	var date = Date.now();
	// to remove any space from user name
	var name = name.toString().split(' ').join('');
	// to get the first part from email before @
	var email = email.toString().split('@');

	tag += name + date + email[0];
	return tag;
}

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

function getAllCookie() {
	return document.cookie
		.split(';')
		.map((cookie) => cookie.split('='))
		.reduce(
			(accumulator, [key, value]) => ({
				...accumulator,
				[key.trim()]: decodeURIComponent(value),
			}),
			{}
		);
}

function checkCookie() {
	var user = getCookie('username');
	if (user != '') {
		alert('Welcome again ' + user);
	} else {
		user = prompt('Please enter your name:', '');
		if (user != '' && user != null) {
			setCookie('username', user, 365);
		}
	}
}
