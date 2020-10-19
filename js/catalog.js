// logout the usre from firebase firestore

$('#logoutspan').click((e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		console.log('Sign Out sucssufly');
		window.location.replace('login.html');
	});
});
