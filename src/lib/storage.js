/**
 *
 * Configure Local Storage
 *
 * @param {*} name
 * @param {*} value
 * @param {*} action
 */
const configureStorage = (name, value, action) => {
  if (action === "set") {
    window.localStorage.setItem(name, value);
  } else {
    window.localStorage.removeItem(name);
  }
};

/**
 *
 * Set Local Storage
 *
 * @param {*} storages
 */
export const setStorages = (storages) => {
  storages.map((item) => configureStorage(item.name, item.value, "set"));
};

/**
 *
 * Clear Local Storage
 *
 * @param {*} storages
 */
export const clearStorages = (storages) => {
  storages.map((item) => configureStorage(item, "", "remove"));
};

/**
 *
 * Get Local Storage
 *
 * @param {*} storage
 * @returns
 */
export const getStorage = (storage) => {
  const store = window.localStorage.getItem(storage);

  if (typeof storage !== "undefined") {
    return store;
  }

  return null;
};
