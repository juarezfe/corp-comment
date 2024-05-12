// import useFeedbackItemsContext from "../../lib/hooks";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import { Hashtag } from "./HashtagItem";

export default function HashtagList() {
  // const { companyList, handleSelectCompany } = useFeedbackItemsContext();
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  return (
    <ul className="hashtags">
      {companyList.map((company, index) => (
        <Hashtag
          key={company + index}
          company={company}
          onSelectCompany={selectCompany}
        />
      ))}
    </ul>
  );
}
