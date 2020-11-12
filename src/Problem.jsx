import React, { useState } from 'react';

function getRandomNumber() {
	return Math.floor(Math.random() * 10);
}

function Problem( { onCorrect, onIncorrect } ) {

	const [ a, setA ] = useState( getRandomNumber() );
	const [ b, setB ] = useState( getRandomNumber() );
	const [ answer, setAnswer ] = useState();

	const nextProblem = () => {
		setA( getRandomNumber() );
		setB( getRandomNumber() );
		setAnswer('');
	}

	const checkAnswer = ( evt ) => {
		// dont submit
		evt.preventDefault();

		let correctAnswer = a * b;
		let guess = parseInt(answer, 10);
		console.log("Correct Answer: ", correctAnswer);
		console.log("Guess: ", guess);
		if ( correctAnswer === guess ) {
			onCorrect();
		} else {
			onIncorrect();
		}
		nextProblem();
	};

	const onAnswerChange = ( evt ) => {
		const { value } = evt.target;
		setAnswer( value )
	}

	return (
		<div className="problem">
			<table className="problem-table">
				<tbody>
				<tr>
					<td colSpan="2" className="tda">{a}</td>
				</tr>
				<tr>
					<td>x</td>
					<td className="tdb">{b}</td>
				</tr>
				</tbody>
			</table>
			<div className="answer">
				<form onSubmit={ checkAnswer }>
					<input 
						autoFocus
						type="number" 
						className="answer-field"
						value={ answer }
						onChange={ onAnswerChange }
					/>
					<input type="submit" value="✔" />
				</form>
			</div>
		</div>
	);
}	

export default Problem;