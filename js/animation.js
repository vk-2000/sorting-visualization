export default class Animation {
  constructor(animationInfo, arrayDiv, speed) {
    this.animationInfo = animationInfo;
    this.arrayDiv = arrayDiv;
    this.speed = speed;
  }
  setSortedArray(sortedArray) {
    this.sortedArray = sortedArray;
  }
  setArrayCopy(arrayCopy) {
    this.arrayCopy = arrayCopy;
  }
  increaseSpeed(by) {
    this.speed -= by;
  }
  decreaseSpeed(by) {
    this.speed += by;
  }

  #sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // animationInfo array contains operations to be performed on the bars to animate it
  // [0, x, y] --> compare bars at poitions x and y
  // [1, x, y] --> swap bars at position x and y
  // [2, x, y] --> change the height of bar at position x to y
  async animate() {
    let n = this.animationInfo.length;
    console.log(this.animationInfo);
    // red array contains the positions of bars which were made red in the previous operation
    let red = [];
    for (let i = 0; i < n; i++) {
      let op = this.animationInfo[i][0];
      let x = this.animationInfo[i][1];
      let y = this.animationInfo[i][2];

      for (const r of red) {
        $(this.arrayDiv[r]).css({ backgroundColor: "black" });
        if ($(this.arrayDiv[r]).height() == this.sortedArray[r]) {
          $(this.arrayDiv[r]).css({ backgroundColor: "green" });
        }
      }

      if (op === 0) {
        $(this.arrayDiv[x]).css({ backgroundColor: "red" });
        $(this.arrayDiv[y]).css({ backgroundColor: "red" });
        red = [];
        red.push(x);
        red.push(y);
      } else if (op === 1) {
        let h = $(this.arrayDiv[x]).height();
        $(this.arrayDiv[x]).height($(this.arrayDiv[y]).height());
        $(this.arrayDiv[y]).height(h);
        $(this.arrayDiv[x]).css({ backgroundColor: "red" });
        $(this.arrayDiv[y]).css({ backgroundColor: "red" });
        red = [];
        red.push(x);
        red.push(y);
      } else if (op === 2) {
        $(this.arrayDiv[x]).height(y);
        $(this.arrayDiv[x]).css({ backgroundColor: "red" });
        red = [];
        red.push(x);
      }

      await this.#sleep(this.speed);
    }
  }
}
