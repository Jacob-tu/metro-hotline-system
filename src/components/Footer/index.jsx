import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const defaultMessage = '南昌轨道交通集团 江西.南昌, All Rights Reserved';
  const currentYear = new Date().getFullYear();
  return <DefaultFooter copyright={`${currentYear} ${defaultMessage}`} />;
};

export default Footer;
