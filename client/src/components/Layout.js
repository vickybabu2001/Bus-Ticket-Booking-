import React from 'react';
import "../resources/layout.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Layout = ({ children }) => {
  const imgr="https://img.freepik.com/premium-vector/bus-stand-peoples-are-waiting-bus-stoppage-coming-city-bus-cartoon-background_683725-74.jpg?w=900"
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  console.log(user);
  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-line",
      path: "/",
    },
    {
      name: "Bookings",
      icon: "ri-file-list-line",
      path: "/bookings",
    },
    {
      name: "Profile",
      icon: "ri-user-line",
      path: "/profile",
    },
    {
      name: "Logout",
      icon: "ri-logout-box-line",
      path: "/logout",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];

  const menuToBeRendered = user?.data.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  
  return (
    <div className='layout'>
      <div className='sidebar'>
        <div className="d-flex flex-column align-items-center">
          <h1 className="logo">SB</h1>

          <h1 className="role">{user?.data.name} <br />Role : {user?.data.isAdmin ? 'Admin' : 'User'}</h1>
        </div>
        <div className='d-flex flex-column justify-content-center gap-3 menu'>
          {menuToBeRendered.map((item, index) => {
            return <div
              className={`${activeRoute === item.path && "active-menu-item"
                } menu-item`}
            >
              <i className={item.icon}></i>
               
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        navigate("/login");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                
            </div>
          })}
        </div>
      </div>
      <div className='body'>
        <div className='header'>
          <img src={imgr} alt="image" className='imgrt'/>
        </div>
        <div className='content'>
          
          {children}

        </div>
      </div>

    </div>
  );
}

export default Layout;

