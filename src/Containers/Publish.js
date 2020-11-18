import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Publish = ({ token }) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("brand", brand);
  formData.append("size", size);
  formData.append("color", color);
  formData.append("condition", condition);
  formData.append("city", city);
  formData.append("price", price);
  formData.append("picture", file);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <div className="publish-content">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="file-select">
            <div className="dashed-preview">
              <div className="input-design">
                <label for="file" className="label-file">
                  <span className="input-sign">+</span>
                  <span>Ajoute une photo</span>
                </label>
                <input
                  id="file"
                  className="input-file"
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex: pantalon Levi's délavé"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="text-input">
              <h4>Décris ton article</h4>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="ex: très peu porté, bonne coupe"
                name="description"
                id="description"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex: Gucci"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              />
            </div>
            <div className="text-input">
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex: 40/M/6.5"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              />
            </div>
            <div className="text-input">
              <h4>État</h4>
              <input
                type="text"
                placeholder="ex: très bon état"
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
              />
            </div>
            <div className="text-input">
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex: Bleu"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
            </div>
            <div className="text-input">
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Prix</h4>
              <div className="checkbox">
                <input
                  className="price-input"
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <div className="checkbox-input">
                  <input
                    className="checkbox-design"
                    type="checkbox"
                    name="exchange"
                    value="exchange"
                    id="exchange"
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-button-div">
            <Link to="/">
              <button className="form-validation" type="submit">
                Ajouter
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { fromPublish: true },
      }}
    />
  );
};

export default Publish;
