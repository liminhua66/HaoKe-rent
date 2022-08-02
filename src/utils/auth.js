import storage from "./storage";
const TOKEN = "HAOKE_TOKEN";

export const getToken = () => storage.get(TOKEN);
export const setToken = (value) => storage.set(TOKEN, value);
export const removeToken = () => storage.remove(TOKEN);
