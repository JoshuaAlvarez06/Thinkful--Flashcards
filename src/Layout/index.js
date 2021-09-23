import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import DeckStudy from "./Decks/DeckStudy"
import DeckView from "./Decks/DeckView"
import DeckNew from "./Decks/DeckNew";
import DeckEdit from "./Decks/DeckEdit";
import CardEdit from "./Cards/CardEdit";
import CardNew from "./Cards/CardNew";


function Layout() {
  const [deck, setDeck] = useState([]);

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <DeckNew />
          </Route>
          <Route path="/decks/:deckId/study">
            <DeckStudy deck={deck} setDeck={setDeck}/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardNew deck={deck} setDeck={setDeck}/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit deck={deck} setDeck={setDeck}/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView deck={deck} setDeck={setDeck}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
