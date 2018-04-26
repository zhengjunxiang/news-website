let util = {};
util.title = function(title) {
  window.document.title = title || 'Antpool\'s News'
};
util.checkLan = () => {
  const naLan = navigator.language, loLan = localStorage.getItem('language');
  if (loLan) return loLan;
  else if (naLan) return (naLan === 'zh-CN' || naLan === 'zh') ? 'CN' : 'EN';
  else return 'CN';
}

export default util;
