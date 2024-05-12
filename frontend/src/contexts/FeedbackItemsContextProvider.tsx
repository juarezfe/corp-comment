import { createContext, useMemo, useState } from "react";
import { FeedbackItem } from "../types";
import { getBadgeLetter } from "../lib/helpers";
import { useFeedbackItems } from "../lib/hooks";

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};
type TFeedbackItemsContext = {
  filteredFeedbackItems: FeedbackItem[];
  companyList: string[];
  isLoading: boolean;
  errorMessage: string;
  handleAddToList: (feedbackComment: string) => void;
  handleSelectCompany: (company: string) => void;
};
//create a context for the feedback items
export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const { feedbackItems, setFeedbackItems, isLoading, errorMessage } =
    useFeedbackItems();

  const filteredFeedbackItems = useMemo(() => {
    return selectedCompany
      ? feedbackItems.filter(
          (item: FeedbackItem) => item.company === selectedCompany
        )
      : feedbackItems;
  }, [selectedCompany, feedbackItems]);

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  const companyList = useMemo(() => {
    return feedbackItems
      .map((item: FeedbackItem) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  }, [feedbackItems]);

  const handleAddToList = async (feedbackComment: string) => {
    const newItem: FeedbackItem = {
      text: feedbackComment,
      id: new Date().getTime(),
      upvoteCount: 0,
      company:
        feedbackComment
          .split(" ")
          .find((word) => word.includes("#"))
          ?.substring(1) || "",
      daysAgo: 0,
    };
    setFeedbackItems([...feedbackItems, newItem]);

    // POST request to API
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newItem,
          badgeLetter: getBadgeLetter(newItem.company),
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <FeedbackItemsContext.Provider
      value={{
        companyList,
        isLoading,
        errorMessage,
        handleAddToList,
        handleSelectCompany,
        filteredFeedbackItems,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
