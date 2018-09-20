a = function factorial(a){
	if (a == 1)
		return 1
	return a * factorial(a - 1);
}

var user = {
	name: "John",
	age: 34, 
	hobby: "soccer",
	isMarried: false,
	shout: function(){ 
		console.log("Ahhhhh!");
	}
};

var userList = [
	{
		username:"andy",
		password:"secret"
	},
	{
		username:"jess",
		password:"123"
	}
]

console.log(a(5))