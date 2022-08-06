import request from "@/utils/request.js";
export const login = (data) =>
  request({
    url: "/user/login",
    data,
    method: "POST",
  });

export const getHouse = (params) =>
  request({
    url: "/houses",
    params,
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
