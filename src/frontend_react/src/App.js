import React from 'react';
import './Style.module.scss';
import BaseLayout from "./components/BaseLayout";
import {BrowserRouter} from "react-router-dom";

const basename = document.querySelector('base')?.getAttribute('href') ?? '/'  

function App() {
   return (
      <div>
         <BrowserRouter basename={basename}>
            <BaseLayout/>
         </BrowserRouter>
      </div>
   );
}


export default App;
