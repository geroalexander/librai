import DropMenu from '../Menu/Menu'
import SearchBar from '../Shared/SearchBar';
import Camera from '../Shared/Camera';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {
    isDesktop,
    isTablet,
    isMobile
  } from "react-device-detect";
import { useMediaQuery } from 'react-responsive';
import librai_logo from '../../Assets/Librai-Logo-Outline.png';
import './Header.css';


interface HeaderProps extends RouteComponentProps {
    setIsLoading: (value: React.SetStateAction<boolean>) => void;
}

const Header: React.FC<HeaderProps> = ({setIsLoading}) => {

    return (
        <header>
          {isDesktop && <img src={librai_logo}/>}
          <SearchBar />
          {isDesktop && <DropMenu/>}
          {(isTablet || isMobile) && <Camera setIsLoading={setIsLoading} /> }
        </header>
    )

}

export default withRouter(Header);