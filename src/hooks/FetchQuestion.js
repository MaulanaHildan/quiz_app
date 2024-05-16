import { useEffect, useState } from "react";
import data, { answers } from "../database/data";
import { useDispatch } from "react-redux";

//redux actions
import * as Action from '../redux/question_reducer';
import { getServerData } from "../helper/helper";

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        (async () => {
    
            try {
                let question = await data;
                const [q] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
                console.log(q)
                if(question.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiData : question}));

                    /** dispatch an action */
                    dispatch(Action.startExamAction({ question, answers }))

                } else{
                    throw new Error("No Question Avalibale");
                }
            } catch (error) {
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error}));
            }
        })();
    }, [dispatch]);
    
    return [getData, setGetData];
};

//movenextaction dispatch function

export const moveNextAction = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error)
    }
}

//moveprevaction dispatch function

export const movePrevAction = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error)
    }
}