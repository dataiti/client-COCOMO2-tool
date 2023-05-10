import axiosClient from "../configs/axiosConfig";

const getListConstructionProjectAPI = async ({
  userId,
  orderBy,
  sortBy,
  q,
  limit,
  page,
}) => {
  const res = await axiosClient.get(
    `/construction/list-construction/${userId}?q=${q}&sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&limit=${limit}`
  );
  if (res) {
    return res;
  }
};

const getDetailConstructionAPI = async ({ userId, constructionId }) => {
  const res = await axiosClient.get(
    `/construction/detail-construction/${userId}/${constructionId}`
  );
  if (res) {
    return res;
  }
};

export { getListConstructionProjectAPI, getDetailConstructionAPI };
