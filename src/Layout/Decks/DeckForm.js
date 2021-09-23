import React from "react";
import { useHistory } from "react-router-dom";

export default function DeckForm({ isNew, onSuccess, changeHandler, cancelHandler, formData }) {
    const history = useHistory();

    async function submitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        await onSuccess(formData, abortController.signal);
        isNew ? history.push("/") : history.push(`/decks/${formData.id}`);
        history.go(0);
      }

  return (
    <div>
      <h2>{isNew ? "Create Deck" : "Edit Deck"}</h2>
      <form className="d-flex flex-column" onSubmit={submitHandler}>
        <label className="d-flex flex-column" htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            className="pt-1 pl-2 pb-1 mt-1"
            onChange={changeHandler}
            value={formData.name}
            required
          />
        </label>
        <label className="d-flex flex-column mt-2" htmlFor="description">
          Description
          <textarea
            id="description"
            type="textarea"
            name="description"
            rows="6"
            className="pt-1 pl-2 mt-1"
            onChange={changeHandler}
            value={formData.description}
            required
          />
        </label>
        <div className="mt-2">
          <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
