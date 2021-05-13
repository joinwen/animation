class CssProper {
  constructor(map) {
    this.map = map;
    this.init();
  }
  init() {
    this.prop = this.map.prop;
    this.start = this.map.start;
    this.end = this.map.end;
    this.initial = this.map.initial;
  }
  getProp() {
    return this.prefix;
  }
  getValue() {
    return this.prop;
  }
  setValue(ele, progress) {
    let value = (this.endVal - this.startVal) * progress + this.initialVal;
    ele.style[this.prop] = value + this.suffix;
  }
}
export default CssProper;
