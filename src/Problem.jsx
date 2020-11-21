import React, { useState } from 'react';
import classNames from 'classnames';

function getRandomNumber() {
	return Math.floor(Math.random() * 10);
}

function Problem( { onCorrect, onIncorrect } ) {

	const [ a, setA ] = useState( getRandomNumber() );
	const [ b, setB ] = useState( getRandomNumber() );
	const [ answer, setAnswer ] = useState();
	const [ correct, setCorrect ] = useState(0);
	const [ correctAnswer, setCorrectAnswer ] = useState(null);

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

		if ( correctAnswer === guess ) {
			// switch to green and then nextProblem after 250
			setCorrect(1);
			setTimeout( () => { 
				setCorrect(0);
				onCorrect();
				nextProblem();
			}, 750 );
		} else {
			// switch to red/cross out and then nextProblem after 500
			setCorrect(-1);
			setCorrectAnswer(correctAnswer);
			setTimeout( () => {
				onIncorrect();
				setCorrect(0);
				setCorrectAnswer(null);
				nextProblem();
			}, 1500 );
		}
	
	};

	const onAnswerChange = ( evt ) => {
		const { value } = evt.target;
		setAnswer( value )
	}

	const CorrectAnswer = () => {
		if ( ! correctAnswer ) { return null; }
		return (
			<div className="correct-answer">
				{correctAnswer}
			</div>
		);
	}
	
	let answerClass = classNames('answer-field', { correct: correct === 1, incorrect: correct === -1 })

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
						className={ answerClass }
						value={ answer }
						onChange={ onAnswerChange }
					/>
					<input type="submit" value="✔" />
					<CorrectAnswer />
				</form>
			</div>
		</div>
	);
}	

export default Problem;