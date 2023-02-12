// Game Logic

document.addEventListener('DOMContentLoaded', () => {

	const board = document.querySelector('.board');
	const container = document.querySelector('.container');
	const restartBtn = document.querySelector('.restartBtn');
	const title = document.querySelector('.title');
	const check = document.querySelector('.check');

	const winning_indicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

	const width = 3;

	// Populate Board

	function populateBoard() {

		for (let i = 0; i < width * width; i++) {
			const square = document.createElement('div');
			square.classList.add('cell');
			square.setAttribute('id', i);
			board.appendChild(square);
		}
	}

	populateBoard();	

	check.addEventListener('click', () => {
		if (check.checked) {
			board.classList.add('dark');
			container.classList.add('dark');
			restartBtn.classList.add('dark');
			title.classList.add('dark');
			check.classList.add('dark');
		} else {
			board.classList.remove('dark');
			container.classList.remove('dark');
			restartBtn.classList.remove('dark');
			title.classList.remove('dark');
			check.classList.remove('dark');
		}
	});

	const cells = Array.from(document.querySelectorAll('.cell'));
	const X_TEXT = 'X';
	const O_TEXT = 'O';
	let currentPlayer = X_TEXT;
	let spaces = Array(9).fill(null);

	const WINNING_COMBINATION = [

		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	const startGame = () => {
		cells.forEach(cell => cell.addEventListener('click', boxClicked));
	}

	function boxClicked(e) {

		const id = e.target.id;

		if (!spaces[id]) {
			spaces[id] = currentPlayer;
			e.target.innerText = currentPlayer;

			if(playerHasWon() != false) {

				title.innerText = `${currentPlayer} has won !`;
				let winningBlock = playerHasWon();

				winningBlock.map(box => cells[box].style.backgroundColor = winning_indicator);
				return
			}

			currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
		}
	}

	function playerHasWon() {

		for (const condition of WINNING_COMBINATION) {
			let [a, b, c] = condition;

			if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {

				return [a, b, c];
			}
		}

		return false;
	}

	restartBtn.addEventListener('click', restart);

	function restart() {

		spaces.fill(null);

		cells.forEach(box => {
			box.innerText = '';
			box.style.backgroundColor = "transparent";
		});

		title.innerText = 'Tic Tac Toe';

		currentPlayer = X_TEXT;
	}

	startGame();

});
