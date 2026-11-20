import React from 'react';
import Text from '../atoms/Text';
import Input from '../atoms/Input';
import '../../styles/admin.css';

function AdminLoginForm({ credenciales, setCredenciales, onSubmit, errorLogin }) {
  return (
    <div className="admin-login-card">
      <Text variant="h2" className="text-center mb-4 admin-login-title">
        ACCESO ADMINISTRATIVO
      </Text>

      {errorLogin && (
        <div className="admin-error-box">
          {errorLogin}
        </div>
      )}

      <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
        <div>
          <Text variant="label" className="admin-label">Usuario Admin</Text>
          <Input
            type="text"
            placeholder="Ingresa 'admin'"
            value={credenciales.usuario}
            onChange={(e) => setCredenciales({ ...credenciales, usuario: e.target.value })}
            required
          />
        </div>

        <div>
          <Text variant="label" className="admin-label">Clave de Seguridad</Text>
          <Input
            type="password"
            placeholder="Ingresa 'admin123'"
            value={credenciales.password}
            onChange={(e) => setCredenciales({ ...credenciales, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn-sesion-neon py-3 mt-2 admin-submit-btn">
          INGRESAR AL PANEL
        </button>
      </form>
    </div>
  );
}

export default AdminLoginForm;