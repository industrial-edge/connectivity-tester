import React from 'react';
import './Style.module.scss';
import Layout from "./layout/Layout";
import {BrowserRouter} from "react-router-dom";

const basename = document.querySelector('base')?.getAttribute('href') ?? '/'  

function App() {
   return (
      <div>
         <BrowserRouter basename={basename}>
            <Layout/>
         </BrowserRouter>
      </div>
   );
}


export default App;
