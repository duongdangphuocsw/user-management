const INITIAL_STATE = {
  users: [],
  currentUsers: [],
  currentPage: 0,
  usersFilter: undefined,
  typeSort: ""
};
const handleAddUser =(state, action) => {
  const newListUsers = state.users
  if(state.typeSort === "newestToOldest") {
    newListUsers.unshift(action.payload)
    return [...newListUsers]
  }
  return [...state.users, action.payload]
}
const handleDeleteUser = (state, action) => {
  const newListUsers = state.users.filter((user) => user.id !== action.payload);
  return newListUsers;
};
const handleUpdateUser = (state, action) => {
  let newListUsers = state.users;
  newListUsers = newListUsers.map((user) =>
    user.id === action.payload.id ? action.payload : user
  );
  return newListUsers;
};
const handleUpdateActive = (state, action) => {
      const newListUsers = [...state.users];
    const indexUserChane = newListUsers.findIndex(
      (user) => user.id === action.payload.id
    );
    newListUsers[indexUserChane].is_active =
      !newListUsers[indexUserChane].is_active;
    // setUsers(newListUsers);
    return newListUsers;
}
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_DATA":
      return { ...state, users: action.payload };
    case "DELETE":
      return { ...state, users: [...handleDeleteUser(state, action)] };
    case "ADD":
      
      return {
        ...state,
        users: [...handleAddUser(state, action)]
        // users: [...state.users, action.payload],
      };
      case "FILTER_USERS":
        return {
          ...state,
          usersFilter: action.payload
        }
        case "NOT_FILTER_USERS":
          return {
            ...state,
            usersFilter: undefined
          }
    case "GET_CURRENT_USER":
      return {
        ...state,
        currentUsers: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: [...handleUpdateUser(state, action)]
      }
      case "UPDATE_ACTIVE":
          return{
            ...state,
            users: [...handleUpdateActive(state, action)]
          }
    case "CHANGE_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
      case "SORT_NEWEST_TO_OLDEST": 
      
      return {
        ...state,
        users: [...action.payload.usersSort] , typeSort: action.payload.typeSort
      }
      case "SORT_OLDEST_TO_NEWEST": 
      return {
        ...state,
        users: [...action.payload.usersSort] , typeSort: action.payload.typeSort
      }
    default:
      return state;
  }
};

export default userReducer;
