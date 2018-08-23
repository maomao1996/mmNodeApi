/**
  * 热搜类模型
  * @param {Type} data 来源数据
  * @param {Type} type music type
  */

module.exports = function formatSearchHot (data, type) {
    let newData;
    switch (type) {
    case 'QQ':
        newData = data.map(item => item.k);
        break;
    case '163':
        newData = data.map(item => item.first);
        break;
    default:
        newData = data;
        break;
    }
    return newData;
};
