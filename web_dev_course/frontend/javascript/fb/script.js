var db = [
	{
		username:"andrei",
		password: "supersecret"
	},
	{
		username:"ingrid",
		password:"777"
	}
];

var newsFeed = [
	{
		username:"Bobby",
		timeline:"So tired from all that learning"
	},
	{
		username: "Sally",
		timeline: "Javascript is sooo cool!"
	}
];

function isUserValid(username, password){
	for (var i = 0; i < db.length; i++){
		if (db[i].username == username && db[i].password == password)
			return true;
	}

	return false;
}

function signIn(user, pass){
	if (isUserValid(user, pass))
		console.log(newsFeed);
	else
		alert("Sorry, wrong login")
}

var userNamePrompt = prompt("What's your user?");
var passwordPrompt = prompt("What's your password?");

signIn(userNamePrompt, passwordPrompt);