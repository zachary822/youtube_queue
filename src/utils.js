import _ from "lodash";

export function processVideoURL(url) {
  let u = new URL(url);
  return _(_.trimStart(u.search, '?')).split('&').reduce((o, l) => {
    let [k, v] = _.split(l, '=');
    o[k] = v;
    return o;
  }, {})['v'];
}
