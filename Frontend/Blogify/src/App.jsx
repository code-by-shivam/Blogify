import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import { HomePage } from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AppLayout from "./ui_components/AppLayout";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import SignUpPage from "./pages/SignUpPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ui_components/ProtectedRoute";
import { useEffect, useState } from "react";

import { getUsername } from "./services/apiBlog";


function App() {
  const [username, setUsername] = useState(null);
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const {data} = useQuery({
    queryKey:["username"],
    queryFn: getUsername
  })

 useEffect(function(){
  if(data){
    setUsername(data.username)
    setIsAuthenticated(true)
  }
 }, [data])



  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout isAuthenticated={isAuthenticated}
          username={username}
          setUsername={setUsername}
          setIsAuthenticated={setIsAuthenticated}
          />}>
            <Route index element={<HomePage />} />
            <Route path="blogs/:slug" element={<DetailPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="create" element={
              <ProtectedRoute>
              <CreatePostPage />
              </ProtectedRoute> 
             } 
             />
            <Route path="signin" element={<LoginPage setIsAuthenticated ={setIsAuthenticated}
            setUsername={setUsername}
            />} />
            {/* <Route path="profile" element={<ProfilePage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
