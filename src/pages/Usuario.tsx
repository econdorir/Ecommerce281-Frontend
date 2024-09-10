import { useState } from 'react';
import styles from '../styles/usuario.module.css';

export default function Perfil() {
  const [formData, setFormData] = useState({
    firstName: 'Peter',
    lastName: 'Griffin',
    username: 'thepetergriffin',
    email: 'hello@designdrops.io',
    dobDay: '09',
    dobMonth: '22',
    dobYear: '1975',
    department: 'La Paz',
    province: '',
    city: '',
    userId: 'e7fbe9883d6746458a6facfd70fdf09d',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Aquí puedes hacer una llamada API para guardar los cambios
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <h2>Información de Perfil</h2>
      </div>
      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nombres</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Peter"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Apellidos</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Griffin"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="thepetergriffin"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="hello@designdrops.io"
          />
          <a href="#" className={styles.verifyEmail}>
            Verificar Correo
          </a>
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de Nacimiento</label>
          <div className={styles.dobContainer}>
            <input
              type="text"
              name="dobDay"
              value={formData.dobDay}
              onChange={handleChange}
              placeholder="09"
            />
            <input
              type="text"
              name="dobMonth"
              value={formData.dobMonth}
              onChange={handleChange}
              placeholder="22"
            />
            <input
              type="text"
              name="dobYear"
              value={formData.dobYear}
              onChange={handleChange}
              placeholder="1975"
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Departamento</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="La Paz"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Provincia</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Ciudad</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>ID de Usuario</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            readOnly
          />
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.saveBtn}>
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
