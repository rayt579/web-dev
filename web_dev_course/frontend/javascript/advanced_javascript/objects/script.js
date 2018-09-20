let object1 = {value: 10};
let object2 = {value: 10};
let object3 = object1;


const object4 = {
	a: function() {
		console.log(this);
	}
}


class Player{
	constructor(name, type){
		this.name = name;
		this.type = type;
	}

	introduce(){
		console.log('Hi I am ${this.name}, I'm a ${this.type}');
	}
}

class Wizard extends Player {
	constructor(name, type){
		super(name, type);
	}
	play(){
		console.log(`Weeeee I'm a ${this.type}`);
	}
}

const wizard1 = new Wizard('Shelly', 'Healer');
const wizard2 = new Wizard('Shawn', 'Dark Mage');