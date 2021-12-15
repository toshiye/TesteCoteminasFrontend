import 'bootstrap/dist/css/bootstrap.css'
import "primeflex/primeflex.css"
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppMenu from "../components/AppMenu"
import { ProductSearchProvider } from '../context/productSearchContext'
import Index from '../pages/App'
import Products from "../pages/Products"

const AppRouter = () => {
    return (
        <BrowserRouter>
        <ProductSearchProvider>
            <AppMenu/>
            <div>
                <Routes>
                    <Route path="/" exact component={Index} />
                    <Route path="/products" exact component={Products} />
                </Routes>                
            </div>
        </ProductSearchProvider>
      </BrowserRouter>
    );
}

export default AppRouter