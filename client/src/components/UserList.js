import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { block_User, load_users } from "../actions/authUserActions";
import { Footer } from "./Footer";
import { NavbarPage } from "./NavbarPage";
import "../userlist.css";

export const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_users());
  }, [dispatch]);
  const users = useSelector((state) => state.authReducer.users);
  const blockUser = (id) => {
    const confirm = window.confirm("Do you really want to block this user?");
    if (confirm === true) {
      dispatch(block_User(id, { block: true }));
    }
  };
  const deblockUser = (id) => {
    const confirm = window.confirm("Do you really want to deblock this user?");
    if (confirm === true) {
      dispatch(block_User(id, { block: false }));
    }
  };

  return (
    <div>
      <NavbarPage />
      <div className="  userlist">
        {users
          .filter((user) => user.role !== "Admin")
          .map((user) => {
            return (
              <div className="user">
                <div>
                  <div>
                    <b>Name : </b>
                    {user.name}
                  </div>
                  <div>
                    <b>Email : </b>
                    {user.email}
                  </div>
                  <div>
                    <b>Category : </b>
                    {user.category}
                  </div>
                </div>
                <div>
                  <button
                    style={{ width: "100px" }}
                    className="btn btn-sm btn-danger "
                    disabled={user.block === true}
                    onClick={() => blockUser(user._id)}
                  >
                    Block
                  </button>
                  <br />
                  <button
                    style={{ width: "100px" }}
                    className="btn btn-sm btn-success"
                    disabled={user.block === false}
                    onClick={() => deblockUser(user._id)}
                  >
                    Deblock
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};
