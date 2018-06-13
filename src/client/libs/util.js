let util = {};
function formatDate(datetime, fm) {
  let data = '';
  if (datetime) data = new Date(datetime)
  else data = new Date()
  var year = data.getFullYear(),
  month = (data.getMonth() + 1 < 10) ? '0' + (data.getMonth() + 1):data.getMonth() + 1,
  day = data.getDate() < 10 ? '0' +  data.getDate() : data.getDate(),
  hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours(),
  min = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes(),
  sec = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds();
  if (fm === 'YYYY-MM-DD hh:mm:ss') return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
  else if (fm === 'YYYY-MM-DD') return year + '-' + month + '-' + day;
  else if (fm === 'YYYY') return year;
  else if (fm === 'MM') return month;
  else return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}
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
  if (date) return formatDate(date - 0, f)
  else return formatDate('', f)
}
util.mapScript = str => pattern.test(str)

export default util;
