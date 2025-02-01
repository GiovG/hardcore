import React from 'react';
import ActividadesTable from '../components/Actividades';

const ActividadesPage = () => {
    return (
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Inscripción</h1>
          <ActividadesTable mode="inscripcion" />
        </div>
      );
};

export default ActividadesPage;