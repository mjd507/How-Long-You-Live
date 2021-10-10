const StorageUtils = {

  save(key: string, val: string) {
    localStorage.setItem(key, val);
  },

  get(key: string) {
    return localStorage.getItem(key);
  }

}

export default StorageUtils;
