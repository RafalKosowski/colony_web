// ColonyForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getColony, saveColony } from '../../../services/api'; // Import functions from api.js

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
    <div>
      <h2>{colonyId ? 'Edit Colony' : 'Add Colony'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div>
          <label htmlFor="nazwa">Colony Name:</label>
          <input type="text" id="nazwa" name="nazwa" value={formData.nazwa} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="trasaWedrowna">Trasa Wędrowna:</label>
          <input type="text" id="trasaWedrowna" name="trasaWedrowna" value={formData.trasaWedrowna} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="opis">Opis:</label>
          <textarea id="opis" name="opis" value={formData.opis} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="cena">Cena:</label>
          <input type="number" id="cena" name="cena" value={formData.cena} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="kraj">Kraj:</label>
          <input type="text" id="kraj" name="kraj" value={formData.kraj} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="terminOd">Termin Od:</label>
          <input type="datetime-local" id="terminOd" name="terminOd" value={formData.terminOd} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="terminDo">Termin Do:</label>
          <input type="datetime-local" id="terminDo" name="terminDo" value={formData.terminDo} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="firmaId">Firma ID:</label>
          <input type="number" id="firmaId" name="firmaId" value={formData.firmaId} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="adresId">Adres ID:</label>
          <input type="number" id="adresId" name="adresId" value={formData.adresId} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="formaId">Forma ID:</label>
          <input type="number" id="formaId" name="formaId" value={formData.formaId} onChange={handleChange} required />
        </div>
        
     
    
        {/* Repeat for other fields */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : colonyId ? 'Save Changes' : 'Add Colony'}
        </button>
      </form>
    </div>
  );
};

export default ColonyForm;
