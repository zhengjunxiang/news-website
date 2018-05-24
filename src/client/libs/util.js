import moment from 'moment'
let util = {};
util.title = function(title) {
  if (title) window.document.title = title
};
util.checkLan = () => {
  const naLan = navigator.language, loLan = localStorage.getItem('language');
  if (loLan) return loLan;
  else if (naLan) return (naLan === 'zh-CN' || naLan === 'zh') ? 'CN' : 'EN';
  else return 'CN';
}
util.fDate = (date, f) => {
  if (date) return moment(date - 0).format(f || 'YYYY-MM-DD HH:mm:ss')
  else return moment().format(f || 'YYYY-MM-DD HH:mm:ss')
}

export default util;
