import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";

export default function DeckStudy({ deck, setDeck }) {
    const {deckId} = useParams();
    const [side, setSide] = useState("front");
    const [cardIndex, setCardIndex] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            const list = await readDeck(deckId, abortController.signal);
            setDeck(list);
        }
        loadDeck();
    }, [deckId, setDeck])

    const flipHandler = () => {
        side === "front" ? setSide("back") : setSide("front");
    }

    const restartCards = () => {
        setCardIndex(0);
        setSide("front");
    }

    const nextHandler = () => {
        if (cardIndex === (deck.cards.length - 1)) {
            window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page") ? restartCards() : history.push("/");
        } else {
            setCardIndex(cardIndex + 1)
            setSide("front");
        }
    }
    let studyCard;
    if (deck.cards && cardIndex < deck.cards.length && deck.cards.length > 2) {
        studyCard = (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{`Card ${cardIndex + 1} of ${deck.cards.length}`}</h5>
                    {side === "front" ? <p className="card-text">{deck.cards[cardIndex].front}</p> : <p className="card-text">{deck.cards[cardIndex].back}</p>}
                    <button className="btn btn-secondary mr-2" onClick={flipHandler}>
                        Flip
                    </button>
                    {side === "back" ? <button className="btn btn-primary" onClick={nextHandler}>
                        Next
                    </button> : null}
                </div>
            </div>
        )
    } else if (deck.cards && deck.cards.length <= 2) {
        studyCard = (
            <div>
                <h2>{deck.name}: Study</h2>
                <h3>Not enough cards.</h3>
                <p>You meed at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
                <Link to="">
                    <button className="btn btn-primary">
                        <span className="oi oi-plus mr-1"></span>
                        Add Cards
                    </button>
                </Link>
            </div>
        )
    }


    return (
        <div>
            <div aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to="/">
                        <li className="breadcrumb-item text-primary mr-4 d-flex align-items-center"><span className="oi oi-home mr-1"></span>Home</li>
                    </Link>
                    <Link to={`/decks/${deckId}`}>
                        <li className="breadcrumb-item text-primary mr-4">{deck.name}</li>
                    </Link>
                    <li className="breadcrumb-item active">Study</li>
                </ol>
            </div>
            <div>
                {studyCard}
            </div>
        </div>
        )
}