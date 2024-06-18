export function mergeArraysWithoutCommonElements(arr1, arr2) {
  // Create new arrays to store non-common elements
  const Arr1 = arr1.filter((item) => !arr2.includes(item));
  const Arr2 = arr2.filter((item) => !arr1.includes(item));

  // Merge the two new arrays
  const mergedArray = [...Arr1, ...Arr2];

  return mergedArray;
}
