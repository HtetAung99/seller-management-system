import { Role } from 'services/enums';
import { MdDashboard } from 'react-icons/md';
import { FaHouseUser } from 'react-icons/fa';
import { AiFillContainer } from 'react-icons/ai';
import { CgFileDocument } from 'react-icons/cg';

const adminMenu = {
  role: Role.admin,
  defaultRoute: '/',
  menus: [
    {
      icon: <MdDashboard />,
      title: 'Dashboard',
      route: '/',
    },
    {
      icon: <AiFillContainer />,
      title: 'Products',
      route: '/products',
    },
    {
      icon: <FaHouseUser />,
      title: 'Vendors',
      route: '/vendors',
    },
    {
      icon: <CgFileDocument />,
      title: 'Reports',
      route: '/reports',
    },
  ],
};

export default adminMenu;
