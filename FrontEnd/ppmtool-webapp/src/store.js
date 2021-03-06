import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
//import { composeWithDevTools } from 'redux-devtools-extension';

const initalState = {};
const middleware = [thunk];

let store;
/* 
if (window.navigator.userAgent.includes("Chrome")||window.navigator.userAgent.includes("Mozilla")) {
  store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  );
} else {
  store = createStore(
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware))
  );
} */
store = createStore(
  rootReducer,
  initalState,
  compose(applyMiddleware(...middleware))
);
export default store;