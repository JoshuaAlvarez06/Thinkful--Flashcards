import React, { useEffect } from "react";
import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

export default function DeckView({ deck, setDeck }) {
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

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
  }, [setDeck, deckId]);

  function deleteDeckHandler() {
    const abortController = new AbortController();
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId, abortController.signal);
      history.push("/");
      history.go(0);
    } else {
      return null;
    }
  }

  function deleteCardHandler(cardId) {
    const abortController = new AbortController();
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      deleteCard(cardId, abortController.signal);
      history.go(0);
    }
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
          <li className="breadcrumb-item active mr-4">{deck.name}</li>
        </ol>
      </div>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <Link to={`${url}/edit`}>
              <button className="btn btn-secondary mr-2">
                <span className="oi oi-pencil mr-2"></span>
                Edit
              </button>
            </Link>
            <Link to={`${url}/study`}>
              <button className="btn btn-primary mr-2">
                <span className="oi oi-book mr-2"></span>
                Study
              </button>
            </Link>
            <Link to={`${url}/cards/new`}>
              <button className="btn btn-primary">
                <span className="oi oi-plus mr-2"></span>
                Add Cards
              </button>
            </Link>
          </div>
          <div>
            <button className="btn btn-danger" onClick={deleteDeckHandler}>
              <span className="oi oi-trash"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {deck.cards && deck.cards.length > 0 ? <h2>Cards</h2> : <h2>No Cards in Deck</h2>}
        {deck.cards
          ? deck.cards.map((card, index) => (
              <div
                className="container border rounded pt-3 pr-3 pb-3 pl-3"
                key={index}
              >
                <div className="row">
                  <div className="col-6 pt-3 pr-3 pb-3 pl-3">
                    <p>{card.front}</p>
                  </div>
                  <div className="col-6 pt-3 pr-3 pb-3 pl-3">
                    <p>{card.back}</p>
                    <div>
                      <Link to={`${url}/cards/${card.id}/edit`}>
                        <button className="btn btn-secondary mr-2">
                          <span className="oi oi-pencil mr-2"></span>
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteCardHandler(card.id);
                          history.go(0);
                        }}
                      >
                        <span className="oi oi-trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
