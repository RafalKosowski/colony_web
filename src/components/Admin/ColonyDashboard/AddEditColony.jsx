import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getColony, saveColony } from '../../../services/api'; // Import functions from api.js
import 'bootstrap/dist/css/bootstrap.min.css';

const ColonyForm = ({ token }) => {
  const { id } = useParams();
  const colonyId = Number(id) || null; // Handle null case
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: 0,
    firmaId: 0,
    adresId: 0,
    formaId: 0,
    terminOd: '',
    terminDo: '',
    nazwa: '',
    trasaWedrowna: '',
    opis: '',
    cena: 0,
    kraj: '',
    firma: { id: 0, adresId: 0, nazwa: '', adres: { id: 0, ulicaId: 0, nrDomu: 0, nrMiesz: 0, ulica: { id: 0, ulica: '', miastoId: 0, miasto: { id: 0, miastoNazwa: '', kod: '' } } } } ,
    adres: { id: 0, ulicaId: 0, nrDomu: 0, nrMiesz: 0, ulica: { id: 0, ulica: '', miastoId: 0, miasto: { id: 0, miastoNazwa: '', kod: '' } } },
    forma: { id: 0, rodzajWypoczynku: '' },
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (colonyId) {
      const loadColonyDetails = async () => {
        try {
          const data = await getColony(colonyId, token);
          setFormData({
            ...data,
            terminOd: data.terminOd ? new Date(data.terminOd).toISOString().slice(0, 16) : '',
            terminDo: data.terminDo ? new Date(data.terminDo).toISOString().slice(0, 16) : '',
          });
        } catch (error) {
          console.error('Error loading colony data:', error);
        }
      };
      loadColonyDetails();
    }
  }, [colonyId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await saveColony(formData, token, colonyId); // Use saveColony function
      navigate('/colonies');
    } catch (error) {
      console.error('Error saving colony:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">{colonyId ? 'Edit Colony' : 'Add Colony'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields with Bootstrap styling */}
        <div className="mb-3">
          <label htmlFor="nazwa" className="form-label">Colony Name:</label>
          <input type="text" id="nazwa" name="nazwa" className="form-control" value={formData.nazwa} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="trasaWedrowna" className="form-label">Trasa Wędrowna:</label>
          <input type="text" id="trasaWedrowna" name="trasaWedrowna" className="form-control" value={formData.trasaWedrowna} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="opis" className="form-label">Opis:</label>
          <textarea id="opis" name="opis" className="form-control" value={formData.opis} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cena" className="form-label">Cena:</label>
          <input type="number" id="cena" name="cena" className="form-control" value={formData.cena} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="kraj" className="form-label">Kraj:</label>
          <input type="text" id="kraj" name="kraj" className="form-control" value={formData.kraj} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="terminOd" className="form-label">Termin Od:</label>
          <input type="datetime-local" id="terminOd" name="terminOd" className="form-control" value={formData.terminOd} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="terminDo" className="form-label">Termin Do:</label>
          <input type="datetime-local" id="terminDo" name="terminDo" className="form-control" value={formData.terminDo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="firmaId" className="form-label">Firma ID:</label>
          <input type="number" id="firmaId" name="firmaId" className="form-control" value={formData.firmaId} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="adresId" className="form-label">Adres ID:</label>
          <input type="number" id="adresId" name="adresId" className="form-control" value={formData.adresId} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="formaId" className="form-label">Forma ID:</label>
          <input type="number" id="formaId" name="formaId" className="form-control" value={formData.formaId} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : colonyId ? 'Save Changes' : 'Add Colony'}
        </button>
      </form>
    </div>
  );
};

export default ColonyForm;
