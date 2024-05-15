import React from 'react'
import LoginWithEmail from './components/LoginWithEmail/LoginWithEmail';
import { Provider } from 'react-redux';
import { makeStore } from './store/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes';

function App() {
  return (
    <Provider store={makeStore()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginWithEmail />}>
          </Route>
          <Route path="notes" element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
