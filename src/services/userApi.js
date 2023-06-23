import axios from "axios";
const render = () => {
  return axios.get("https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users");
};
const deleteUser = (id) => {
  return axios.delete(
    `https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users/${id}`
  );
};
const addUser = (newUser) => {
  return axios({
    method: "post",
    url: "https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users",
    data: {
      name: newUser.name,
      email: newUser.email,
      group_role: newUser.group,
      is_active: newUser.status,
    },
  });
};
const updateUser = (dataUpdate, id) => {
  return axios({
    method: "put",
    url: `https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users/${id}`,
    data: {
      name: dataUpdate.name,
      email: dataUpdate.email,
      group_role: dataUpdate.group,
      is_active: dataUpdate.status,
    },
  });
};
const updateActiveUser = (user) => {
  return axios({
    method: "put",
    url: `https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users/${user.id}`,
    data: {
      is_active: !user.is_active,
    },
  });
};
export { render, deleteUser, addUser, updateUser, updateActiveUser };
