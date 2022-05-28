import {Outlet, useNavigate} from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import store from "../../redux/store";
import { LOG_IN } from "../../redux/actions";
import Cookies from "universal-cookie";
function Home() {
    const navigate =useNavigate();
    const cookie = new Cookies();
    const accessToken = cookie.get("auth");
    useEffect(()=>{
        if (!accessToken) navigate("/login");
        if (accessToken) {
            (async function () {
                await axios({
                    method: "post",
                    headers: {
                        accesstoken: accessToken,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    url: "http://localhost:5000/users/login",
                }).then((res) => {
                    let response = res.data;
                    if (response.message === "Invalid credentials.") {
                    } else if (response.message === "Authenticated") {
                        store.dispatch({
                            type: LOG_IN,
                            payload: response.user,
                        });
                    }
                });
            })();
        }
    },[])
    return (
        <>
            <HomeWrapper>
                <Header />
                <Outlet />
            </HomeWrapper>
        </>
    );
}

export default Home;
const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    background-color: #f5f5f5;
    align-items: center;
    min-height: 100vh;
`;
