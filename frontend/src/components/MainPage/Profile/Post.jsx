import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {LOG_IN, MY_POSTS} from "../../../redux/actions";
import store from "../../../redux/store";
import PostCard from "../Feed/PostCard";
import {MoonLoader} from "react-spinners";
import styled from 'styled-components'

function Post() {
    const navigate = useNavigate();
    const cookie = new Cookies();
    let [loading, setLoading] = useState(true);
    const accessToken = cookie.get("auth");
    const [myPost, setMyPost] = useState();
    useEffect(() => {
        if (!accessToken) navigate("/login");
        if (accessToken) {
            (async function () {
                await axios({
                    method: "get",
                    headers: {
                        accesstoken: accessToken,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    url: "http://localhost:5000/posts/myposts",
                }).then((res) => {
                    let response = res.data;
                    setMyPost(response);
                    store.dispatch({
                        type: MY_POSTS,
                        payload: response,
                    });
        setLoading(false)
    });
            })();
        }
    }, []);
    return (
        <>
            <PostContainer>
                {myPost
                    ? myPost.length !== 0
                        ? myPost.map((item) => {
                              return (
                                  <PostCard
                                      key={item._id}
                                      author={item.author.name}
                                      post={item.post}
                                      createdOn={item.createdOn}
                                  />
                              );
                          })
                        : "You dont have any posts yet.."
                    :                     <MoonLoader loading={loading} />
                }
            </PostContainer>
        </>
    );
}

export default Post;

const PostContainer=styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    gap:30px;
    margin-top: 50px;
`