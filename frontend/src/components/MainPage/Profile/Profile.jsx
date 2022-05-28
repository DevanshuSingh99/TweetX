import { useState } from "react";
import {useSelector} from "react-redux";
import {Link, Outlet} from "react-router-dom";
import styled from "styled-components";

function Profile() {
    const currentUser = useSelector((state) => state.userResponse.user);
    const [activeTab,setActiveTab]=useState("post");
    const tabHandler =(e)=>{
        setActiveTab(e)
    }
    return (
        <>
            <ProfileWrapper>
                <UserProfile>
                    <div className="user-img"></div>
                    <div className="user-details">
                        <div className="user-name">{currentUser.name}</div>
                        <div className="user-other-details">
                            <ul>
                                <li>Posts : {currentUser.posts.length}</li>
                                <li>
                                    Followers : {currentUser.followers.length}
                                </li>
                                <li>
                                    Followings : {currentUser.followings.length}
                                </li>
                            </ul>
                        </div>
                    </div>
                </UserProfile>
                {/* <hr /> */}
                <Tabs>
                    <ul>
                        <li>
                            <Link to="/profile/post" className={activeTab==="post"?"activeTab":""} onClick={()=>tabHandler("post")}>Post</Link>
                        </li>
                        <li>
                            <Link to="/profile/followers" className={activeTab==="follower"?"activeTab":""} onClick={()=>tabHandler("follower")}>Followers</Link>
                        </li>
                        <li>
                            <Link to="/profile/followings" className={activeTab==="followings"?"activeTab":""} onClick={()=>tabHandler("followings")}>Followings</Link>
                        </li>
                    </ul>
                </Tabs>
            </ProfileWrapper>
            <Outlet />
        </>
    );
}
export default Profile;

const ProfileWrapper = styled.div`
    margin-top: 50px;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    hr {
        margin-top: 20px;
        width: 80%;
        border: 1px solid gray;
    }
`;
const UserProfile = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
    width: 80%;
    padding: 20px;
    justify-content: space-between;
    .user-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .user-details {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-self: center;
        .user-name {
            text-transform: capitalize;
            font-weight: 700;
            font-size: 18px;
            color: #0000008f;
        }
    }
    .user-other-details {
        ul {
            display: flex;
            flex-direction: row;
            list-style: none;
            justify-content: space-between;
            li {
                font-weight: 600;
                color: #00000078;
                font-size: 12px;
            }
        }
    }
`;
const Tabs = styled.div`
    position: relative;
    width: 80%;
    :before {
        content: "";
        top: -40%;
        background-color: #0000006e;
        width: 100%;
        height: 2px;
        position: absolute;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 50px;
        li {
            .activeTab{
                color: #0000008f;
                    :before{
                    transform: scale(1);

                    }
            }
            position: relative;
            a {
                text-decoration: none;
                color: #00000057;
                font-weight: 600;
                :hover{
                color: #0000008f;
                    :before{
                    transform: scale(1);
                    background-color: #00000086;

                    }
                }
                .activeTab{
                color: #0000008f;
                    :before{
                    transform: scale(1);

                    }
                }
                :before{
                    content: "";
                    height: 3px;
                    position: absolute;
                    width: 100%;
                    background-color: black;
                    top:-40%;
                    transform: scale(0);
                    transition: transform 0.3s ease;

                }
            }
        }
    }
`;
