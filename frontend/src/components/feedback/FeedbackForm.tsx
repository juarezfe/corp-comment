import { useState } from "react";
import { MAX_FEEDBACK_CHARACTERS } from "../../lib/constants";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const addItemToList = useFeedbackItemsStore((state) => state.addItemToList);

  const maxLengthLeft = MAX_FEEDBACK_CHARACTERS - feedback.length;

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length > MAX_FEEDBACK_CHARACTERS) {
      return;
    }

    setFeedback(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (feedback.includes("#") && feedback.length >= 5) {
      setShowValidIndicator(true);
      setTimeout(() => {
        setShowValidIndicator(false);
      }, 2000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => {
        setShowInvalidIndicator(false);
      }, 2000);
      return;
    }

    addItemToList(feedback);
    setFeedback("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator && "form--valid"} ${
        showInvalidIndicator && "form--invalid"
      }`}
    >
      <textarea
        value={feedback}
        onChange={handleOnChange}
        id="feedback-textarea"
        name="feedback"
        placeholder="default"
        spellCheck={false}
        autoFocus
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{maxLengthLeft}</p>
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
