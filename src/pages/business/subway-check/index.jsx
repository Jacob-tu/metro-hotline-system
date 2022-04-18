import { useEffect } from 'react';
import './index.less';

export default () => {
  useEffect(() => {
    /**
     * 从所有城市列表中获取北京信息
     * 结果格式
     * {
     *     keyword: 'nanchang',
     *     name: '南昌',
     *     citycode: '163'
     * }
     */
    /* globals BMapSub */
    const subwayCityName = '南昌';
    const list = BMapSub.SubwayCitiesList;
    let subwaycity = null;
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === subwayCityName) {
        subwaycity = list[i];
        // console.log('subwaycity:', subwaycity);
        break;
      }
    }
    // 获取南昌地铁数据-初始化地铁图
    const subway = new BMapSub.Subway('container', subwaycity.citycode);
    // subway.setZoom(0.4);
    const zoomControl = new BMapSub.ZoomControl({
      anchor: BMAPSUB_ANCHOR_BOTTOM_RIGHT,
      offset: new BMapSub.Size(10, 100),
    });
    subway.addControl(zoomControl);
    subway.addEventListener('tap', function (e) {
      const detail = new BMapSub.DetailInfo(subway);
      detail.search(e.station.name);
    });
  }, []);

  return (
    <div className="subway">
      <div id="container"></div>
      <div className="info">提示：点击站点可查看站点详情</div>
    </div>
  );
};
