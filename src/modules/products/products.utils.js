exports.generateCriteriaObject = (obj) => {
  let data = {};
  // delete all properties that have values of 'any'
  for (let prop in obj) {
    // if the property is empty string or 'any' or skills array is empty delete them
    if (obj[prop] === "any" || obj[prop] === "" || obj[prop].length === 0) {
      delete obj[prop];
    }
    if (prop === "title" && obj[prop] !== "" && obj[prop] !== undefined) {
      data["$text"] = { $search: `${obj[prop]}` };
    } else if (prop === "categories" && obj[prop]?.length > 0) {
      if (obj[prop].length === 1) {
        data["categories"] = { $in: `${obj[prop].concat([])}` };
      } else {
        data["categories"] = { $in: obj[prop] };
      }
    } else if (obj[prop] !== undefined) {
      data[prop] = obj[prop];
    }
  }
  return data;
};
