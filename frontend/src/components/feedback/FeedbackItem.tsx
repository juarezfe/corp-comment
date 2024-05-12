import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedbackItem } from "../../types";
import { formatDate, getBadgeLetter } from "../../lib/helpers";
import { useState } from "react";

export default function FeedBackItem({
  upvoteCount,
  company,
  text,
  daysAgo,
}: FeedbackItem) {
  const [open, setOpen] = useState(false);
  const [currentUpvoteCount, setCurrentUpvoteCount] = useState(upvoteCount);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleUpVoteCount = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setCurrentUpvoteCount((prevCount) => ++prevCount);
    e.currentTarget.disabled = true;
    e.stopPropagation(); // stop event bubbling
  };

  return (
    <li
      className={`feedback  ${!!open && "feedback--expand"}`}
      onClick={handleToggle}
    >
      <button onClick={handleUpVoteCount}>
        <TriangleUpIcon />
        <span>{currentUpvoteCount}</span>
      </button>
      <div>
        <p>{getBadgeLetter(company)}</p>
      </div>

      <div>
        <p>{company}</p>
        <p>{text}</p>
      </div>

      <p>{formatDate(daysAgo)}</p>
    </li>
  );
}
