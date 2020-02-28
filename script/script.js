// Задаем поле игры
let fieldHeight = 13, fieldWidth = 21, count = 1, seconds = 0, minutes = 0, time = '';
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

// Задаем клетки и заполняем ими поле
for (let i = 0; i < fieldHeight * fieldWidth; i++) {
	let excel = document.createElement('div');
	field.appendChild(excel);
	excel.classList.add('excel');
} 

// Задаем кооординаты клеткам
let excel = document.getElementsByClassName('excel');
let x = 1, y = fieldHeight;
for (let i = 0; i < excel.length; i++) {
	if (x>fieldWidth) {
		x-=fieldWidth;
		y--;
	}
	excel[i].setAttribute('posX', x);
	excel[i].setAttribute('posY', y);
	x++;
}

// Создание змейки 
function generateSnake() {
	let posX = Math.round(Math.random()*(fieldWidth-3) + 3);
	let posY = Math.round(Math.random()*(fieldHeight-1) + 1);
	return [posX, posY];
}
let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];
for (let i = 0; i < snakeBody.length; i++) {
	snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

// Создание мыши
function createMouse() {
	function generateMouse() {
		let posX = Math.round(Math.random()*(fieldWidth-1) + 1);
		let posY = Math.round(Math.random()*(fieldHeight-1) + 1);
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

// Создание альпаки
function createAlpaca() {
	function generateAlpaca() {
		let posX = Math.round(Math.random()*(fieldWidth-1) + 1);
		let posY = Math.round(Math.random()*(fieldHeight-1) + 1);
		return [posX, posY];
	}
	let alpacaCoordinates = generateAlpaca();
	let alpaca = document.querySelector('[posX = "' + alpacaCoordinates[0] + '"][posY = "' + alpacaCoordinates[1] + '"]');

	while(alpaca.classList.contains('snakeBody') || alpaca.classList.contains('mouse')) {
		alpacaCoordinates = generateAlpaca();
		alpaca = document.querySelector('[posX = "' + alpacaCoordinates[0] + '"][posY = "' + alpacaCoordinates[1] + '"]');
	}
	return [alpacaCoordinates[0], alpacaCoordinates[1]];
}
coordinates = createAlpaca(); 
let alpaca = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]')];
alpaca[0].classList.add('alpaca');

// Описание движения
let direction = 'right', steps = false;
function move() {

	// Начало движения
	let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
	snakeBody[0].classList.remove('head');
	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
	snakeBody.pop();

	// Смена направления
	switch (direction) {
		case 'right':
			if (snakeCoordinates[0]==fieldWidth) { snakeCoordinates[0]=0; }
			snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
			break;
		case 'up':
			if (snakeCoordinates[1]==fieldHeight) { snakeCoordinates[1]=0; }
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
			break;
		case 'left':
			if (snakeCoordinates[0]==1) { snakeCoordinates[0]=fieldWidth+1; }
			snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
			break;
		case 'down':
			if (snakeCoordinates[1]==1) { snakeCoordinates[1]=fieldHeight+1; }
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] -1) + '"]'));
			break;
	}

	// Условия окончания игры
	if (snakeBody[0].classList.contains('snakeBody') || snakeBody[0].classList.contains('alpaca')) {
		if (snakeBody.length == 3) { setTimeout(() => {alert("\nIT'S OVER!!\n\nYou scored NOTHING..\nlelz");}, 1000); }
		else { setTimeout(() => { alert(`\nIT'S OVER!!\n\nYou collect ${snakeBody.length-3} dead mouses and survived for ${time} seconds.\nNot that much..`);}, 2000); }
		steps = false;
		clearInterval(interval);

		// FUCK альпаками :)
		for (let i = 0; i < alpaca.length; i++) { alpaca[i].classList.remove('alpaca') };
		let FUCK = [document.querySelector('[posX = "2"][posY = "2"]'),document.querySelector('[posX = "2"][posY = "3"]'),document.querySelector('[posX = "2"][posY = "4"]'),document.querySelector('[posX = "2"][posY = "5"]'),document.querySelector('[posX = "3"][posY = "5"]'),document.querySelector('[posX = "4"][posY = "5"]'),document.querySelector('[posX = "2"][posY = "6"]'),document.querySelector('[posX = "2"][posY = "7"]'),document.querySelector('[posX = "2"][posY = "8"]'),document.querySelector('[posX = "3"][posY = "8"]'),document.querySelector('[posX = "4"][posY = "8"]'),document.querySelector('[posX = "5"][posY = "8"]'),document.querySelector('[posX = "7"][posY = "8"]'),document.querySelector('[posX = "7"][posY = "7"]'),document.querySelector('[posX = "7"][posY = "6"]'),document.querySelector('[posX = "7"][posY = "5"]'),document.querySelector('[posX = "7"][posY = "4"]'),document.querySelector('[posX = "7"][posY = "3"]'),document.querySelector('[posX = "8"][posY = "2"]'),document.querySelector('[posX = "9"][posY = "2"]'),document.querySelector('[posX = "10"][posY = "3"]'),document.querySelector('[posX = "10"][posY = "4"]'),document.querySelector('[posX = "10"][posY = "5"]'),document.querySelector('[posX = "10"][posY = "6"]'),document.querySelector('[posX = "10"][posY = "7"]'),document.querySelector('[posX = "10"][posY = "8"]'),document.querySelector('[posX = "12"][posY = "3"]'),document.querySelector('[posX = "12"][posY = "4"]'),document.querySelector('[posX = "12"][posY = "5"]'),document.querySelector('[posX = "12"][posY = "6"]'),document.querySelector('[posX = "12"][posY = "7"]'),document.querySelector('[posX = "13"][posY = "2"]'),document.querySelector('[posX = "13"][posY = "8"]'),document.querySelector('[posX = "14"][posY = "2"]'),document.querySelector('[posX = "14"][posY = "8"]'),document.querySelector('[posX = "15"][posY = "3"]'),document.querySelector('[posX = "15"][posY = "7"]'),document.querySelector('[posX = "17"][posY = "2"]'),document.querySelector('[posX = "17"][posY = "3"]'),document.querySelector('[posX = "17"][posY = "4"]'),document.querySelector('[posX = "17"][posY = "5"]'),document.querySelector('[posX = "17"][posY = "6"]'),document.querySelector('[posX = "17"][posY = "7"]'),document.querySelector('[posX = "17"][posY = "8"]'),document.querySelector('[posX = "18"][posY = "4"]'),document.querySelector('[posX = "18"][posY = "6"]'),document.querySelector('[posX = "19"][posY = "3"]'),document.querySelector('[posX = "19"][posY = "7"]'),document.querySelector('[posX = "20"][posY = "2"]'),document.querySelector('[posX = "20"][posY = "8"]')];
		for (let i = 0; i < FUCK.length; i++) { FUCK[i].classList.add('alpaca'); }
		for (let i = 0; i < snakeBody.length; i++) {
			if (!snakeBody[i].classList.contains('alpaca')) {
				snakeBody[i].style.background = 'url("img/cry.png") center no-repeat';
				snakeBody[i].style.backgroundSize = 'cover';
				snakeBody[i].style.border = '0px';
				let randomRotation = Math.round(Math.random() * 100 - 90);
				snakeBody[i].style.transform = 'rotate(' + randomRotation + 'deg)';
			} else {
				snakeBody[i].style.background = 'url("img/alpa.png") center no-repeat';
				snakeBody[i].style.backgroundSize = 'cover';
				snakeBody[i].style.border = '0px';
				let randomRotation = Math.round(Math.random() * 50 - 30);
				snakeBody[i].style.transform = 'rotate(' + randomRotation + 'deg)';
			}
		}
	}

	// Конец движения
	snakeBody[0].classList.add('head');
	for (let i = 0; i < snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}
	steps = true;

	// Поедание мышей
	if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY') ) {
		mouse.classList.remove('mouse');
		snakeBody[0].classList.add('head');
		let a = snakeBody[snakeBody.length-1].getAttribute('posX');
		let b = snakeBody[snakeBody.length-1].getAttribute('posY');
		snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b +'"]'));
		createMouse();
	}

	// Спаун альпак
	if ((Math.round(Math.random()*(alpaca.length+snakeBody.length)) == 1) & steps) {
		coordinates = createAlpaca();
		alpaca.push(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'));
		alpaca[alpaca.length - 1].classList.add('alpaca');		
	}
	
	// Таймер
	count+=2;
	if (count == 11) {
		seconds++;
		count=1;
		if (seconds == 60) {
			minutes++;
			seconds=0;
		}
	}
	if (minutes < 10) {
		if (seconds < 10) { time = `0${minutes}:0${seconds}.${count}`; }
		else { time = `0${minutes}:${seconds}.${count}`; }
	} else if (seconds < 10 ) { time = `${minutes}:0${seconds}.${count}`; }
	else { time = `${minutes}:${seconds}.${count}`; }

	// Апдейт
	input.value = `   score . . ${snakeBody.length-3}   time . . ${time}`;
}


// Бокс счет и таймер
input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
width: 300px;
height: 40px;
background-color: #f5abef;
border-radius: 7%;
border: 4px solid #000;
font: normal small-caps 120%/120% fantasy;
display: flex;
margin: auto;
margin-top: 10px;
font-size: 28px;`;
input.value = `time..${time}   score..${snakeBody.length-3}`;

// Запуск
let interval = setInterval(move, 200);

// Нажатие клавиш
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