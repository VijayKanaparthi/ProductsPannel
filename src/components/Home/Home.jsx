import { Component } from "react"
import "./Home.css"

import Items from "../Items/Items"

class Home extends Component {
  state = { products: [], name: "", price: "", image: "" }

  componentDidMount() {
    this.getProducts()
  }

  formData = (data) => ({
    id: data._id,
    name: data.name,
    price: data.price,
    image: data.image,
  })

  getProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products")
    console.log(response)
    const data = await response.json()
    console.log(data)
    const datas = data.data.map((each) => this.formData(each))

    this.setState({ products: datas })
  }

  formSubmitted = async (event) => {
    event.preventDefault()
    const { name, price, image } = this.state
    const data = { name, price, image }
    const url = "http://localhost:5000/api/products"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    console.log(response)
    this.setState({ name: "", price: "", image: "" }, this.getProducts)
  }

  getName = (event) => {
    this.setState({ name: event.target.value })
  }
  getPrice = (event) => {
    this.setState({ price: event.target.value })
  }
  getImage = (event) => {
    this.setState({ image: event.target.value })
  }

  deleteItem = async (id) => {
    const url = `http://localhost:5000/api/products/${id}`
    const options = {
      method: "DELETE",
    }
    const response = await fetch(url, options)
    this.getProducts()
    console.log(response)
  }

  updateItem = async (id, productName, productPrice, productImage) => {
    console.log(productName)

    const url = `http://localhost:5000/api/products/${id}`
    const data = { name: productName, price: productPrice, image: productImage }
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    console.log(response)
    this.getProducts()
    window.location.reload()
  }

  render() {
    const { products, name, price, image } = this.state
    console.log(products)
    return (
      <div className="home-container">
        <h1 className="heading">
          Products <span className="sub-heading">Admin Panel</span>
        </h1>
        <form className="form-container" onSubmit={this.formSubmitted}>
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Product Name"
            onChange={this.getName}
            value={name}
          />
          <label htmlFor="price">Product Price</label>
          <input
            id="price"
            type="text"
            placeholder="Enter Product Price"
            onChange={this.getPrice}
            value={price}
          />
          <label htmlFor="image">Product Image</label>
          <input
            id="image"
            type="text"
            placeholder="Enter Product Image"
            onChange={this.getImage}
            value={image}
          />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
        <ul className="cards-container">
          {products.map((each) => (
            <Items
              key={each.id}
              items={each}
              deleteItem={this.deleteItem}
              updateItem={this.updateItem}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
