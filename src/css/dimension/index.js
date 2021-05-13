import CssProper from "../css-proper";
class DimensionCssProper extends CssProper {
  constructor(map) {
    super(map);
    this.selfInit();
  }
  selfInit() {
    let startMatch = /(-?[\d,.]*)(.*)$/.exec(this.start),
      endMatch = /(-?[\d,.]*)(.*)$/.exec(this.end),
      initialMatch = /(-?[\d,.]*)(.*)$/.exec(this.initial);
    this.suffix = startMatch[2] || "px";
    this.startVal = startMatch[1];
    this.endVal = endMatch[1];
    this.initialVal = initialMatch[1] * 1;
  }
}
export default DimensionCssProper;
