import { createStore, applyMiddleware, compose } from 'redux'
//import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk'
//import { createLogger } from 'redux-logger'
import reducers from './reducers'
import reduxReset from 'redux-reset';

//const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    //rootReducer,
    reducers,
    preloadedState,
    compose(
       applyMiddleware(thunk),
       reduxReset()
    )
  )
}