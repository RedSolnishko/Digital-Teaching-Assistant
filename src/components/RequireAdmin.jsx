import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAdmin = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    fetch('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setRole(null);
        } else {
          setRole(data.role);
        }
        setLoading(false);
      })
      .catch(() => {
        setRole(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/not-found" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;