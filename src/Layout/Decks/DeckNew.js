import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function DeckNew() {
  const history = useHistory();
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });

  async function createNewDeck(formData, signal) {
    createDeck(formData, signal);
  }

  const cancelHandler = () => history.push("/");

  function changeHandler({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  return (
    <div>
      <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <Link to="/">
            <li className="breadcrumb-item text-primary mr-4 d-flex align-items-center">
              <span className="oi oi-home mr-1"></span>Home
            </li>
          </Link>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </div>
      <DeckForm
        isNew={true}
        formData={formData}
        onSuccess={createNewDeck}
        changeHandler={changeHandler}
        cancelHandler={cancelHandler}
      />
    </div>
  );
}
