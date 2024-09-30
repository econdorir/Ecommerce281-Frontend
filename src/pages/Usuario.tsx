import { useState } from 'react';

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
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full md:w-1/2 bg-teal-300 flex justify-center items-center relative p-6">
        <div className="w-48 h-48 bg-orange-400 rounded-full flex justify-center items-center overflow-hidden">
          <img
            src="/path/to/image.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6">Información de Perfil</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            key !== 'userId' ? (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                <input
                  type={key.includes('dob') ? 'text' : key === 'email' ? 'email' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
                  placeholder={value}
                />
                {key === 'email' && <a href="#" className="text-teal-600 hover:underline mt-1">Verificar Correo</a>}
              </div>
            ) : (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID de Usuario</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                />
              </div>
            )
          ))}
          <div>
            <button type="submit" className="bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 transition duration-200">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
