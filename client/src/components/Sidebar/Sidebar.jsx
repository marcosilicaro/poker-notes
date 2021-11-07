import "./sidebar.css";
import {
    Add,
    ViewCarousel
} from "@material-ui/icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <Add className="sidebarIcon" />
              Add Hands
            </li>
            <li className="sidebarListItem">
              <ViewCarousel className="sidebarIcon" />
              All Hand
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Select</h3>
          <ul className="sidebarList">
              <li className="sidebarListItem">
                <div className="sidebarIcon">0</div>
                Preflop
              </li>
              <li className="sidebarListItem">
              <div className="sidebarIcon">F</div>
                Flop
              </li>
            <li className="sidebarListItem">
            <div className="sidebarIcon">T</div>
              Turn
            </li>
            <li className="sidebarListItem">
            <div className="sidebarIcon">R</div>
              River
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}