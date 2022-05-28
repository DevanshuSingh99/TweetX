import {Routes, BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login";
import Feed from "./MainPage/Feed/Feed";
import Home from "./MainPage/Home";
import Followers from "./MainPage/Profile/Followers";
import Followings from "./MainPage/Profile/Followings";
import Post from "./MainPage/Profile/Post";
import Profile from "./MainPage/Profile/Profile";
import Users from "./MainPage/Users/Users";
import Register from "./Register";
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />}>
                        <Route path="feed" element={<Feed />} />
                        <Route path="users" element={<Users />} />
                        <Route path="profile" element={<Profile />}>
                            <Route path="post" element={<Post />} />
                            <Route path="followers" element={<Followers />} />
                            <Route path="followings" element={<Followings />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
