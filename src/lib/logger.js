/**
 * Read Log from API
 *
 * @param {String} label
 * @param {*} logs
 * @returns
 */
export const Logger = (label, logs) => {
  if (process.env.NODE_ENV === "production") return;
  console.group(label);
  console.table(logs);
  console.groupEnd();
};

/**
 * Console Log
 *
 * @param {*} logs
 * @returns
 */
export const cl = (logs) => {
  if (process.env.NODE_ENV === "production") return;
  console.log(logs);
};
