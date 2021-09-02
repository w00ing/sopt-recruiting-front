const extractValues = (arr, key) => {
  if (!Array.isArray(arr)) return [arr[key] || null];
  return [...new Set(arr.map((o) => o[key]).filter(Boolean))];
};

const extractValuesIncludingNullsAndDuplicates = (arr, key) => {
  if (!Array.isArray(arr)) return [arr[key] || null];
  const values = [];
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i][key]) {
      values.push(null);
    } else {
      values.push(arr[i][key]);
    }
  }
  return values;
};
function isNestedArray(arr) {
  if (!Array.isArray(arr)) {
    return false;
  }
  if (Array.isArray(arr[0])) {
    return true;
  }
  return false;
}

function flatten(arr) {
  if (isNestedArray(arr)) return arr.flat();

  let newArr = [];
  arr.map((o) => {
    newArr.push(...Object.values(o));
  });
  return newArr;
}

module.exports = { extractValues, extractValuesIncludingNullsAndDuplicates, isNestedArray, flatten };
