const fs = require('fs');

fs.readFile('./hello.txt', (err, data) => {
	if (err){
		console.log('Errorrrrr');
	}

	console.log('1', data.toString('utf8'));
});

const file = fs.readFileSync('./hello.txt');
console.log('2', file.toString());

//APPEND
//fs.appendFile('./hello.txt', 'This is so cool!', err => 
//{
//	if (err){
//		console.log(err);
//	}
//})

//WRITE
fs.writeFile('bye.txt', 'Sad to see you go', err => {
	if (err) {
		console.log(err);
	}
});

fs.unlink('./bye.txt', err => {
	if (err){
		console.log(err)
	}
	console.log('Inception');
});