var isStartGame = false,
	timerElement = document.getElementById('timer'),
	startButtonElement = document.getElementById('startGame'),
	allImgElement = document.getElementById('images'),
	timer,life,redBlocks;

function startCounter () {
	var counter = 5;

	timerElement.innerHTML = "Timer left " + counter + " sec";

	timer = setInterval(function() {

		counter--;
		timerElement.innerHTML = "Timer left " + counter + " sec";

		if(counter < 1) {
			life--;
			allImgElement.children[life] && allImgElement.children[life].setAttribute('src', 'life_over.png');

			if(life < 1) {
				isStartGame = false;
				timerElement.innerHTML = "Game Overrrr...";
				startButtonElement.innerHTML = 'Restart Game';
				var removeEle = document.getElementsByClassName("red");
				while(removeEle.length > 0) {
					removeEle[0].classList.remove("red");
				}
				clearInterval(timer);
			} else {
				clearInterval(timer);
				startCounter();
			}
		} 
	}, 1000);
}

function getRandomValueArr() {
	var arr = []
	while(arr.length < 5){
		var randomnumber = getRandomArbitrary(1,25)
		if(arr.indexOf(randomnumber) > -1) continue;
		arr[arr.length] = randomnumber;
	}
	return arr;
}

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (1 + max - min)) + min;
}

document.getElementById("startGame").addEventListener("click", function () {
	if(!isStartGame) {
		life = 3;
		redBlocks = 5;
		isStartGame = true;
		startButtonElement.innerHTML = 'Game Running';
		resetImages();
		getRandomValueArr().map(function(value, index, arr) {
			document.getElementById(value).className += " red";
		});
		startCounter();
	}
});

document.getElementById("gameboard").addEventListener("click", function (event) {
	if(isStartGame) {
		if(event.target.classList.contains("red")){
			event.target.classList.remove("red");
			redBlocks--;
			if(redBlocks < 1) {
				isStartGame = false;
				clearInterval(timer);
				startButtonElement.innerHTML = 'Restart Again';
				timerElement.innerHTML = 'Huraah...!!! You Won the Game.';
				alert('Huraah...!!! You Won the Game.');
			}
		} else {
			event.target.classList.add("red");
			redBlocks++;
		}
	}
});

function resetImages() {
	var imageHtmlColl = allImgElement.children,
		imageHtmlCollLength = imageHtmlColl.length;

	while(imageHtmlCollLength > 0) {
		imageHtmlCollLength--;
		imageHtmlColl[imageHtmlCollLength].setAttribute('src', 'life.png');
	}
}
