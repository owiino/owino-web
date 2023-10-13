const fillStringWithHyphen = (inputString: string): string => {
  const trimmedString = inputString.trim();

  const words = trimmedString.split(/\s+/);
  const resultString = words.join("-");

  return resultString;
};

export default fillStringWithHyphen;
