import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import Cookies from "universal-cookie";
import {ALL_USERS} from "../../../redux/actions";
import store from "../../../redux/store";
import {MoonLoader} from "react-spinners";
import UserCard from "./UserCard";
function Users() {
    const currentUser = useSelector((state) => state.userResponse.user);
    const cookie = new Cookies();
    const accessToken = cookie.get("auth");
    let [loading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    useEffect(() => {
        if (accessToken) {
            (async function () {
                await axios({
                    method: "post",
                    headers: {
                        accesstoken: accessToken,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    url: "http://localhost:5000/users/getUsers",
                }).then((res) => {
                    let response = res.data;
                    setUsers(response);
                    store.dispatch({
                        type: ALL_USERS,
                        payload: response,
                    });
        setLoading(false)
    });
            })();
        }
    }, []);
    return (
        <>
            <UserWrapper>
                {users
                    ? users.length!==0?users.map((item) => {
                          return item._id === currentUser._id ? null : (
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
                    : "No data":<MoonLoader loading={loading} />}
            </UserWrapper>
        </>
    );
}
export default Users;

const UserWrapper = styled.div`
    margin: 60px;
    min-width: 30%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
