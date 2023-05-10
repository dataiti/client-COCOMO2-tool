import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  constructionSelect,
  getDetailConstructionThunkAction,
} from "../redux/features/constructionSlice";
import { useParams } from "react-router-dom";
import { authSelect } from "../redux/features/authSlice";

const DetailConstruction = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { construction } = useSelector(constructionSelect);
  const { userInfo } = useSelector(authSelect);

  useEffect(() => {
    const fetchGetConstructionAPI = async () => {
      await dispatch(
        getDetailConstructionThunkAction({
          userId: userInfo?._id,
          constructionId: id,
        })
      );
    };
    fetchGetConstructionAPI();
  }, [userInfo?._id, id, dispatch]);

  return <div>DetailConstruction {JSON.stringify(construction)}</div>;
};

export default DetailConstruction;
