import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useSearchProduct from "../../hooks/useSearchProduct";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [resultProducts, setResultProducts] = useState([]);
  const [search, setSearch] = useState(false);
  const [productTitle, setProductTitle] = useState('Listagem de Produtos');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const {searchProduct} = useSearchProduct();

  const getSearch = useCallback((searchProduct) => {
    setResultProducts([])
    if(searchProduct === '')
    {
      setProductTitle('Listagem de Produtos')
      setSearch(false)
    } else {
      setProductTitle(searchProduct)
      let filter = products.filter(p => p.description.toLowerCase().includes(searchProduct.toLowerCase()))
      setSearch(true)
      setResultProducts(filter)
    }
 },[products])
  
  useEffect(() => {
    getList();
    getSearch(searchProduct)
  },[getSearch, searchProduct])

  const getList = async () => {
    try {
      let response = await api.get('products');
      setProducts(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  }

  const price = (rowData) => {
    let currency_price = rowData.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    let currency_promotion_price = rowData.promotion_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return (
        <React.Fragment>
            <p className="text-right">De:  {currency_price} por {currency_promotion_price}</p>
        </React.Fragment>
    )
  }

  const description = (rowData) => {
    return (
        <React.Fragment>
            <p><strong>{rowData.description}</strong> </p>
            <span>{rowData.category}</span>
        </React.Fragment>
    )
  }

  const images = (rowData) => {
    return (
        <React.Fragment>
          {
            rowData.product_photos.map((photo, index) => 
               <img key={index} src={photo.url} alt="Loja" 
                style={{ width: '80px', height: '80px', display: 'inline-block', marginRight: '3px' }}/>
            )}
        </React.Fragment>
    )
  }

  return (
    <>
      <div className="container pt-3 pb-3">
        <div className="row" >
          <h4>{productTitle}</h4>
        </div>
        <div className="row">
          <p>
            {
              search ? `${resultProducts.length} Produtos Encontrados.` : `Total de Produtos: ${products.length}`
            }
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div>  
              <DataTable value={search > 0 ? resultProducts : products} paginator resizableColumns columnResizeMode="expand" showGridlines
                 first={first} rows={rows} onPage={onCustomPage}  
                 emptyMessage={search ? "Nenhum produto encontrado para essa pesquisa." : "Nenhum produto cadastrado." }>
                  <Column body={images}></Column>
                  <Column header="Descrição" body={description} ></Column>
                  
                  <Column header="Preço" body={price}></Column>
              </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;