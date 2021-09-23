import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks  } from "../utils/api";

export default function Home() {
    const [decks, setDecks] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      const deck = await listDecks(abortController.signal);
      setDecks(deck);
    }
    fetchDecks();
  }, []);

    const decksList = decks.map((deck, index) => {
        return (
            <div className="card" key={index}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{deck.name}</h5>
                        <p>{deck.cards.length} cards</p>
                    </div>
                    
                    <p className="card-text">{deck.description}</p>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Link to={`/decks/${deck.id}`}>
                                <button className="btn btn-secondary mr-2"><span className="oi oi-eye mr-1"></span> View</button>
                            </Link>
                            <Link to={`/decks/${deck.id}/study`}>
                                <button className="btn btn-primary"><span className="oi oi-book mr-1"></span> Study</button>
                            </Link>
                        </div>
                        <button className="btn btn-danger" onClick={() => {
                            const abortController = new AbortController();
                            if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
                                deleteDeck(deck.id, abortController.signal);
                                history.go(0);
                            } else {
                                return null;
                            }
                        }}>
                            <span className="oi oi-trash"></span>
                        </button>
                    </div>
                </div>
            </div>
            )
        }
    )

    const history = useHistory();

    return (
        <div className="container">
            <div className="actions">
                <Link to="/decks/new">
                    <button className="btn btn-secondary mb-3">
                        <span className="oi oi-plus mr-2"></span>
                        Create Deck
                    </button>
                </Link>
            </div>
            <div>
                {decksList}
            </div>
            <div>
            </div>
        </div>
    )
}