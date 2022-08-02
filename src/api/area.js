import request from "@/utils/request";
export const getCity = (level) =>
  request({
    url: `/area/city?level=${level}`,
  });
export const getHotCity = () =>
  request({
    url: "area/hot",
  });
