module.exports = (arr) => {
  let str = '(';
  for (let i = 0; i < arr.length; i++) {
    str += '?';
    if (i !== arr.length - 1) {
      str += ', ';
    } else {
      str += ')';
    }
  }
  return str;
};