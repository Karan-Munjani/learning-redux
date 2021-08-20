import * as actions from "./actionTypes";

// export function bugAdded(description) {
//     return {
//         type: actions.BUG_ADDED,
//         payload: {
//           desc: description,
//         },
//       };

// }

export function bugRemoved(id) {
  return {
    type: actions.BUG_REMOVED,
    payload: {
      id: id,
    },
  };
}

export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  payload: {
    desc: description,
  },
});

export const bugResolving = (id, status) => ({
  type: actions.BUG_RESOLVING,
  payload: {
    id: id,
    status: status,
  },
});


export const bugResolved = (id) => ({
    type:actions.BUG_RESOLVED,
    payload:{
        id:id,
    }
}) 