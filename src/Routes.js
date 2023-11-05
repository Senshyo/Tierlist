import React from "react";
import {Routes,Route} from "react-router-dom"

import Tierlist from "./Pages/Tierlist"

export default function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<Tierlist></Tierlist>}></Route>
        </Routes>
    )
}