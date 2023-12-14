import React from 'react';

const UserMenu = ({ userData }) => {
return (
    <div>
      {/* Contenido del menú de usuario */}
        <p>Bienvenido, {userData.nombre} {userData.apellido}</p>
        <p>RUT: {userData.rut}</p>
        <p>Correo: {userData.correo}</p>
      {/* Otros elementos del menú */}
    </div>
    );
};

export default UserMenu;