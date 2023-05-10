import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import { IoIosConstruct, IoTrash } from "../utils/icon";
import { authSelect, logoutThunkAction } from "../redux/features/authSlice";
import LoginPage from "../pages/LoginPage";
import Modal from "./Modal";
import RegisterPage from "../pages/RegisterPage";
import Loading from "./Loading";
import {
  clearListHistoryConstructions,
  constructionSelect,
  getListConstructionProjectThunkAction,
} from "../redux/features/constructionSlice";
import { NavLink } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("-_id");
  const [q, setQ] = useState("");

  const { userInfo, isLoggedIn } = useSelector(authSelect);
  const { listHistoryConstructions } = useSelector(constructionSelect);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          getListConstructionProjectThunkAction({
            userId: userInfo?._id,
            orderBy,
            sortBy,
            q,
          })
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchAPI();
  }, [userInfo?._id, orderBy, sortBy, q, dispatch]);

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logoutThunkAction({ refreshToken: userInfo?.refreshToken }))
      .unwrap()
      .then(() => {
        toast.success("Logout successfully !");
        dispatch(clearListHistoryConstructions());
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-bg-sidebar h-full w-full">
      {isLoading && <Loading />}
      {isLoggedIn && (
        <div className="h-[20%] w-full flex flex-col gap-1 items-center justify-center px-4">
          {userInfo && (
            <>
              <img
                src={userInfo?.avatar}
                alt=""
                className="w-24 h-24 object-cover rounded-full border-2 border-white"
              />
              <p className="text-sm font-bold text-white">
                {userInfo?.displayName || userInfo?.email}
              </p>
            </>
          )}
        </div>
      )}
      {isLoggedIn && (
        <div className="h-[4%] bg-[#40414f] flex items-center justify-center text-sm text-white border-b border-t border-gray-500">
          Construction history
        </div>
      )}
      {isLoggedIn ? (
        <div className="h-[68%]  overflow-y-auto">
          <div className="px-4 py-2">
            <Button
              outline
              className="w-full rounded-full hover:bg-slate-800 transition-all"
              leftIcon={<AiOutlinePlusCircle size={18} />}
              to="/calculate"
            >
              New Project
            </Button>
          </div>
          <div className="flex flex-col h-full">
            {listHistoryConstructions.length > 0 &&
              listHistoryConstructions.map((construction) => (
                <NavLink
                  key={construction?._id}
                  className={({ isActive }) =>
                    `flex items-center justify-between text-gray-400 px-6 py-4 font-semibold cursor-pointer hover:text-gray-300 hover:bg-[#5d5e71] hover:opacity-60 transition-all group ${
                      isActive
                        ? "bg-[#40414f] text-white border-l-[6px] border-yellow-500"
                        : ""
                    }`
                  }
                  to={`/construction/${construction?._id}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="bg-slate-600 p-1 rounded-md">
                      <IoIosConstruct size={18} color="white" />
                    </span>
                    <p className="text-sm">
                      {construction?.sizeType} -{" "}
                      {construction?.projectName?.slice(0, 14)}{" "}
                      {construction?.projectName.length > 14 && "..."}
                    </p>
                  </div>
                  <span className="hidden group-hover:block">
                    <IoTrash />
                  </span>
                </NavLink>
              ))}
          </div>
        </div>
      ) : (
        <div className="h-[92%] overflow-y-auto">
          <div className="bg-[#40414f] py-4 px-8 text-sm text-white">
            Please login for a better experience
          </div>
        </div>
      )}
      {isLoggedIn ? (
        <div className="h-[8%] flex justify-center items-center gap-2 w-full border-t border-gray-600 px-4">
          <Button
            primary
            className="w-full bg-emerald-900 hover:bg-emerald-800"
            onClick={handleLogout}
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
            <RegisterPage />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
