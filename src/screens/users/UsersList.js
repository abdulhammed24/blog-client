import { Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux-toolkit/slices/userSlice";
// import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  //dispatch
  const dispatch = useDispatch();
  //data from store
  const users = useSelector((state) => state?.users);
  const { usersList, appErr, serverErr, loading, block, unblock } = users;
  //fetch all users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, block, unblock]);

  return (
    <>
      <section className="py-8 bg-gray-900 min-h-screen">
        {/* {<UsersListHeader />} */}
        {loading ? (
          <div className="min-h-[80vh] flex justify-center items-center">
            <Spinner thickness="4px" speed="0.65s" color="red" size="lg" />
          </div>
        ) : appErr || serverErr ? (
          <h3 className="text-yellow-600 text-center text-lg">
            {serverErr} {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map((user, index) => (
            <div key={index}>
              <UsersListItem user={user} />
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
