import Cookie from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import store from "../../../redux/store";
import {FEED_POSTS} from "../../../redux/actions";
import styled from "styled-components";
import Post from "./PostCard";
import {MoonLoader} from "react-spinners";

function Feed() {
    const cookie = new Cookie();
    const accessToken = cookie.get("auth");
    const [newPost,setNewPost]=useState()
    const [submitButtonClickable,setSubmitButtonClickable]=useState(false)
    const [posts, setPosts] = useState();
    let [loading, setLoading] = useState(true);

    const handelNewPostSubmit=async()=>{
        // if(!newPost )
        console.log("asdasd");
    }

    useEffect(() => {
        if (accessToken) {
            (async function () {
                await axios({
                    method: "get",
                    headers: {
                        accesstoken: accessToken,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    url: "http://localhost:5000/posts",
                }).then((res) => {
                    let response = res.data;
                    setPosts(response);
                    store.dispatch({
                        type: FEED_POSTS,
                        payload: response,
                    });
        setLoading(false)

                });
            })();
        }
    }, []);
    return (
        <>
            <FeedWrapper>
                <WritePost>
                    <h2>Write a post</h2>
                    <textarea
                    value={newPost}
                    onChange={(e)=>{setNewPost(e.target.value);if(e.target.value.trim().length>0){setSubmitButtonClickable(true)}else{setSubmitButtonClickable(false)}}}
                        style={{width: "100%"}}
                        placeholder="What's on your mind?"
                    ></textarea>
                    <button className={submitButtonClickable?"active":"disabled"} disabled={submitButtonClickable?false:'disabled'} onClick={handelNewPostSubmit}>Tweet</button>
                </WritePost>
                {posts ? (
                    posts.length !== 0 ? (
                        posts.map((item) => {
                            return (
                                <Post
                                    key={item._id}
                                    author={item.author.name}
                                    post={item.post}
                                    createdOn={item.createdOn}
                                />
                            );
                        })
                    ) : (
                        "Start following someone to see there posts."
                    )
                ) : (
                    <MoonLoader loading={loading} />
                )}
            </FeedWrapper>
        </>
    );
}

export default Feed;

const FeedWrapper = styled.div`
    width: 600px;
    height: 100%;
    margin: 60px;
    display: flex;
    flex-direction: column;
    gap: 5vh;
    
`;

const WritePost = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 15px;
    padding: 20px;
    background-color: #fcfcfc;
    h2 {
        font-weight: 700;
        color: rgba(0, 0, 0, 0.7);
    }
    .disabled{
        padding: 10px 15px;
        opacity: 0.4;
        width: fit-content;
        align-self: flex-end;
        border: 0;
        border-radius: 12px;
        color: black;
        font-weight: 600;
        background-color: rgb(255, 116, 141);

        transition: box-shadow 0.4s ease-out;
        
    }
    .active {
        padding: 10px 15px;
        width: fit-content;
        align-self: flex-end;
        border-radius: 12px;
        color: white;
        border: 0;
        font-weight: 600;
        box-shadow: 0 5px 15px 2px rgba(255, 116, 142, 0.473);
        background-color: rgb(255, 116, 141);
        transition: box-shadow 0.4s ease-out;
        cursor: pointer;
        :hover {
            box-shadow: 0 5px 15px 3px rgba(255, 116, 142, 0.774);
        }
    }
    textarea {
        resize: none;
        width: 10vw;
        background-color: #fcfcfc;
        min-height: 50px;
        border: 0;
        color: black;
        font-size: 14px;
        :focus {
            outline: none;
        }
    }
`;
