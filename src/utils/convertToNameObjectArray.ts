const convertToNameObjectArray = (inputArray: string[]) => {
  const resultArray = [];

  for (const strValue of inputArray) {
    const obj = { name: strValue };
    resultArray.push(obj);
  }

  return resultArray;
};

export default convertToNameObjectArray;
