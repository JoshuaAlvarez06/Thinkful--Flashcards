import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function CardNew({ deck, setDeck }) {
    const { deckId } = useParams();
    
    const initialFormData = {
        front: "",
        back: "",
    };

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchDeck() {
            const deckData= await readDeck(deckId, abortController.signal);
            setDeck(deckData);
        }
        fetchDeck();
    }, [deckId, setDeck])

    function addCard(front, back) {
        const ac = new AbortController();
        createCard(deckId, { front, back }, ac.signal)
    }

    return (
        <div>
            
            <div aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to="/">
                        <li className="breadcrumb-item text-primary mr-4 d-flex align-items-center"><span className="oi oi-home mr-1"></span>Home</li>
                    </Link>
                    <Link to={`/decks/${deckId}`}>
                        <li className="breadcrumb-item text-primary mr-4 d-flex align-items-center">{deck.name}</li>
                    </Link>
                    <li className="breadcrumb-item active mr-4">Add Card</li>
                </ol> 
            </div>
            <div>
                <h1>{deck.name}: Add Card</h1>
            </div>
            <CardForm initialFormData={initialFormData} onSuccess={addCard} isNew={true} deck={deck}/>
        </div>
    )
}