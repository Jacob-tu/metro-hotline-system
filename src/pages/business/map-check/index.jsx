import { useEffect } from 'react';
import './index.less';
import { history } from 'umi';
import { message } from 'antd';
import { stat_loc_map, type_search_map } from '@/pages/business/map-check/utils';

export default () => {
  const { station_id, station_side_type } = history.location.query;
  const locName = stat_loc_map[station_id].curr,
    searchName = type_search_map[station_side_type];
  let scope; // 搜索范围
  // 如果是搜索地铁站口则缩小搜索范围
  if (station_side_type === '80000105') {
    scope = 300;
  } else {
    scope = 1000;
  }
  useEffect(() => {
    // 百度地图API功能
    const map = new BMapGL.Map('container');
    map.centerAndZoom('南昌', 15);
    map.enableScrollWheelZoom();
    //创建地址解析器实例
    const myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      locName,
      function (point) {
        if (point) {
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMapGL.Marker(point, { title: locName }));

          const circle = new BMapGL.Circle(point, scope, {
            fillColor: 'blue',
            strokeWeight: 1,
            fillOpacity: 0.3,
            strokeOpacity: 0.3,
          });
          map.addOverlay(circle);
          const local = new BMapGL.LocalSearch(map, {
            renderOptions: { map: map, autoViewport: false },
          });
          local.searchNearby(searchName, point, scope);
        } else {
          message.error('您选择的地址没有解析到结果！');
        }
      },
      '南昌市',
    );
  }, []);

  return (
    <div className="map">
      <div id="container"></div>
      <div id="result">
        {stat_loc_map[station_id].prev}周边{searchName}
      </div>
    </div>
  );
};
