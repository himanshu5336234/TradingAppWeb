const FORMAT_REGEX = /{-?[0-9]+}/g;

export const concatStrings = (...args) => {
  return (delimiter = "") => args.join(delimiter);
};

export function Format(str, ...args) {
  return str.replace(FORMAT_REGEX, (item) => {
    const intVal = parseInt(item.substring(1, item.length - 1), 10);
    let replace;
    if (intVal >= 0) {
      replace = args[intVal];
    } else if (intVal === -1) {
      replace = "{";
    } else if (intVal === -2) {
      replace = "}";
    } else {
      replace = "";
    }
    return replace;
  });
}

export function FormatWithOptionalArguments(str, params) {
  const keysForDel = [];
  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      keysForDel.push(key);
    }
  });
  keysForDel.forEach((key) => {
    delete params[key];
  });
  return `${str}?${new URLSearchParams(params).toString()}`;
}

export function formatTimefromTimestamp(approvedAt) {
  if (!approvedAt) return "--";
  const timestamp = new Date(approvedAt);
  return [timestamp.getDate(), timestamp.getMonth() + 1, timestamp.getFullYear()].join("/");
}
