export const generateRandomKey = () => {
  const timestamp = Date.now(); // Current timestamp
  const randomValue = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10),
  ).join("");
  return `${timestamp}-${randomValue}`;
};
