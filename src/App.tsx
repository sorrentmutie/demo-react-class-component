import React from 'react';
import './App.css';
import { Esempio } from './Esempio';
import Title from './Title';

function App() {
  return (
    <div className="App">
      <Title title='Mio Titolo' subtitle='Mio Sottotitolo'>
          <Esempio></Esempio>
      </Title>
    </div>
  );
}

export default App;
