import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout';
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
