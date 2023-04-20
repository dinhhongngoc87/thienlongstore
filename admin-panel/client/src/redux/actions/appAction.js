const getUsers = () => {
  return {
    type: "GET_USERS",
  };
};
const addUser = (newUser) => {
  return {
    type: "ADD_USERS",
    payload: newUser,
  };
};

const exportDefault = {
  getUsers,
  addUser,
};

export default exportDefault;
