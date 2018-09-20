const obj = {
	player: 'bobby',
	experience: 100,
	wizardLevel: false
}

const first = () =>{
    const greet = 'Hi';
    const second = () => {
        alert(greet)
    }

    return second;
}

const { player, experience } = obj;
