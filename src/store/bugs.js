/* -------------------------------------------------------------------------- */
/*                                ACTION TYPES - START                             */
/* -------------------------------------------------------------------------- */

const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";

const BUG_RESOLVING = "bugResolving";
const BUG_RESOLVED = "bugResolved";

/* -------------------------------------------------------------------------- */
/*                             ACTION TYPES - END                             */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                              ACTION CREATORS - START                       */
/* -------------------------------------------------------------------------- */

export function bugRemoved(id) {
  return {
    type: BUG_REMOVED,
    payload: {
      id: id,
    },
  };
}

export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    desc: description,
  },
});

//   NOTE: Exmaple of ActionCreator using old JS Function pattern

// export function bugAdded(description) {
//     return {
//         type: BUG_ADDED,
//         payload: {
//           desc: description,
//         },
//       };

// }

export const bugResolving = (id, status) => ({
  type: BUG_RESOLVING,
  payload: {
    id: id,
    status: status,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id: id,
  },
});

/* -------------------------------------------------------------------------- */
/*                            ACTION CREATORS - END                           */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   Reducer -START                           */
/* -------------------------------------------------------------------------- */

let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
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

    case BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case BUG_RESOLVING:
      return state.map((bug) => {
        if (bug.id === action.payload.id)
          return { ...bug, status: action.payload.status };
        else return bug;
      });

    case BUG_RESOLVED:
      return state.map((bug) => {
        let modifiedBug = Object.assign({}, bug);
        if (modifiedBug.id === action.payload.id) {
          modifiedBug.status = Object.assign({}, bug.status);
          delete modifiedBug.status;
          return { ...modifiedBug, resolved: true };
        } else return bug;
      });

    default:
      return state;
  }

  //   suppose what if we pass action that is not exsit in store then we should have to return the state as it is,
  // cause we don't want to break the application when unknown action is dispatched
}

/* -------------------------------------------------------------------------- */
/*                                Reducer - END                                */
/* -------------------------------------------------------------------------- */
