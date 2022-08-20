import { useState, useEffect } from 'react'
import "./App.css";


const ProductCard = (props) => {
  const { value } = props;
  return (
    <div className="product-card">
      <img src={value.product_image_url} alt="product img" className="product_image" />
      <h3>{value.product_name}</h3>
      <span>Price : {value.product_price}</span>
    </div>
  );
}


function App() {

  const [data, setdata] = useState();
  const [productdata, setproductdata] = useState();


  const getproductdata = async () => {

    try {
      const res = await fetch("https://searchtaskone.herokuapp.com/api/v1/products", {
        method: "GET",
        headers: { "Content-Type": "application/json " },
      })
      const datas = await res.json();
      setproductdata(datas.product_list);
    } catch (error) {
      console.log(error);
    }
  }



  const PostInput = async (e) => {
    e.preventDefault()
    console.log(data)
    const res = await fetch("https://searchtaskone.herokuapp.com/api/v1/searchedproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({data})
    }) 
    const datas = await res.json();
    setproductdata(datas.product);
  }


  useEffect(() => {
    getproductdata();
  }, []);

  
  return (
    <div className="body-container">
      <div className="heading-container">
        <h1 className="title">Find the Product</h1>
        <form className="input-container" method='POST' onSubmit={PostInput}>
          <input type="search" placeholder="Search for a Product" id="searchInput" value={data} name='input' onChange={(e) => setdata(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="resultProducts">
        {
          productdata && productdata.map((product, index) => {
            return <ProductCard key={index} value={product} />
          })
        }
      </div>
    </div>
  );
}

export default App;
