import React, { useState } from "react"
import { FaPenSquare } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { FaWindowClose } from "react-icons/fa"
import Popup from "reactjs-popup"
import "./Items.css"

const Items = (props) => {
  const [productName, setName] = useState("")
  const [productPrice, setPrice] = useState("")
  const [productImage, setImage] = useState("")

  const { items, deleteItem, updateItem } = props
  const { id, name, price, image } = items

  const deleteClicked = () => {
    deleteItem(id)
  }
  const updateClicked = (event) => {
    event.preventDefault()
    updateItem(id, productName, productPrice, productImage)
  }
  return (
    <li>
      <img src={image} alt="" className="card-image" />
      <div className="card-contoller">
        <div className="rate-name">
          <p>{name}</p>
          <p>{price}</p>
        </div>
        <div className="delete-update">
          <MdDeleteOutline
            size={20}
            aria-label="block"
            onClick={deleteClicked}
          />
          <Popup
            modal
            trigger={
              <FaPenSquare
                size={20}
                aria-label="block"
                onClick={updateClicked}
              />
            }
          >
            {(close) => (
              <div className="popup-container">
                <h1 className="update-text">Update Product</h1>
                <button className="close-button" onClick={() => close()}>
                  <FaWindowClose size={25} />
                </button>
                <form
                  className="update-form-container"
                  onSubmit={updateClicked}
                >
                  <div className="label-input-container">
                    <label htmlFor="name">Product Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter Product Name"
                      onChange={(e) => setName(e.target.value)}
                      value={productName}
                    />
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="price">Product Price</label>
                    <input
                      id="price"
                      type="text"
                      placeholder="Enter Product Price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={productPrice}
                    />
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="image">Product Image</label>
                    <input
                      id="image"
                      type="text"
                      placeholder="Enter Product Image"
                      onChange={(e) => setImage(e.target.value)}
                      value={productImage}
                    />
                  </div>

                  <button className="button" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </li>
  )
}

export default Items
