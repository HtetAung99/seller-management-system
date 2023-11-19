import { Role } from 'services/enums';
import { MdDashboard, MdPeopleAlt } from 'react-icons/md';
import { AiFillContainer } from 'react-icons/ai';
import { FaHouseUser } from 'react-icons/fa';
import { CgFileDocument } from 'react-icons/cg';

const managementMenu = {
  role: Role.management,
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
      icon: <MdPeopleAlt />,
      title: 'Users',
      route: '/users',
    },
    {
      icon: <CgFileDocument />,
      title: 'Reports',
      route: '/reports',
    },
  ],
};

export default managementMenu;
