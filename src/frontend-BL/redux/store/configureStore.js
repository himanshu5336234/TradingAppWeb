import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import DensityWebSocketMiddleware from "../middleware/DensityWebSocketMiddleWare/DensityWebSocketMiddleware";
import { deploymentEnv, envVariable } from "../../../frontend-api-service/Base";
const middleware = [thunk, DensityWebSocketMiddleware];
const buildType = envVariable();

const middlewareEnhancer = buildType === deploymentEnv.PROD ? applyMiddleware(...middleware) : composeWithDevTools(applyMiddleware(...middleware));

export default createStore(rootReducer, middlewareEnhancer);
