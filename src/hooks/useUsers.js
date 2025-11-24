import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  setSelectedUser,
  clearSelectedUser,
} from "../store/User/slice";

const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const selectedUser = useSelector((state) => state.users.selectedUser);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const selectUser = (user) => dispatch(setSelectedUser(user));
  const clearUser = () => dispatch(clearSelectedUser());

  const add = (userData) => dispatch(addUser(userData));
  const update = (id, userData) => dispatch(updateUser({ id, userData }));
  const remove = (id) => dispatch(deleteUser(id));

  return {
    users,
    loading,
    error,
    selectedUser,
    selectUser,
    clearUser,
    add,
    update,
    remove,
  };
};

export default useUsers;
