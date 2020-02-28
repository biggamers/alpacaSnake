// Задаем поле игры
let fieldHeight = 13, fieldWidth = 20, count = 0, seconds = 0, minutes = 0;
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
		setTimeout(() => { alert("It's over! Your score: " + (snakeBody.length-3)); }, 2000);
		clearInterval(interval);
		for (let i = 0; i < snakeBody.length; i++) {
			snakeBody[i].style.background = 'url("icons/cry.png") center no-repeat';
			snakeBody[i].style.backgroundSize = 'cover';
			snakeBody[i].style.border = '0px';
			let randomRotation = Math.round(Math.random() * 120 - 100);
			snakeBody[i].style.transform = 'rotate(' + randomRotation + 'deg)';
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
	if ((Math.round(Math.random()*23) == 1) & steps) {
		coordinates = createAlpaca();
		alpaca.push(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'));
		alpaca[alpaca.length - 1].classList.add('alpaca');		
	}
	
	// Таймер
	count+=2;
	if (count % 10 == 0) {
		seconds++;
		count=0;
		if (seconds == 60) {
			minutes++;
			seconds=0;
		}
	}

	input.value = `Score.. ${snakeBody.length-3}  Time.. ${minutes}:${seconds}.${count}`;
}



input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
width: 400px;
background-color: #f5abef;
border-radius: 10%;
border: 3px solid #000;
text-align: center;
display: flex;
margin: auto;
margin-top: 10px;
font-size: 30px;`;
input.value = `Score.. ${snakeBody.length-3}  Time.. ${minutes}:${seconds}.${count}`;



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
