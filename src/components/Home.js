import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    return (
        <div className="container">
          <h1 className="text-center text-primary">Bienvenue dans la page d'accueil</h1>
          <button className="btn btn-success">Clique-moi</button>
        </div>
      );
}

export default Home;
