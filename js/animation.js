let sortedColor = "#38b000";
let baseColor = "#1d3557";
let compareColor = "#e63946";
export default class Animation {
  constructor(animationInfo, arrayDiv, speed, sortedArray) {
    this.animationInfo = animationInfo;
    this.arrayDiv = arrayDiv;
    this.speed = speed;
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
    const n = this.animationInfo.length;
    // red array contains the positions of bars which were made red in the previous operation
    let red = [];
    for (const info of this.animationInfo) {
      const [op, x, y] = info;

      for (const r of red) {
        $(this.arrayDiv[r]).css({ backgroundColor: baseColor });
        if ($(this.arrayDiv[r]).height() == this.sortedArray[r]) {
          $(this.arrayDiv[r]).css({ backgroundColor: sortedColor });
        }
      }

      if (op === 0) {
        $(this.arrayDiv[x]).css({ backgroundColor: compareColor });
        $(this.arrayDiv[y]).css({ backgroundColor: compareColor });
        red = [x, y];
      } else if (op === 1) {
        let h = $(this.arrayDiv[x]).height();
        $(this.arrayDiv[x]).height($(this.arrayDiv[y]).height());
        $(this.arrayDiv[y]).height(h);
        $(this.arrayDiv[x]).css({ backgroundColor: compareColor });
        $(this.arrayDiv[y]).css({ backgroundColor: compareColor });
        red = [x, y];
      } else if (op === 2) {
        $(this.arrayDiv[x]).height(y);
        $(this.arrayDiv[x]).css({ backgroundColor: compareColor });
        red = [x];
      }

      await this.#sleep(this.speed);
    }
  }
}
