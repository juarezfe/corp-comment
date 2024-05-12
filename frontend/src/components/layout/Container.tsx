import FeedbackForm from "../feedback/FeedbackForm";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

export default function Container() {
  return (
    <main className="container">
      <Header>
        <FeedbackForm />
      </Header>
      <FeedbackList />
    </main>
  );
}
