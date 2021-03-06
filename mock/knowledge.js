const getKnowledgeList = (req, res) => {
  res.json({
    code: 20000,
    message: 'success',
    data: {
      items: [
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '因该处施工环境较为复杂，导致此处施工进度较慢，因此无法确定具体完工时间，请乘客耐心等待，但我司会提高施工速度，尽快完成施工，方便市民的出行。',
          ADD_PERSON: '中铁穗城',
          STAT_NAME: '未审核',
          ID: '632def32-f24a-4dc0-b301-d0e136453421',
          UPDATE_PERSON: '',
          ADD_TIME: '2017-02-07 15:06:05',
          STAT_ID: 70000001,
          TITLE: '滕王阁站B出口施工时间过长',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '南昌轨道交通各车站内售票机的数量是根据客流量来确定的。且我们倡导市民尽量使用洪城一卡通，方便快捷，且还能享受单程票9折优惠。',
          ADD_PERSON: '王芳',
          STAT_NAME: '未审核',
          ID: 'e0d1f587-f9cf-4560-af6f-598525dd72b5',
          UPDATE_PERSON: '',
          ADD_TIME: '2016-01-06 10:26:37',
          STAT_ID: 70000001,
          TITLE: '关于售票机数量少',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '您提到的地铁站只有一个无障碍电梯的情况，实际地铁车站一般是设置两部无障碍电梯，一部是设在地面出入口旁由地面下到地下一层的电梯，并设置无障碍坡道；另一部是设在站内由地下一层下到地下二层（或三层）乘车的电梯。这样的做法可以保证腿脚不便人士通过无障碍电梯进入站内乘车。并且地铁每个出入口外均设置了盲道接入地铁内，可以保证视力有障碍人士进入车站乘车。针对每个地铁车站地面上仅有一部无障碍电梯的问题，此做法是参照全国各地统一做法进行设计的，如上海、深圳、广州、杭州、武汉、长沙等各地，考虑了地铁成本控制因素。满足残疾人士乘车要求，符合《地铁设计规范》及《无障碍设计规范》要求。',
          ADD_PERSON: '王芳',
          STAT_NAME: '未审核',
          ID: '45ff16ad-ba5e-47b5-ae30-5993f7a905b6',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-30 19:20:02',
          STAT_ID: 70000001,
          TITLE: '无障碍电梯的情况',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '感谢您提出的意见！地铁车站导向系统是有进行统一、规范、科学设计的系统，导向牌的设置均结合各车站的空间布局特点形式，及各车站乘客进站与出站的流线方向分析，才进行合理规范的设置，导向牌的数量均已满足功能需求，不易设置过少或过多。',
          ADD_PERSON: '王芳',
          STAT_NAME: '未审核',
          ID: '00d6429d-9421-4ba8-94b9-88c38fa57905',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-30 19:11:11',
          STAT_ID: 70000001,
          TITLE: '地铁指示牌过少或不醒目',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '南昌地铁 1 号线对地铁车站、列车车厢内实行全域综合布控，对包括所有出入口和死角在内的管理范围进行全天实时视频监控，在每个车站设置了警务值班室。同时通过管理和技术手段防范有毒气体、易燃易爆物等危害公共安全的物品进入地铁。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '39e884b3-72df-430f-b814-6ba62b420019',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:58:47',
          STAT_ID: 70000001,
          TITLE: '南昌地铁 1 号线针对公共安全等问题采取了哪些措',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '蜂鸣器发出响声和蜂鸣器闪灯，就是警示乘客停止上下进出列车，乘客听到蜂鸣器响声或看到蜂鸣器闪灯警示，应及时止步，在站台候车区域内耐心等待后续列车，切勿硬性冲闯，以防发生伤亡事故。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '94d3d073-cb8b-458e-9889-c5a2f12f7f22',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:57:48',
          STAT_ID: 70000001,
          TITLE: ' 为什么列车蜂鸣器响后不能进出车厢',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '等候列车请务必站在安全线后，列车进站不要探头张望。严禁擅自打开警示绳或越过安全黄线，进入轨道交通道床、隧道，这种行为不仅会严重威胁乘客的生命安全，也将对运营安全和公共安全造成严重影响。更不能故意将身体或其他物品挡住车门，警方将依法追究违者责任。乘客的物品如落入轨道，请不要自行捞捡，应寻求车站工作人员的帮助。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '3700f13b-9b40-49f3-ad61-92442e8eff79',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:57:21',
          STAT_ID: 70000001,
          TITLE: ' 乘坐地铁候车时应注意哪些问题',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT: '应立刻按下紧急自动扶梯制停按钮。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '575cc63b-e9eb-4139-a83a-623f7b4d8aad',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:56:46',
          STAT_ID: 70000001,
          TITLE: '自动扶梯遇到紧急情况',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '不可以用身体、手袋、背包或其它个人物品阻碍列车门及屏蔽门的关闭，此类行为会严重危及到乘客的安全。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '8ab0fff1-d8f8-42fc-b110-c219ade31cf3',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:56:03',
          STAT_ID: 70000001,
          TITLE: '地铁关门注意事项',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT: '朝鲜平壤地铁，它深达 100 米左右。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '00649c90-dbdf-4660-99d1-1052aa0e7c1e',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:54:30',
          STAT_ID: 70000001,
          TITLE: ' 世界上挖得最深的地铁',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '伦敦。1843 年查尔斯 . 皮尔逊向议会提出建议，1863年1月10日，短途的“大都市铁道”建成开通,全长 6.5 公里，当年客流量达到了 950 万人。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '555b254d-8b9e-425b-a5c4-856a36c1f2ba',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:53:56',
          STAT_ID: 70000001,
          TITLE: '世界上的第一条地铁',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT: '运量大，速度快，安全性高，准时准点。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: 'ec7053c5-95fa-432b-a113-380fb2dccec3',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:53:27',
          STAT_ID: 70000001,
          TITLE: '地铁的优点是什么',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT: '能够缓解城市交通拥堵，减少城市空气污染，缩短居民出行时间，拓展城市空间。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: 'b7d618e9-870c-4d27-bb50-b91c8c1bca72',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:51:15',
          STAT_ID: 70000001,
          TITLE: ' 建设地铁的意义',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT: '出入口、风亭、冷却塔。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '33b674b0-eeff-47f7-a179-b5abbdba29a9',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:50:10',
          STAT_ID: 70000001,
          TITLE: '地下车站的主要地面设施',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT: '南昌地铁“千里赣江第一隧”区间隧道全长 1889 米，其中跨赣江底部分长约1200 米。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: 'b8db835a-9b39-4414-8015-8681ef17a64f',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:49:47',
          STAT_ID: 70000001,
          TITLE: ' 南昌地铁“千里赣江第一隧”',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '南昌地铁单程票为筹码型车票，是将集成电路及天线嵌装在直径为 30 毫米、厚度为 2.0 毫米的非金属材料圆盘内，俗称 Token。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '8a7358fe-ede3-4810-a455-77a7af4ee3a0',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:48:47',
          STAT_ID: 70000001,
          TITLE: '南昌地铁的单程票',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT: '满载客量为 1460 人（1 平方米站 6 人），超载客 量为 2062 人（1 平方米站 9 人）',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: '3f80b3dc-8639-4199-ae32-b4480603c582',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:48:05',
          STAT_ID: 70000001,
          TITLE: ' 南昌地铁 1 号线列车满载超载',
        },
        {
          KNOWLEDGE_TYPE: '常见问题',
          CONTENT:
            '地铁一号线全长：约 28.8 公里，共设 24 个站点。 地铁一号线列车信息：列车长120米，采用B型车，车厢宽2.8米，高3.8米，全车6 个编组（车厢），车体有效长度19米，共240个座位。',
          ADD_PERSON: '鹭鹭行',
          STAT_NAME: '未审核',
          ID: 'd9e63957-fa32-4b5c-9b5e-ad41849e315d',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-22 20:47:35',
          STAT_ID: 70000001,
          TITLE: '南昌地铁 1 号线基础信息',
        },
        {
          KNOWLEDGE_TYPE: '业务知识',
          CONTENT: `为了规范轨道交通规划的报批程序，国务院在2003年发布的81号文件《关于加强城市快速轨道交通建设管理的通知》中对轨道交通前期准备和审批工作做出了较为明确的规定，现阶段，申报发展地铁的城市应达到下述基本条件。
1. 地方财政一般预算收入在100亿元以上；
2. 国内生产总值达到1000亿元以上；
3. 城市人口在300万人以上；
4. 规划线路的客流规模达到单向高峰小时3万人以上。`,
          ADD_PERSON: 'admina',
          STAT_NAME: '未审核',
          ID: 'be33e2f8-c7f9-4ca4-a3dd-11ccf9f27707',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-19 23:03:27',
          STAT_ID: 70000001,
          TITLE: '轨道交通建设审批条件',
        },
        {
          KNOWLEDGE_TYPE: '业务知识',
          CONTENT: `1. 昌北国际机场-蛟桥-丰和北大道-世贸路-中山西路-中山路-八一广场-北京路-紫阳大道-麻丘
2. 九龙湖新城-高速客运西站-站前北大道-红谷南大道-丰和大道-阳明路-八一大道-洛阳路-南昌火车站-顺外路-上海路-广州路-罗家镇
3. 莲塘-迎宾大道-京山北路-十字街-前进路-象山路-叠山路-青山路-二七北路-火炬大街-京东大道
4. 望城-龙兴大街-抚生南路-桃苑大街-绳金塔西街-天佑路-丁公路-省府东三路-青山路-火炬五路-尤氨公路
5. 下罗地区-长堎大道-学府大道-红谷南大道-学府大道-朝阳大道-江铃西路-高新大道
2021年前将建成轨道交通1、2、3、4号线，2021年日均客流量将达到150万人次，占全市公共交通出行方式的25%。`,
          ADD_PERSON: 'admina',
          STAT_NAME: '未审核',
          ID: 'd502064d-fc25-4164-892d-4d8594a8d2d2',
          UPDATE_PERSON: '',
          ADD_TIME: '2015-12-19 23:02:25',
          STAT_ID: 70000001,
          TITLE: '各线路基本情况',
        },
      ],
      total: 67,
      startIndex: 0,
      pageSize: 20,
      pageCount: 4,
    },
  });
};

export default {
  'GET /api/knowledge': getKnowledgeList,
};
