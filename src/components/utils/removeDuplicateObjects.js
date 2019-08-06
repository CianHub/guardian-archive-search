export const removeDuplicateObjects = originalArray =>
  Array.from(new Set(originalArray.map(item => item.id))).map(id =>
    originalArray.find(item => item.id === id)
  );
