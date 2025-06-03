import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import Breadcrumbs from '../components/Breadcrumbs';
import { useAuth } from '../hooks/AuthContext';

const PrivateLayout = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();

  if (!user) {
    return null; // обработка в RequireAuth
  }

  // Генерация хлебных крошек на основе текущего пути
  const pathnames = location.pathname.split('/').filter((x) => x);
  const breadcrumbs = [
    { label: "Главная", path: "/" },
    { label: 'Breadcrumbs', path: '/dashboard' },
    ...pathnames.slice(1).map((name, i) => ({
      label: decodeURIComponent(name[0].toUpperCase() + name.slice(1)),
      path: '/' + pathnames.slice(0, i + 2).join('/'),
    })),
  ];

  return (
    <div className="private-layout">
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="private-layout__content">
       
          <Breadcrumbs items={breadcrumbs} onAvatarClick={() => setMenuOpen(true)} />
     

        <main className="private-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;