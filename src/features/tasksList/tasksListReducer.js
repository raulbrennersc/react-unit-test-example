const INITIAL_STATE = [];

const tasksListReducer = function (state = INITIAL_STATE, action) {
  const { type, payload } = action;
  if (type === "LOAD") return [...payload];
  if (type === "ADD") return [...state, { title: payload, checked: false }];
  if (type === "REMOVE") {
    const index = state.findIndex((t) => t.title === payload.title);
    state.splice(index, 1);
    return [...state];
  }
  if (type === "CHECK") {
    const task = state.find((t) => t.title === payload.title);
    task.checked = !task.checked;
    return [...state];
  }
  if (type === "CLEAR") {
    return [];
  }

  return state;
};

export default tasksListReducer;
