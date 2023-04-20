const initState = {
  users: [
    { id: 1, name: "Dinh" },
    { id: 2, name: "Ngoc dinh" },
    { id: 3, name: "Ngoc" },
  ],
};
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return state;
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default appReducer;
