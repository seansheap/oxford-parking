import '../../styles/NavBar.css';
import NavButton from "./NavButtons/NavButton";


const NavBar = () => {

  return (
    <nav >
      <ul className="navbar">

        <li>
          <NavButton text="Home" link="/" />
        </li>
        <hr className='splitter' />
        <li>
          <NavButton text="Add Parking" link="/add-parking" />
        </li>
        <hr className='splitter' />
        <li>
          <NavButton text="View Parking" link="/parking" />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;