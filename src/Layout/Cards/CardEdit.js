import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function CardEdit({ deck, setDeck }) {
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({});

  function editCard(front, back) {
    return updateCard({front, back, id: card.id, deckId: deck.id});
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const list = await readDeck(deckId, abortController.signal);
        setDeck(list);
      } catch (error) {
        console.log(error);
      }
    }
    loadDeck();
  }, [deckId, setDeck]);

  useEffect(() => {
    async function loadCard() {
      const abortController = new AbortController();
      const cardData = await readCard(cardId, abortController.signal);
      setCard(cardData);
    }
    loadCard();
  }, [cardId]);

  return (
    <div>
      <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <Link to="/">
            <li className="breadcrumb-item text-primary mr-4 d-flex align-items-center">
              <span className="oi oi-home mr-1"></span>Home
            </li>
          </Link>
          <Link to={`/decks/${deckId}`}>
            <li className="breadcrumb-item text-primary mr-4">{deck.name}</li>
          </Link>
          <li className="breadcrumb-item active mr-4">Edit Card {card.id}</li>
        </ol>
      </div>
      <div>
        <h1>Edit Card</h1>
      </div>
      {/* Send in the initial crd data by fetching deck/card */}
      <CardForm
        initialFormData={card}
        isNew={false}
        onSuccess={editCard}
        deck={deck}
      />
    </div>
  );
}
