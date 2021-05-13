import { merge } from "../tools/utils";
import DimensionCssProper from "./dimension";

class OperateCssProper {
  constructor(fromProper, toProper, el) {
    this.el = el;
    [fromProper, toProper] = this.mergeProperBetweenFromAndTo(fromProper, toProper);
    this.init(fromProper, toProper);
  }
  init(fromProper, toProper) {
    this.properList = [];
    Object.keys(fromProper).forEach((prop) => {
      let proper = {
        prop: prop,
        initial: window.getComputedStyle(this.el)[prop],
        start: fromProper[prop],
        end: toProper[prop],
      };
      this.properList.push(new DimensionCssProper(proper));
    });
  }

  operate(ele, progress) {
    this.properList.forEach((proper) => {
      proper.setValue(ele, progress);
    });
  }
  mergeProperBetweenFromAndTo(fromProper, toProper) {
    Object.keys(toProper).forEach((prop) => {
      if (!fromProper[prop]) {
        fromProper[prop] = window.getComputedStyle(this.el)[prop];
      }
    });
    toProper = merge(toProper, fromProper, false);
    return [fromProper, toProper];
  }
}

export default OperateCssProper;
