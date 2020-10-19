// create new user with email and password in authintication and mobile and name in cloud
var SignUpViewModel = () => {
	var self = this;

	self.userName = ko.observable();
	self.userPassword = ko.observable();
	self.userEmail = ko.observable();
	self.userMobile = ko.observable();

	self.signup = () => {
		console.log('signing up ' + self.userName());
		auth
			.createUserWithEmailAndPassword(self.userEmail(), self.userPassword())
			.then((token) => {
				token = token.user.l;
				db.collection('UserInfo').add({
					name: self.userName(),
					email: self.userEmail(),
					mobile: self.userMobile(),
				});
				setCookie('tokenFromFirebase', token);
				self.userName = '';
				self.userPassword = '';
				self.userEmail = '';
				self.userMobile = '';
				window.location.replace('catalog-page.html');
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

ko.applyBindings(new SignUpViewModel());
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
// helper function
*/
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
