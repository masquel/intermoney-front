export default function arrayToObjectByKey(array, key = 'id'){
  return array.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}