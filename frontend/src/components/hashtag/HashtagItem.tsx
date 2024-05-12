type HashtagProps = {
  company: string;
  onSelectCompany: (company: string) => void;
};

export function Hashtag({ company, onSelectCompany }: HashtagProps) {
  return (
    <li>
      <button onClick={() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
