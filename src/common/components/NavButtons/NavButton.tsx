import { Link } from "react-router-dom";
import '../../../styles/NavButton.css';

interface Props {
  text: string;
  link: string;
}

const NavButton = ({ text, link }: Props) => {
  return (
    <div className="link-wrapper">
      <Link className="link-item" to={link}>{text}</Link>
    </div>
  )
}

export default NavButton;