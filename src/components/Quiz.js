import React, { useEffect, useState } from 'react'
import Question from './Questions'
import { moveNextAction, movePrevAction } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

// import redux store
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz() {

    const [check, setChecked] = useState(undefined)

    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    // const trace = state.trace;
    const dispatch = useDispatch()


    // next button event handler
    function onNext() {
        // console.log('On next click')

        if (trace < queue.length) {
            dispatch(moveNextAction())

            if (result.length <= trace) {
                dispatch(PushAnswer(check))
            }
        }

        setChecked(undefined)
    }

    // previous button event handler
    function onPrev() {
        
        if (trace > 0) {
            dispatch(movePrevAction())
        }
        
    }

    function onChecked(check){
        console.log(check)
        setChecked(check)
    }

    //finished exam after the last question
    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace="true"></Navigate>
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        {/* display question */}
        <Question onChecked={onChecked} />

        <div className='grid'>
            {trace > 0 ? <button className='btn prev' onClick={onPrev}>Previous</button> : <div></div>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}
