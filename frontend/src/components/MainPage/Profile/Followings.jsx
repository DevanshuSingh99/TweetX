import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {LOG_IN, MY_POSTS} from "../../../redux/actions";
import store from "../../../redux/store";
import PostCard from "../Feed/PostCard";
import styled from 'styled-components'
import { useSelector } from "react-redux";
import {MoonLoader} from "react-spinners";
import UserCard from "../Users/UserCard";

function Followings() {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.userResponse.user)
    let [loading, setLoading] = useState(true);
    const cookie = new Cookies();
    const accessToken = cookie.get("auth");
    const [myFollower, setMyFollowers] = useState();
    useEffect(() => {
        console.log({ids:currentUser.followers});
        if (!accessToken) navigate("/login");
        if (currentUser) {
            (async function () {
                await axios({
                    method: "post",
                    headers: {
                        accesstoken: accessToken,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    data:{ids:currentUser.followings},
                    url: "http://localhost:5000/users/getUsers",
                }).then((res) => {
                    let response = res.data;
                    console.log(response);
                    setMyFollowers(response);
                });
        setLoading(false)
    })();
        }
    }, []);
    return (
        <>
            <PostContainer>
                {myFollower
                    ? myFollower.length !== 0
                        ? myFollower.map((item) => {
                              return (
                                <UserCard
                                key={item._id}
                                name={item.name}
                                followId={item._id}
                                followings={item.followings}
                                ifFollow={
                                    currentUser.followings.includes(item._id)
                                        ? "Unfollow"
                                        : "Follow"
                                }
                            />
                              );
                          })
                        : "You dont have any followings yet."
                    :<MoonLoader loading={loading} />
                }
            </PostContainer>
        </>
    );
}

export default Followings;

const PostContainer=styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    gap:30px;
    margin-top: 50px;
`