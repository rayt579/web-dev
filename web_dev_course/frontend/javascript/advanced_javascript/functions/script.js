//Closure
const first = () => {
	let greet = 0;
	const second = () => {
		alert(greet);
		greet += 1;
	}
	return second;
}

const newFunc = first();
newFunc();

//Currying
const multiply = (a,b) => a * b;
const curriedMultiply = (a) => (b) => a * b;
curriedMultiply(3)(5);
const multiplyByFive = curriedMultiply(5);

//Compose
const compose = (f, g) = (a) => f(g(a));
const sum = (num) => num + 1;
compose(sum, sum)(5);
