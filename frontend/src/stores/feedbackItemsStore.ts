import { create } from "zustand";
import { FeedbackItem } from "../types";
import { getBadgeLetter } from "../lib/helpers";

type Store = {
  feedbackItems: FeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => FeedbackItem[];
  addItemToList: (feedbackComment: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [] as FeedbackItem[],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item: FeedbackItem) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },
  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (item: FeedbackItem) => item.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
  addItemToList: async (feedbackComment: string) => {
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
    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

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
    );
  },
  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company,
    }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
    }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      set(() => ({
        feedbackItems: data.feedbacks,
      }));
    } catch (error) {
      // network error, not 2xx response, or JSON parsing error
      set(() => ({
        errorMessage: "Something went wrong. Please try again later.",
      }));
    }
    set(() => ({
      isLoading: false,
    }));
  },
}));
