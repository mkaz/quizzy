import 
	React, 
	{ useEffect, useState } from 'react';

const LENGTH = 6;

const App = () => {
	
	const [ hasStarted, setStarted ] = useState(false);
	const [ isGameOver, setGameOverMan ] = useState(false);
	
	const [ correct, setCorrect ] = useState( 0 );
	const [ incorrect, setIncorrect ] = useState( 0 );
	const [ timeRemaining, updateTime ] = useState( LENGTH );
	useEffect( () => {
		if ( hasStarted && timeRemaining > 0 ) {
			const timer = setTimeout( () => {
				updateTime( timeRemaining - 1 );
			}, 1000 );

			// clean up timer
			console.log("Clearing Interval", timeRemaining )
			return () => clearTimeout(timer);
		}
		if ( timeRemaining <= 0 ) {
			setGameOverMan(true);
		}
	}, [ hasStarted, timeRemaining ]);

	const startGame = () => {
		setStarted( true );
	};

	return (
		<main>
			<header>
				<h2> Quizzy Math </h2>
			</header>
			<div className="board">
				{ hasStarted ?
					<div>
						Time Remaining: { timeRemaining } secs					
						{ isGameOver ?
							<div>Results</div>
							:
							<div>Problem</div>
						}
					</div>
					: 
					<button onClick={ startGame }>
						Start Game
					</button>
				}


			</div>
		</main>
	);
}

export default App;
