import OperateCssProper from "../css/operate-css-proper";

const action = {
  fromTo: (el, from, to) => {
    let operator = new OperateCssProper(from, to, el);
    return function (progress) {
      operator.operate(el, progress);
    };
  },
  to: (el, to) => {
    let operator = new OperateCssProper({}, to, el);
    return function (progress) {
      operator.operate(el, progress);
    };
  },
};
export default action;
