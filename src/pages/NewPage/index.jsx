import { useAccess, Access } from 'umi';
import TableBasic from './TableBasic';
import { getWxUserList } from '@/services/wechat/wx-user';
import { getKnowledgeList } from '@/services/knowledge';

export default () => {
  const access = useAccess(); // access 实例的成员: canAdmin, canSeePage

  if (access.canSeePage) {
    console.log('拥有该权限');
  }

  getWxUserList().then((res) => {
    console.log(res);
  });
  getKnowledgeList().then((res) => {
    console.log(res);
  });

  return (
    <div>
      <Access accessible={access.canSeePage} fallback={<div>Can not read new page.</div>}>
        New Page.
      </Access>
      <TableBasic />
    </div>
  );
};
