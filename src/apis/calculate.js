import axiosClient from "../configs/axiosConfig";

const calculateFunctionPointsAPI = async ({ userId, data }) => {
  try {
    const res = await axiosClient.post(
      `/calculate/function-points/${userId}`,
      data
    );
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const calculateSourceLinesOfCodeAPI = async ({ userId, data }) => {
  try {
    const res = await axiosClient.post(
      `/calculate/source-line-of-code/${userId}`,
      data
    );
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export { calculateFunctionPointsAPI, calculateSourceLinesOfCodeAPI };
