import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './Pages/RegistrationForm';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
      </Routes>
    </>
  );
}
