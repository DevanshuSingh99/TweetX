import { combineReducers,createStore,compose,applyMiddleware } from "redux";
import { postReducer, userReducer } from "./Reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  userResponse: userReducer,
  postResponse: postReducer,

});

const store = createStore(
    // persistedReducer,
    reducer,
    composeEnhancers(applyMiddleware())
  );
export default store;