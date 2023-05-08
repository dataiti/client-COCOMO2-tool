import React from "react";
import Button from "./Button";
import Label from "./Label";
import { AiOutlinePlusCircle } from "../utils/icon";
import { useSelector } from "react-redux";
import { authSelect } from "../redux/features/authSlice";
import LoginPage from "../pages/LoginPage";
import Modal from "./Modal";

const Sidebar = () => {
  const { userInfo, isLoggedIn } = useSelector(authSelect);

  return (
    <div className="bg-bg-sidebar h-full w-full">
      <div className="h-[26%] w-full flex flex-col gap-1 items-center justify-center px-4 border-b border-gray-600">
        <img
          src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/343065709_250019614222101_3506369346010899611_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a4a2d7&_nc_ohc=Ht-21aNUxqUAX_kQV1D&_nc_ht=scontent.fdad3-6.fna&oh=00_AfACZeIutU00RkEHxCQHvfzYT5ghgSl9tm5hyboIO56pkg&oe=645E4793"
          alt=""
          className="w-24 h-24 object-cover rounded-full border-2 border-white"
        />
        <p className="text-lg font-bold text-white">Nguyen Dat</p>
        <Button
          outline
          className="w-full"
          leftIcon={<AiOutlinePlusCircle size={24} />}
        >
          New Project
        </Button>
      </div>
      <div className="h-[66%] p-4">
        <Label label="History Calculate" className="text-white" />
        <div></div>
      </div>
      {isLoggedIn ? (
        <div className="h-[8%] flex justify-center items-center gap-2 w-full border-t border-gray-600 px-4">
          <Button
            primary
            className="w-full bg-emerald-900 hover:bg-emerald-800"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="h-[8%] flex justify-center items-center gap-2 w-full border-t border-gray-600 px-4">
          <Modal
            nameBtn="Login"
            primary={true}
            classNameBtn="w-full bg-emerald-900 hover:bg-emerald-800"
          >
            <LoginPage />
          </Modal>
          <Modal
            nameBtn="Register"
            primary={true}
            classNameBtn="w-full bg-emerald-900 hover:bg-emerald-800"
          >
            <LoginPage />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
