import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/crud.css';

const URI = 'http://localhost:3030/integrador_proyecto/';

const Crud = () => {
  const [blogs, setBlog] = useState([]);
  useEffect(() => {
    getBlogs();
  }, []);

  // Procedimiento para mostrar todos los blogs
  const getBlogs = async () => {
    const res = await axios.get(URI);
    setBlog(res.data);
  };

  return (
    <div className='container'>
      <div className='header'>
        <h2>Objetos Perdidos</h2>
        <img src="../images/ucen_trans.png" alt="Logo de la universidad" />
      </div>
      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Dueño</th>
                <th>Carnet</th>
                <th>Objeto</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Guardia</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td> {blog.dueno} </td>
                  <td> {blog.carnet} </td>
                  <td> {blog.objeto} </td>
                  <td> {blog.descripcion} </td>
                  <td> {blog.imagen} </td>
                  <td> {blog.guardia} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Crud;