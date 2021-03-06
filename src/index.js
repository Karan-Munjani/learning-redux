import configureStore from "./store/configureStore";
import { bugAdded, bugRemoved, bugResolved, bugResolving } from "./store/bugs";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("store changed!", store.getState());
});

store.dispatch(bugAdded("Bug occured in Network call"));
store.dispatch(bugAdded("Bug occured while Signup"));

store.dispatch(bugResolving(1, "resolving in process by devDiesel"));
store.dispatch(bugResolved(1));

unsubscribe();

store.dispatch(bugRemoved(1));
console.log(store.getState());
