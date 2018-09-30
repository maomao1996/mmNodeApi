/**
  * 热搜类模型
  * @param {Type} data 来源数据
  * @param {Type} type music type
  */

module.exports = function formatSearchHot (data, type) {
    switch (type) {
    case 'QQ':
        return data.map(item => item.k);
    case '163':
        return data.map(item => item.first);
    default:
        return data;
    }
};
