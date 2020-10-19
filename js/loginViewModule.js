var LoginViewModel = () => {
	var self = this;

	self.userEmail = ko.observable();
	self.userPassword = ko.observable();

	self.login = () => {
		auth
			.signInWithEmailAndPassword(self.userEmail(), self.userPassword())
			.then((token) => {
				setCookie('TokenFromFirebase', token.user.l);
				window.location.replace('catalog-page.html');
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

ko.applyBindings(new LoginViewModel());

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
