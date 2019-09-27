import { createStore , applyMiddleware , compose }  from 'redux';
import thunk  from 'redux-thunk';
import rootReducer  from './reducers';

const initialState = {};
const middleware = [thunk]

if(process.env.NODE_ENV === 'production') {
    const store = createStore(
			rootReducer,
			initialState,
	);
}else{
	const store = createStore(
			rootReducer,
			initialState,
			compose(applyMiddleware(...middleware),
		    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
			)

	);
}





export default store;
