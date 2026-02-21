export const replaceItemAtIndex = <T>(arr: T[], index: number, newValue: T) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const removeItemAtIndex = <T>(arr: T[], index: number) => {
  if (index < 0 || index >= arr.length) {
    new Error("Index out of bounds");
  }
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
