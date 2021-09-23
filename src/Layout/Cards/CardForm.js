import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function CardForm({ initialFormData, isNew, onSuccess, deck }) {
  const [formData, setFormData] = useState({
    ...initialFormData,
  });

  useEffect(() => {
    setFormData({
      ...initialFormData,
    })
  }, [initialFormData])

  const history = useHistory();

  async function submitHandler(event) {
    event.preventDefault();
    await onSuccess(formData.front, formData.back);
    history.push(`/decks/${deck.id}`);
    history.go(0);
  }

  function changeHandler(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleDone() {
    history.push(`/decks/${deck.id}`);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="d-flex flex-column">
        <label htmlFor="card-front">Front</label>
        <textarea
          name="front"
          id="card-front"
          rows="3"
          onChange={changeHandler}
          value={formData.front}
        ></textarea>
      </div>

      <div className="d-flex flex-column mt-3 mb-3">
        <label htmlFor="card-back">Back</label>
        <textarea
          name="back"
          id="card-back"
          rows="3"
          onChange={changeHandler}
          value={formData.back}
        ></textarea>
      </div>

      <div>
        <button
          type="button"
          onClick={handleDone}
          className="btn btn-secondary mr-2"
        >
          {isNew ? "Done" : "Cancel"}
        </button>
        <button type="submit" className="btn btn-primary">
          {isNew ? "Save" : "Submit"}
        </button>
      </div>
    </form>
  );
}
