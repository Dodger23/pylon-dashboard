import React from "react";
import {
  FaHome,
  FaWater,
  FaWrench,
  FaReplyAll,
  FaFileAlt,
  FaCubes
} from "react-icons/fa";
import { Link } from "react-router-dom";
function Sidebar(props) {
  const { current } = props;
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <h2>Dshboard</h2>

        <div className="pages">
          <Link to="/">
            <div className={current === "home" ? "page active-page" : "page"}>
              <FaHome />
              <p className="arabic">الرئيسية</p>
            </div>
          </Link>
          <Link to="/water-contracts">
            <div
              className={
                current === "water-contracts" ? "page active-page" : "page"
              }
            >
              <FaWater />
              <p className="arabic">عقود المياه</p>
            </div>
          </Link>
          <Link to="/malfunctions">
            <div
              className={
                current === "malfunctions" ? "page active-page" : "page"
              }
            >
              <FaWrench />
              <p className="arabic">الأعطال</p>
            </div>
          </Link>
          <Link to="/responses">
            <div
              className={current === "responses" ? "page active-page" : "page"}
            >
              <FaReplyAll />
              <p className="arabic">الردود</p>
            </div>
          </Link>
          <Link to="/monthly-readings">
            <div
              className={
                current === "monthly-readings" ? "page active-page" : "page"
              }
            >
              <FaFileAlt />
              <p className="arabic">القراءات الشهرية</p>
            </div>
          </Link>
          <Link to="/connected-meters">
            <div
              className={
                current === "connected-meters" ? "page active-page" : "page"
              }
            >
              <FaCubes />
              <p className="arabic">العدادات المتصلة</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
