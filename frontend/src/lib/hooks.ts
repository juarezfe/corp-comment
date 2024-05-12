import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import { FeedbackItem } from "../types";

export default function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error(
      "useFeedbackItems must be used within a FeedbackItemsContextProvider"
    );
  }
  return context;
}

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // fetch data from API
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setFeedbackItems([...data.feedbacks]);
        setErrorMessage("");
      } catch (error) {
        // network error, not 2xx response, or JSON parsing error
        setErrorMessage("Something went wrong. Please try again later.");
        console.log("Failed to fetch data");
      }
      setIsLoading(false);
    };
    fetchFeedbackItems();
  }, []);

  return { feedbackItems, setFeedbackItems, isLoading, errorMessage };
}
