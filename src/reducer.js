import * as actions from "./actionTypes";
import store from "./store";

let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,

        //NOTE:Payload of the action should contain minimum details to update our store
        // i.e., We passing only desc from payload & desc and resolved is added from reducer
        {
          id: ++lastId,
          desc: action.payload.desc,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVING:
      return state.map((bug) => {
        if (bug.id === action.payload.id)
          return { ...bug, status: action.payload.status };
        else return bug;
      });

    case actions.BUG_RESOLVED:
      return state.map((bug) => {
        let modifiedBug = Object.assign({}, bug);
        if (modifiedBug.id === action.payload.id) {
          modifiedBug.status = Object.assign({}, bug.status);
          delete modifiedBug.status;
          return { ...modifiedBug, resolved: true };
        } else return bug;
      });

    // case actions.BUG_RESOLVED:
    //   return state.map((bug) => {
    //     if (bug.id === action.payload.id) {
    //       delete bug.status;
    //       return { ...bug, resolved: true };
    //     } else return bug;
    //   });

    default:
      return store;
  }

  //   suppose what if we pass action that is not exsit in store then we should have to return the state as it is,
  // cause we don't want to break the application when unknown action is dispatched
}
