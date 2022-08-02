import { getSwiper, getRentGroups } from "@/api/home";

export const getSwiperApi = getSwiper;
export const getRentGroupsApi = getRentGroups;

import { login, getHouse, getUser, getFavorite, getRent } from "@/api/user";
export const Userlogin = login;
export const getHouseApi = getHouse;
export const getUserApi = getUser;
export const getFavoriteApi = getFavorite;
export const getRentApi = getRent;

import { getCity, getHotCity } from "@/api/area";
export const getCityApi = getCity;
export const getHotCityApi = getHotCity;
