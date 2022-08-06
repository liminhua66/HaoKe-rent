import request from "@/utils/request";
export const getHouseCondition = (cityId) =>
  request({
    url: `/houses/condition?id=${cityId}`,
  });
export const getHouseById = (id) =>
  request({
    url: `/houses/${id}`,
  });
export const isFavorite = (id) =>
  request({
    url: `/user/favorites/${id}`,
  });
export const addFavorite = (id) =>
  request({
    url: `/user/favorites/${id}`,
    method: "POST",
  });
export const delFavorite = (id) =>
  request({
    url: `/user/favorites/${id}`,
    method: "DELETE",
  });
