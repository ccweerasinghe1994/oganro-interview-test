const IsStringExists = (...values) => {
  const valuesCheck = [];
  for (const value of values) {
    if (
      value.length === 0 ||
      value.length === 2 ||
      value === "undefined" ||
      value === "null"
    ) {
      valuesCheck.push(false);
    } else {
      valuesCheck.push(true);
    }
  }
  return valuesCheck.includes(false) ? false : true;
};

module.exports = {
  IsStringExists,
};
