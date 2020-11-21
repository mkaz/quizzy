import 
	React, 
	{ useEffect, useState } from 'react';

import Problem from './Problem';

const LENGTH = 30;

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
			return () => clearTimeout(timer);
		}
		if ( timeRemaining <= 0 ) {
			setGameOverMan(true);
		}
	}, [ hasStarted, timeRemaining ]);

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
							<div className="results">
								{ correct } out of { correct + incorrect }
							</div>
							:
							<Problem
								onCorrect={ () => setCorrect(correct+1) }
								onIncorrect={ () => setIncorrect(incorrect+1) }
							/>
						}
					</div>
					: 
					<button 
						className="start-game"
						onClick={ () => setStarted(true) }>
						Start
					</button>
				}


			</div>
		</main>
	);
}

export default App;
