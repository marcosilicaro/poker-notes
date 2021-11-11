import "./sidebar.css";
import {
    Add,
    ViewCarousel
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/addhands">
              <li className="sidebarListItem ">
              <Add className="sidebarIcon" />
              Add Hands
            </li>
            </Link>
            <Link to="/allhands">
            <li className="sidebarListItem">
              <ViewCarousel className="sidebarIcon" />
              All Hands
            </li>
            </Link>
            <Link to="/edithand">
            <li className="sidebarListItem">
              <CreateIcon className="sidebarIcon" />
              Edit Hand
            </li>
            </Link>
          </ul>
        </div>
        
      </div>
    </div>
  );
}