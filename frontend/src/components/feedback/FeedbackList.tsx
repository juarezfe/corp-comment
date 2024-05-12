import { FeedbackItem } from "../../types";
import ErrorMessage from "../ErrorMessage";
import FeedBackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
// import useFeedbackItemsContext from "../../lib/hooks";

export default function FeedbackList() {
  // const { filteredFeedbackItems, isLoading, errorMessage } =
  //   useFeedbackItemsContext();
  const filteredFeedbackItems = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackItems()
  );
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {filteredFeedbackItems.map((feedbackItem: FeedbackItem) => (
        <FeedBackItem key={feedbackItem.id} {...feedbackItem} />
      ))}
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
    </ol>
  );
}
