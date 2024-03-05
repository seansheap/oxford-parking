import { Link } from "react-router-dom";
import '../../../styles/NavButton.css';

interface Props {
  icon: string;
  link: string;
}

const NavButtonIcon = ({ icon, link }: Props) => {
  return (
    <div className="link-wrapper">
      <Link className="link-item" to={link}> </Link>
      <i className={`fa ${icon}`} aria-hidden="true"></i>
    </div>
  )
}

export default NavButtonIcon;