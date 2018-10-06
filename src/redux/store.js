/*
redux最核心的管理模块
*/
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
//import {composeWithDevTools} from'redux-devtools-extension'

import reducers from './reducers';

//向外暴露store对象
export default createStore(combineReducers(reducers),compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))