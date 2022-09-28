import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import AddNotes from './Components/AddNotes';
import Navbar from './Components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Addform from './Components/Addform';
import Editform from './Components/Editform';
import Viewnotes from './Components/Viewnotes';

const App = () => {


   return (
      <>
         <Navbar />

         <Switch>
            <Route exact path="/">
               <AddNotes />
            </Route>

            <Route exact path="/addform">
               <Addform />
            </Route>

            <Route exact path="/editform/:id">
               <Editform />
            </Route>
            <Route exact path="/viewnotes/:id">
               <Viewnotes />
            </Route>
         </Switch>



      </>
   )
}

export default App