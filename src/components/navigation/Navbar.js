import { Spinner } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import AccountVerificationAlertWarning from "../alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "../alerts/AccountVerificationSuccessAlert";
import AdminNavbar from "./AdminNavbar";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavbar";

const Navbar = () => {
  //get user from store
  const state = useSelector((state) => state.users);
  // console.log(state);
  // const { userAuth, profile } = state;
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;
  // console.log(isAdmin);

  //account verification
  const account = useSelector((state) => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;
  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : // <AdminNavbar />
      userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        // <PrivateNavbar />
        <PublicNavbar />
      )}
      {/* Display alert */}
      {userAuth && !userAuth.isVerified && <AccountVerificationAlertWarning />}
      {/* display success msg */}
      {loading && (
        <h2 className="text-center">
          <Spinner thickness="4px" speed="0.65s" color="red" size="md" />
        </h2>
      )}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;
