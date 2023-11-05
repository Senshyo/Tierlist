import React from "react";
import { BrowserRouter } from "react-router-dom";
import Rotas from "./Routes.js"

export default function App(){
    return(
        <BrowserRouter>
            <Rotas></Rotas>
        </BrowserRouter>
    )
}