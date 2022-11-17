/** @format */

import './App.css';
import Serial from './components/Serial';
import { Routes, Route } from 'react-router-dom'; // import { Routes, Route, useParams } from 'react-router-dom';
// import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";

function App() {
  //connectTosocket()
  //sendData()

  return (
    <Routes>
      <Route
        path='/'
        element={<p>hello</p>}
      />
      <Route
        path='/:serialId'
        element={<Serial />}
      />
      {/* <Serial data={data} /> */}
    </Routes>
  );
}
export default App;
