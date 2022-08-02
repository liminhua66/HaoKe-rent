import request from "@/utils/request.js";
export const login = (data) =>
  request({
    url: "/user/login",
    data,
    method: "POST",
  });

export const getHouse = () =>
  request({
    url: "/houses/?cityId=AREA|88cff55c-aaa4-e2e0",
    method: "GET",
  });

export const getUser = () =>
  request({
    url: "/user",
  });

export const getFavorite = () =>
  request({
    url: "/user/favorites",
  });

export const getRent = () =>
  request({
    url: "/user/houses",
  });
