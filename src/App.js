import './App.css';
import {RouterProvider, Router,Routes,Route, BrowserRouter } from 'react-router-dom';
import Journey from './page/journey/Journey';
import Planification from './page/planification/Planification';
import Important from './page/important/Important';
import Forme from './page/forme/Forme';
import Taches from './page/taches/Taches';
import Siderbars from './components/siderbar/Siderbars';
import React, { useState,useEffect } from 'react';
import Minuteur from './page/taches/Minuteur';
import Chrono from './page/taches/Chrono';
import Chargement from './components/pagechargement/Chargement';

function App() {
  const [comptes, setcomptes] = useState(0);//compteur de la sidebar pour la page journey.jsx
  const addupdate=(valeurs)=> {
          setcomptes(valeurs)
  }
  const [importants, setimportants] = useState(0);//compteur de la sidebar pour la page important.jsx
  const importantupdate=(valeurs1)=>{
    setimportants(valeurs1)
  }
  const [selecteditems, setselecteditems] = useState([]);//compteur lorsqu on clique sur l etoile

  const addImportant = (item) => {
    if (!selecteditems.includes(item)) {
      setselecteditems([...selecteditems, item]);
    }
   
  };

  const [planif, setplanif] = useState(0);//compteur de la sidebar pour la page plan.jsx
  const addplanif=(valeurs2)=> {
          setplanif(valeurs2)
  }
  const [loading, setLoading] = useState(true);//appel de la page chargement
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 secondes de délai aprés mes pages s'affichent
  }, []);

  if (loading) {
    return <Chargement />;//return page chargement
  }

  //
  const removeImportant = (item) => {
    const updatelist=[...selecteditems];
    updatelist.splice(item,1)
    setselecteditems(updatelist);
  };
  return (
    <div className="App">  
   <BrowserRouter>
   <div className="Appside">
   <Siderbars comptes={comptes} importants={importants} planif={planif} />
   </div>
   <div className="Appmenu">
    <Routes>
    <Route exact path='/' element={ <Journey addupdate={addupdate} comptes={comptes} addImportant={addImportant} importantupdate={importantupdate} importants={importants}  setselecteditems={setselecteditems} selecteditems={selecteditems} removeImportant={removeImportant} /> }/>
    <Route path='/plan' element={ <Planification addplanif={addplanif} planif={planif} />}/>
    <Route path='/important' element={ <Important setselecteditems={setselecteditems} selecteditems={selecteditems} importantupdate={importantupdate} importants={importants} removeImportant={removeImportant}/>} />
    <Route path='/forme' element={ <Forme/>}/>
    <Route path='/timer' element={ <Taches/>}/>
    <Route path='/timer/minute' element={ <Minuteur/>}/>
    <Route path='/timer/chrono' element={ <Chrono/>}/>
    </Routes>  
    </div>   
   </BrowserRouter> 
    </div>
  )
}

export default App;
