// 封装本地储存
class Storage {
  get(key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  set(key, value) {
    if (typeof value === "string") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

export default new Storage();
