import { combineReducers, createStore,  applyMiddleware } from "redux"
import thunk from "redux-thunk";
import movieReducer from './movie-reducer'


let reducers = combineReducers({
   movie: movieReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

export default store