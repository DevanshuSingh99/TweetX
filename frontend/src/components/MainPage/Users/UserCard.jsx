import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import { USER_FOLLOW, USER_UNFOLLOW } from "../../../redux/actions";
import store from "../../../redux/store";
function UserCard(prop) {
    const cookie = new Cookies();
    const accessToken = cookie.get("auth");
    const handelFollow = async (id) => {
        await axios({
            method: "post",
            headers: {
                accesstoken: accessToken,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data:{followee:id},
            url: "http://localhost:5000/users/follow",
        }).then((res) => {
            let response = res.data;
            store.dispatch({
                type: USER_FOLLOW,
                payload: response,
            });
        });
    };
    const handelUnfollow = async (id) => {
        await axios({
        method: "post",
        headers: {
            accesstoken: accessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data:{followee:id},
        url: "http://localhost:5000/users/unfollow",
    }).then((res) => {
        let response = res.data;
        store.dispatch({
            type: USER_UNFOLLOW,
            payload: response,
        });
    });};
    return (
        <>
            <Card>
                <div className="user-img"></div>
                <div className="user">
                    <div className="user-name">{prop.name}</div>
                    <div className="user-followings">
                        Followings : {prop.followings.length}
                    </div>
                </div>
                {prop.ifFollow === "Follow" ? (
                    <button
                        className="follow"
                        onClick={() => handelFollow(prop.followId)}
                    >
                        {prop.ifFollow}
                    </button>
                ) : (
                    <button
                        className="unfollow"
                        onClick={() => handelUnfollow(prop.followId)}
                    >
                        {prop.ifFollow}
                    </button>
                )}
            </Card>
            <Hr />
        </>
    );
}
export default UserCard;
const Hr = styled.hr`
    border: 1px solid #0000001f;
    background-color: #0000001f;
`;
const Card = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    align-items: center;
    .user-img {
        width: 70px;
        height: 70px;
        border: 1px solid #00000078;
        border-radius: 50%;
    }
    .user {
        flex: 2;
        .user-name {
            text-transform: capitalize;
            font-size: 16px;
            font-weight: 700;
            color: #0000009d;
        }
        .user-followings {
            font-size: 12px;
            font-weight: 600;
            color: #00000057;
        }
    }
    button {
        padding: 10px 25px;
        font-weight: 600;
        cursor: pointer;
    }
    .follow {
        border: 0;
        background-color: rgb(255, 116, 141);
        border-radius: 10px;
        color: white;
    }
    .unfollow {
        border: 1px solid #0000002f;
        border-radius: 10px;
        color: #0000006e;
    }
`;
