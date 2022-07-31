import * as Sorting from "./sortingAlgos.js";
import Animation from "./animation.js";

let n = 0;
let arrayContainer;
let widthDiv;
let array = [];
let arrayCopy;
let arrayDiv;
let animate;

function createRandomArray(n) {
  array = [];
  for (let i = 0; i < n; i++) {
    let containerHeight = $(arrayContainer).height();
    let heightDiv = Math.floor(Math.random() * (containerHeight - 20 + 1)) + 20;
    array.push(heightDiv);
  }
  createDivs(array);
  arrayCopy = Array.from(array);
}
function createDivs(array) {
  $(arrayContainer).children().remove();
  for (let i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    $(div).css({
      height: array[i],
      background: "black",
      width: widthDiv,
      margin: "1px",
    });
    // $(div).addClass("bar");
    // $(div).attr("value", `${$(div).height()}`);
    arrayContainer.append(div);
  }
  arrayDiv = $(arrayContainer).children();
}

$(document).ready(function () {
  let algoDrop = $(".algoDrop");
  let algoSelector = $(".algos");
  let algoNumber = -1;
  let algoList = $(".algos > div");
  let btnRandom = $(".generateRandom");
  arrayContainer = $(".container");
  algoDrop.click(function (e) {
    e.preventDefault();
    algoSelector.toggleClass("hidden");
  });

  algoList.click(function () {
    algoNumber = algoList.index(this);
    $(".algoDisplay").text($(this).text());
  });

  btnRandom.click(function () {
    n = parseInt(document.querySelector(".selectN input").value);
    if (isNaN(n)) {
      alert("Enter n");
      return;
    }
    widthDiv = 500 / n;
    createRandomArray(n);
  });

  $(".speedUp").click(function (e) {
    e.preventDefault();
    animate.increaseSpeed(50);
  });
  $(".speedDown").click(function (e) {
    e.preventDefault();
    animate.decreaseSpeed(50);
  });

  $(".sort").click(function () {
    if (algoNumber == -1) {
      alert("Select algorithm");
      return;
    }
    let comparisions = 0;
    let swaps = 0;
    let animationInfo = [];

    switch (algoNumber) {
      case 0:
        Sorting.selectionSort(array, animationInfo);
        animate = new Animation(animationInfo, arrayDiv, 100);
        animate.setSortedArray(array);
        animate.animate();

        // Animation.animateCompareAndSwap(animationInfo, arrayDiv, array);
        break;
      case 1:
        Sorting.bubbleSort(array, animationInfo);
        animate = new Animation(animationInfo, arrayDiv, 100);
        animate.setSortedArray(array);
        animate.animate();
        break;
      case 2:
        Sorting.insertionSort(array, animationInfo);
        animate = new Animation(animationInfo, arrayDiv, 100);
        animate.animate();
        break;
      case 3:
        Sorting.mergeSort(array, 0, array.length - 1, animationInfo);
        console.log(animationInfo);
        animate = new Animation(animationInfo, arrayDiv, 100);
        animate.setSortedArray(array);
        animate.animate();
        break;
      case 4:
        Sorting.quickSort(array, 0, array.length - 1, animationInfo);
        animate = new Animation(animationInfo, arrayDiv, 100);
        animate.setSortedArray(array);
        animate.animate();
        break;
      case 5:
        Sorting.heapSort(array, animationInfo);
        animate = new Animation(animationInfo, arrayDiv, 100);
        animate.setSortedArray(array);
        animate.animate();
        break;
      default:
        break;
    }
  });
});

function displayInfo(comparisions) {
  $(".info").text("No of comparisions : " + comparisions);
}
