import Heading from "../Heading";
import Logo from "../Logo";
import Pattern from "../Pattern";

type HeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <Heading />
      {children}
    </header>
  );
}
