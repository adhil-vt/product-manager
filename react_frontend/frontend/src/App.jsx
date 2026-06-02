import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:8000/products/")
      .then((res) => {
        setProducts(res.data)
      })
  }, [])

  const submitData = () => {
    if (name.trim() === "" || price === "") {
      setMessage("Name and price cannot be blank.")
      return
    }

    axios
      .post("http://localhost:8000/products/create/", {
        name,
        price,
      })
      .then((res) => {
        if (!res.data.id) {
          setMessage("Name and price cannot be blank.")
          return
        }

        setProducts((currentProducts) => [res.data, ...currentProducts])
        setName("")
        setPrice("")
        setMessage("")
      })
  }

  const showUpdateInputs = (product) => {
    setEditId(product.id)
    setEditName(product.name)
    setEditPrice(product.price)
    setMessage("")
  }

  const closeUpdateInputs = () => {
    setEditId(null)
    setEditName("")
    setEditPrice("")
  }

  const putData = (id) => {
    if (editName.trim() === "" || editPrice === "") {
      setMessage("Name and price cannot be blank.")
      return
    }

    axios
      .put(`http://localhost:8000/products/update/${id}`, {
        name: editName,
        price: editPrice,
      })
      .then((res) => {
        if (!res.data.id) {
          setMessage("Name and price cannot be blank.")
          return
        }

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === id ? res.data : product
          )
        )
        setEditId(null)
        setEditName("")
        setEditPrice("")
        setMessage("")
      })
  }

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:8000/products/delete/${id}`)
      .then(() => {
        setProducts((currentProducts) =>
          currentProducts.filter((product) => product.id !== id)
        )
      })
  }

  return (
    <div className="app">
      <div className="page-header">
        <h1>Product Manager</h1>
        <p>Add, update, and remove products.</p>
      </div>

      <div className="form-panel">
        <div className="form">
          <label>
            Name
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Price
            <div className="price-input">
              <span className="currency-prefix">$</span>
              <input
                className="price-field"
                type="number"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </label>

          <button onClick={submitData}>Add Product</button>
        </div>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="section-title">Product List ({products.length})</div>

      {products.length === 0 && (
        <p className="empty-message">No products added yet.</p>
      )}

      {products.map((product) => (
        <div className="product" key={product.id}>
          <h1>Product #{product.id}</h1>
          <h2>Name: {product.name}</h2>
          <p>Price: ${product.price}</p>

          <div className="actions">
            <button onClick={() => showUpdateInputs(product)}>Update</button>
            <button onClick={() => deleteData(product.id)}>Delete</button>
          </div>

          {editId === product.id && (
            <div className="edit-form">
              <label>
                Name
                <input
                  type="text"
                  placeholder="Product name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </label>
              <label>
                Price
                <div className="price-input">
                  <span className="currency-prefix">$</span>
                  <input
                    className="price-field"
                    type="number"
                    placeholder="0"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                </div>
              </label>
              <button onClick={() => putData(product.id)}>Save</button>
              <button className="close-button" onClick={closeUpdateInputs}>Close</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default App
