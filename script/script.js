input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 0px;
margin-bottom: 40px
font-size: 35px;
display: block`;
input.value = ` Мышь: еда, Альпака: нет..`;
size = 17;

let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 0; i < size**2; i++) {
	let excel = document.createElement('div');
	field.appendChild(excel);
	excel.classList.add('excel');
} 
let excel = document.getElementsByClassName('excel');
let x = 1, y = size;

for (let i = 0; i < excel.length; i++) {
	if (x>size) {
		x-=size;
		y--;
	}
	excel[i].setAttribute('posX', x);
	excel[i].setAttribute('posY', y);
	x++;
}
function generateSnake() {
	let posX = Math.round(Math.random()*(size-3) + 3);
	let posY = Math.round(Math.random()*(size-1) + 1);
	return [posX, posY];
}
let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];

for (let i = 0; i < snakeBody.length; i++) {
	snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

function createMouse() {
	function generateMouse() {
		let posX = Math.round(Math.random()*(size-1) + 1);
		let posY = Math.round(Math.random()*(size-1) + 1);
		return [posX, posY];
	}
	let mouseCoordinates = generateMouse();
	mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

	while(mouse.classList.contains('snakeBody') || mouse.classList.contains('alpaca')) {
		let mouseCoordinates = generateMouse();
		mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
	}

	mouse.classList.add('mouse');
}
createMouse();

function createAlpaca() {
	function generateAlpaca() {
		let posX = Math.round(Math.random()*(size-1) + 1);
		let posY = Math.round(Math.random()*(size-1) + 1);
		return [posX, posY];
	}
	let alpacaCoordinates = generateAlpaca();
	alpaca = document.querySelector('[posX = "' + alpacaCoordinates[0] + '"][posY = "' + alpacaCoordinates[1] + '"]');

	while(alpaca.classList.contains('snakeBody') || alpaca.classList.contains('mouse')) {
		let alpacaCoordinates = generateAlpaca();
		alpaca = document.querySelector('[posX = "' + alpacaCoordinates[0] + '"][posY = "' + alpacaCoordinates[1] + '"]');
	}
	alpaca.classList.add('alpaca');
	return alpacaCoordinates[0] + 50*alpacaCoordinates[1];
}
let alpacaChecker = [0], alpacaTotal = 0;
alpacaChecker[0] = createAlpaca();
let direction = 'right', steps = false;
let scoreA = 0.5, scoreB = 1, scoreTotal = 0, mouseTotal = 0;

input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display: block`;
input.value = ` Па-аау, Ваш счёт: ${scoreTotal}`;

function move() {
	let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
	snakeBody[0].classList.remove('head');
	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
	snakeBody.pop();
	switch (direction) {
		case 'right':
			if (snakeCoordinates[0]==size) { snakeCoordinates[0]=0; }
			snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
			break;
		case 'up':
			if (snakeCoordinates[1]==size) { snakeCoordinates[1]=0; }
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
			break;
		case 'left':
			if (snakeCoordinates[0]==1) { snakeCoordinates[0]=size+1; }
			snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
			break;
		case 'down':
			if (snakeCoordinates[1]==1) { snakeCoordinates[1]=size+1; }
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] -1) + '"]'));
			break;
	}
	if ( snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY') ) {
		mouse.classList.remove('mouse');
		let a = snakeBody[snakeBody.length-1].getAttribute('posX');
		let b = snakeBody[snakeBody.length-1].getAttribute('posY');
		snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b +'"]'));
		createMouse();
		mouseTotal ++;
		if (mouseTotal % 7 == 0) { 
			alpacaTotal++;
			alpacaChecker[alpacaTotal] = createAlpaca();
		}
/*
		scoreTotal = scoreA + scoreB;
		scoreA = scoreB;
		scoreB = scoreTotal;
*/
		scoreTotal+=scoreB;
		scoreB+=scoreA;
		input.value = ` Па-аау, Ваш счёт: ${scoreTotal}`;
	}
	let alpacaTest1 = false;
	for (let i = 0; i < alpacaChecker.length; i++) {
		if (alpacaChecker[i] == (parseInt(snakeBody[0].getAttribute('posX')) + 50 * parseInt(snakeBody[0].getAttribute('posY')))) { alpacaTest1 = true; }
	}
	if (alpacaTest1) {
		alpaca.classList.remove('alpaca');
		setTimeout(() => { alert('Игра закончилась!! Съедено приблизительно ' + mouseTotal + ' мышей... и одна АЛЬПАКА. гРР. ГррРРР.'); }, 200);
		clearInterval(interval);
		for (let i = 0; i < snakeBody.length; i++) {
			snakeBody[i].style.background = 'url(../icons/cry.png) center no-repeat';
			snakeBody[i].style.backgroundSize = 'cover';
			snakeBody[i].style.border = '0px';
			let randomRotation = Math.round(Math.random() * 120 - 100);
			snakeBody[i].style.transform = 'rotate(' + randomRotation + 'deg)';
		}
	}
	if (snakeBody[0].classList.contains('snakeBody')) {
		setTimeout(() => { alert('Игра закончилась!! Съедено приблизительно ' + mouseTotal + ' мышей...'); }, 200);
		clearInterval(interval);
		for (let i = 0; i < snakeBody.length; i++) {
			snakeBody[i].style.background = 'url(cry.png) center no-repeat';
			snakeBody[i].style.backgroundSize = 'cover';
			snakeBody[i].style.border = '0px';
			let randomRotation = Math.round(Math.random() * 120 - 100);
			snakeBody[i].style.transform = 'rotate(' + randomRotation + 'deg)';
		}
	}
	snakeBody[0].classList.add('head');
	for (let i = 0; i < snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}
	steps = true;
}
let interval = setInterval(move, 300);

window.addEventListener('keydown', function(e) {
	if (steps) {
		switch (e.keyCode) {
			case 37:
			case 65:
				if (direction != 'right') { direction = 'left'; }
				break;
			case 38:
			case 87:
				if (direction != 'down') { direction = 'up'; }
				break;
			case 39:
			case 68:
				if (direction != 'left') { direction = 'right'; }
				break;
			case 40:
			case 83:
				if (direction != 'up') { direction = 'down'; }
				break;
		}
		steps = false;
	}
});
