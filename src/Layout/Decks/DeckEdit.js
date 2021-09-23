import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function DeckEdit() {
  const [formData, setFormData] = useState({name: "", description: ""});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const list = await readDeck(deckId, abortController.signal);
        setFormData(list);
      } catch (error) {
        console.log(error);
      }
    }
    loadDeck();
    return () => abortController.abort
  }, [deckId]);

  function changeHandler({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function updateTheDeck(formData, signal) {
    updateDeck(formData, signal);
  }

  const cancelHandler = () => history.push(`/decks/${deckId}`);

  return (
    <div>
      <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <Link to="/">
            <li className="breadcrumb-item text-primary mr-4 d-flex align-items-center">
              <span className="oi oi-home mr-1"></span>Home
            </li>
          </Link>
          <li className="breadcrumb-item active mr-4">{formData.name}</li>
        </ol>
      </div>
      <DeckForm
        isNew={false}
        formData={formData}
        onSuccess={updateTheDeck}
        changeHandler={changeHandler}
        cancelHandler={cancelHandler}
      />
    </div>
  );
}
