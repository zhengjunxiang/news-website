import miment from 'miment'
let util = {};
const pattern = new RegExp("[`~#^&*()=|{}\\[\\]<>/……&*（）——|{}]");
util.title = function(title) {
  if (title) window.document.title = title
};
util.checkLan = () => {
  const naLan = navigator.language, loLan = localStorage.getItem('language');
  if (loLan) return loLan;
  else if (naLan) return (naLan === 'zh-CN' || naLan === 'zh') ? 'zh' : 'en';
  else return 'zh';
}
util.fDate = (date, f) => {
  if (date) return miment(date - 0).format(f || 'YYYY-MM-DD hh:mm:ss')
  else return miment().format(f || 'YYYY-MM-DD hh:mm:ss')
}
util.mapScript = str => pattern.test(str)

export default util;
