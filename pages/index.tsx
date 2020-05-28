import React, { useState, useEffect } from 'react'
import '../public/assets/css/index.css'
import img from '../public/assets/img/blueberry-logo.svg'
import { DEFAULT_QUESTIONS, ALL_QUESTIONS } from '../data'


const init = {
  question: DEFAULT_QUESTIONS[0],
  next: DEFAULT_QUESTIONS.slice(1),
  answers: {},
  complete: false,
  confirm: false
}


export default function Index() {
  const [state, update] = useState(init)

    const {
      question,
      next,
      answers,
      complete,
      confirm
    } = state

  const { wording, if_yes_ask, if_no_ask }: any = ALL_QUESTIONS[question]

  useEffect(() => {

    if(complete) {
      //perform api call
    }

  }, [complete])

  const handle_answer = function(answer: string) {
    answers[question] = answer

    if (answer === 'yes')
      next.unshift(...if_yes_ask)
    else
      next.unshift(...if_no_ask)

    if(next.length === 0) {
      update({ ...state, confirm: true, answers})
    } else {
      update({ ...state, question: next.shift(), next, answers })
    }
  }

  const confirm_answers = function(answer: string) {

      if(answer === 'yes')
        update({...state, confirm: false, complete: true})
      else
        update({
          question: DEFAULT_QUESTIONS[0],
          next: DEFAULT_QUESTIONS.slice(1),
          answers: {},
          complete: false,
          confirm: false
        })
  }
  console.log(confirm, complete)
  return (
      <div >
        {
         confirm &&
          <div className="overlay">
           <div className="container modal">
              <div style={{marginBottom: '1rem'}}>Confirm your answers are correct below:</div>
              {
                Object.keys(answers).map((q) => <div className="question">{ALL_QUESTIONS[q].wording} : <div className="answer">{answers[q]}</div></div>)
              }
              <div className="buttons">
                <button onClick={() => confirm_answers('yes')}>YES</button>
                <button onClick={() => confirm_answers('no')}>NO</button>
              </div>
            </div>
          </div>
        }
        {
          complete &&
          <div className="overlay">
            <div className="container modal">
              Your response has been submitted!
            </div>
          </div>
        }
        <div className="header">
          <img src={img} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="container">
            <div className="question">{wording}</div>
            <div className="buttons">
              <button onClick={() => handle_answer('yes')}>YES</button>
              <button onClick={() => handle_answer('no')}>NO</button>
            </div>
          </div>
        </div>
      </div>
    )
}
