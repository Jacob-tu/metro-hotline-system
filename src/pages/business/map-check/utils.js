// 站点id和地址名称的映射，由于有些站点无法通过地铁站点名得到位置信息，所以取站点附近的一个地址名来得到位置信息
export const stat_loc_map = {
  1: { prev: '双港站', curr: '双港站' },
  2: { prev: '孔目湖站', curr: '南昌市青山湖区军民友谊路南昌恒大时代之光北侧约60米' },
  3: { prev: '长江路站', curr: '南昌市红谷滩区丰和北大道989号' },
  4: { prev: '珠江路站', curr: '珠江路站' },
  5: { prev: '庐山南大道站', curr: '江西省南昌市青山湖区庐山南大道426号' },
  6: { prev: '绿茵路站', curr: '南昌市红谷滩区凤凰中大道红谷世纪花园' },
  7: { prev: '卫东站', curr: '江西省南昌市红谷滩区沙井街道会展路999号' },
  8: { prev: '地铁大厦站', curr: '地铁大厦站' },
  9: { prev: '秋水广场站', curr: '秋水广场站' },
  10: { prev: '滕王阁站', curr: '南昌市西湖区中山西路36号' },
  11: { prev: '万寿宫站', curr: '江西省南昌市东湖区中山路309号' },
  12: { prev: '八一馆站', curr: '江西省南昌市东湖区中山路177号百盛购物中心' },
  13: { prev: '八一广场站', curr: '南昌市东湖区中山路8号' },
  14: { prev: '丁公路北站', curr: '江西省南昌市西湖区丁公路192号' },
  15: { prev: '师大南路站', curr: '江西省南昌市东湖区北京西路451号' },
  16: { prev: '彭家桥站', curr: '南昌市青山湖区北京东路北京宾馆(北京东路店)' },
  17: { prev: '谢家村站', curr: '南昌市青山湖区湖坊镇上海北路2号' },
  18: { prev: '青山湖大道站', curr: '北京东路555号' },
  19: { prev: '高新大道站', curr: '江西省南昌市青山湖区高新大道1598号' },
  20: { prev: '艾溪湖西站', curr: '江西省南昌市青山湖区北京东路2089号' },
  21: { prev: '艾溪湖东站', curr: '江西南昌市青山湖区紫阳大道2888号巅峰财富广场23楼' },
  22: { prev: '太子殿站', curr: '南昌市南昌县创新大道紫晶国际广场' },
  23: { prev: '奥体中心站', curr: '江西省南昌市南昌县高新技术开发区紫阳大道109号' },
  24: { prev: '瑶湖西站', curr: '南昌市南昌县瑶湖西大道与紫阳大道交叉路口往东南约150米' },
};

// 信息分类id和查询参数的映射，直接查询分类名不准确，需要生成映射
export const type_search_map = {
  80000101: '医院', // 周边医院
  80000102: '派出所', // 派出所
  80000103: '学校', // 学校
  80000104: '公交站', // 周边公交站
  80000105: '地铁站口', // 出入口方向
  80000106: '商场', // 周边商场
  80000107: '儿童乐园', // 儿童乐园
  80000108: '公共厕所', // 公共厕所
};
