$('#buttonlogin').click((e) => {
	e.preventDefault();
	var email = $('#email').val();
	var password = $('#password').val();

	auth
		.signInWithEmailAndPassword(email, password)
		.then((token) => {
			setCookie('TokenFromFirebase', token.user.l);
			window.location.replace('catalog-page.html');
		})
		.catch((error) => {
			console.log(error);
		});
});

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
