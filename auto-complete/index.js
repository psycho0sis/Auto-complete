const createAutoComplete = (data) => (prefix) => {
  let result = [];
  let start = 0;
  let end = data.length - 1;
  let middle;

  if (!prefix) return [];

  const toLowerCase = (item) => item.toLowerCase();

  if (data.length <= 3) {
    result = data.filter((word) =>
      toLowerCase(word).startsWith(toLowerCase(prefix))
    );
    return result;
  }

  let prefixToLowerCase = toLowerCase(prefix);

  while (start <= end) {
    middle = Math.floor(start + (end - start) / 2);

    if (toLowerCase(data[middle]).startsWith(toLowerCase(prefixToLowerCase))) {
      result.push(data[middle]);

      if (toLowerCase(data[middle + 1]).startsWith(prefixToLowerCase)) {
        for (let i = 1; i < data.length; i++) {
          if (!toLowerCase(data[middle + i]).startsWith(prefixToLowerCase)) {
            break;
          } else {
            result.push(data[middle + i]);
          }
        }
      }

      if (toLowerCase(data[middle - 1]).startsWith(prefixToLowerCase)) {
        for (let i = 1; i < data.length; i++) {
          if (!toLowerCase(data[middle - i]).startsWith(prefixToLowerCase)) {
            break;
          } else {
            result.push(data[middle - i]);
          }
        }
      }

      return result.sort();
    } else if (prefix > data[middle]) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  return result;
};

module.exports.createAutoComplete = createAutoComplete;
