// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import EnterEmail from './pages/forgot-password/EnterEmail';
// import EnterOTP from './pages/forgot-password/EnterOTP';
// import ResetPassword from './pages/forgot-password/ResetPassword';
// import Dashboard from './pages/Dashboard';
// import DrawerLayout from './components/DrawerLayout';
// import CreateTicket from './pages/CreateTicket';
// import TicketPurchase from './pages/TicketPurchase';
// import VendorManagement from './pages/VendorManagement';
// import Notifications from './pages/Notifications';
// import Reports from './pages/Reports';
// import Profile from './pages/Profile';

// function App() {

//   return (
//     <div>
//       <Router>
//         <Routes>
//           {/* Routes without the DrawerLayout */}
//           <Route path='/login' element={<Login/>}/>
//           <Route path='/signup' element={<SignUp/>}/>
//           <Route path='/ForgotPassword/EnterEmail' element={<EnterEmail/>}/>
//           <Route path='/ForgotPassword/EnterOTP' element={<EnterOTP/>}/>
//           <Route path='/ForgotPassword/ResetPassword' element={<ResetPassword/>}/>
//           {/* Routes with the DrawerLayout */}
//           <Route
//             path='/'
//             element={
//               <DrawerLayout title="Dashboard">
//                 <Dashboard />
//               </DrawerLayout>
//             }
//           />
//           <Route
//             path='/dashboard'
//             element={
//               <DrawerLayout title="Dashboard">
//                 <Dashboard />
//               </DrawerLayout>
//             }
//           />
//           <Route
//             path='/create-ticket'
//             element={
//               <DrawerLayout title="Create Ticket">
//                 <CreateTicket />
//               </DrawerLayout>
//             }
//           />
//           <Route
//             path='/ticket-purchase'
//             element={
//               <DrawerLayout title="Ticket Purchase">
//                 <TicketPurchase/>
//               </DrawerLayout>
//             }
//           />
//           <Route
//             path='/vendor-management'
//             element={
//               <DrawerLayout title="Vendor Management">
//                 <VendorManagement/>
//               </DrawerLayout>
//             }
//           />
//           <Route
//             path='/notifications'
//             element={
//               <DrawerLayout title="Notifications">
//                 <Notifications/>
//               </DrawerLayout>
//             }
//           />
//           <Route
//             path='/reports'
//             element={
//               <DrawerLayout title="Reports">
//                 <Reports/>
//               </DrawerLayout>
//             }
//           />
//           <Route
//             path='/profile'
//             element={
//               <DrawerLayout title="Profile">
//                 <Profile/>
//               </DrawerLayout>
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// export default App

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EnterEmail from './pages/forgot-password/EnterEmail';
import EnterOTP from './pages/forgot-password/EnterOTP';
import ResetPassword from './pages/forgot-password/ResetPassword';
import Dashboard from './pages/Dashboard';
import DrawerLayout from './components/DrawerLayout';
import CreateTicket from './pages/CreateTicket';
import TicketPurchase from './pages/TicketPurchase';
import VendorManagement from './pages/VendorManagement';
import Notifications from './pages/Notifications';
import Reports from './pages/Reports';
import Profile from './pages/Profile';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch the user role from localStorage or any other storage mechanism
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {/* Routes without the DrawerLayout */}
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/ForgotPassword/EnterEmail' element={<EnterEmail />} />
          <Route path='/ForgotPassword/EnterOTP' element={<EnterOTP />} />
          <Route path='/ForgotPassword/ResetPassword' element={<ResetPassword />} />

          {/* Conditional Rendering based on User Role */}
          {userRole === 'Customer' && (
            <Route
              path='/ticket-purchase'
              element={
                <DrawerLayout title="Ticket Purchase">
                  <TicketPurchase />
                </DrawerLayout>
              }
            />
          )}

          {userRole === 'Vendor' && (
            <>
              <Route
                path='/dashboard'
                element={
                  <DrawerLayout title="Dashboard">
                    <Dashboard />
                  </DrawerLayout>
                }
              />
              <Route
                path='/create-ticket'
                element={
                  <DrawerLayout title="Create Ticket">
                    <CreateTicket />
                  </DrawerLayout>
                }
              />
              <Route
                path='/vendor-management'
                element={
                  <DrawerLayout title="Vendor Management">
                    <VendorManagement />
                  </DrawerLayout>
                }
              />
              <Route
                path='/notifications'
                element={
                  <DrawerLayout title="Notifications">
                    <Notifications />
                  </DrawerLayout>
                }
              />
              <Route
                path='/reports'
                element={
                  <DrawerLayout title="Reports">
                    <Reports />
                  </DrawerLayout>
                }
              />
              <Route
                path='/profile'
                element={
                  <DrawerLayout title="Profile">
                    <Profile />
                  </DrawerLayout>
                }
              />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;