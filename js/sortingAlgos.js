// animationInfo array should contain operations to be performed on the bars to animate it
// [0, x, y] --> compare bars at poitions x and y
// [1, x, y] --> swap bars at position x and y
// [2, x, y] --> change the height of bar at position x to y

export function selectionSort(inputArr, animationInfo) {
  let n = inputArr.length;
  let comparisions = 0;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (inputArr[j] < inputArr[min]) {
        min = j;
      }
      animationInfo.push([0, i, j]);
      comparisions++;
    }
    let tmp = inputArr[i];
    inputArr[i] = inputArr[min];
    inputArr[min] = tmp;
    animationInfo.push([1, i, min]);
  }
  return inputArr;
}

export function bubbleSort(inputArr, animationInfo) {
  let len = inputArr.length;
  let comparisions = 0;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      comparisions++;
      if (inputArr[j] > inputArr[j + 1]) {
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
        animationInfo.push([1, j, j + 1]);
      }
    }
  }
  return inputArr;
}

export function insertionSort(inputArr, animationInfo) {
  let n = inputArr.length;
  for (let i = 1; i < n; i++) {
    let current = inputArr[i];
    let j = i - 1;
    while (j > -1 && current < inputArr[j]) {
      inputArr[j + 1] = inputArr[j];
      animationInfo.push([2, j + 1, inputArr[j]]);
      j--;
    }
    inputArr[j + 1] = current;
    animationInfo.push([2, j + 1, current]);
  }
  return inputArr;
}

function merge(arr, l, m, r, animationInfo) {
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = new Array(n1);
  var R = new Array(n2);

  for (var i = 0; i < n1; i++) L[i] = arr[l + i];
  for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  var i = 0;
  var j = 0;
  var k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      animationInfo.push([2, k, L[i]]);
      i++;
    } else {
      arr[k] = R[j];
      animationInfo.push([2, k, R[j]]);
      j++;
    }
    k++;
  }
  while (i < n1) {
    arr[k] = L[i];
    animationInfo.push([2, k, L[i]]);
    i++;
    k++;
  }
  while (j < n2) {
    arr[k] = R[j];
    animationInfo.push([2, k, R[j]]);
    j++;
    k++;
  }
}
export function mergeSort(arr, l, r, animationInfo) {
  if (l >= r) {
    return;
  }
  var m = l + parseInt((r - l) / 2);

  mergeSort(arr, l, m, animationInfo);
  mergeSort(arr, m + 1, r, animationInfo);

  merge(arr, l, m, r, animationInfo);
  let t = Array.from(arr);
}

export function quickSort(array, l, r, animationInfo) {
  let s;
  if (array.length > 1) {
    s = partition(array, l, r, animationInfo);
    if (l < s - 1) {
      quickSort(array, l, s - 1, animationInfo);
    }
    if (s < r) {
      quickSort(array, s, r, animationInfo);
    }
  }
}
function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
function partition(array, l, r, animationInfo) {
  let p = array[Math.floor((r + l) / 2)];
  let i = l;
  let j = r;

  while (i <= j) {
    while (array[i] < p) {
      animationInfo.push([0, l, i]);
      i++;
    }
    while (array[j] > p) {
      animationInfo.push([0, l, j]);
      j--;
    }
    if (i <= j) {
      swap(array, i, j);
      animationInfo.push([1, i, j]);
      i++;
      j--;
    }
  }
  return i;
}

export function heapSort(arr, animationInfo) {
  let n = arr.length;
  for (let i = Math.floor(n / 2); i >= 0; i--) {
    heapify(arr, n, i, animationInfo);
  }
  for (let i = n - 1; i > 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    animationInfo.push([1, 0, i]);

    heapify(arr, i, 0, animationInfo);
  }
}
function heapify(arr, n, i, animationInfo) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) {
    largest = l;
    animationInfo.push([0, l, largest]);
  }
  if (r < n && arr[r] > arr[largest]) {
    largest = r;
    animationInfo.push([0, r, largest]);
  }

  if (largest != i) {
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    animationInfo.push([1, i, largest]);

    heapify(arr, n, largest, animationInfo);
  }
}
