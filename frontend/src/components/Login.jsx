import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import validator from "validator";
import styled from "styled-components";
import pablo from "../assets/images/pablo-sign-in.png";
import store from '../redux/store'
import axios from "axios";
import {LOG_IN, RESET} from '../redux/actions'
import {useNavigate} from "react-router-dom";
import Cookie from 'universal-cookie'
import { useDispatch } from "react-redux";
function Login() {
    const cookie = new Cookie()
    const navigate =useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState({
        message: "",
        class: "",
    });
    const [userDetailsError, setUserDetailsError] = useState({
        email: "",
        password: "",
    });
    useEffect(()=>{
        cookie.remove('auth')
        store.dispatch({type: RESET});

    },[])
    function validate() {
        let error = 0;
        let errorMessage = {
            email: "",
            password: "",
        };
        if (!validator.isEmail(email)) {
            errorMessage = {
                ...errorMessage,
                email: "Enter valid email address",
            };
            error++;
        } else {
            errorMessage = {...errorMessage, email: ""};
        }
        if (!password.trim()) {
            errorMessage = {
                ...errorMessage,
                password: "Enter a password",
            };
            error++;
        } else {
            errorMessage = {...errorMessage, password: ""};
        }
        setUserDetailsError(errorMessage);
        if (error) {
            return 0;
        }
        return 1;
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        if(validate()){
            let userData = { email, password};
            try {
                await axios({
                    method: "post",
                    url: "http://localhost:5000/users/login",
                    data: userData,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }).then((res) => {
                    let response = res.data;
                    if (response.message === "Authenticated") {
                        console.log("ad");
                        cookie.set('auth', response.accessToken)
                        store.dispatch({
                            type: LOG_IN,
                            payload: response.user,
                        });
                        
                        navigate('/feed')

                    } else if (
                        response.message === "Invalid credentials."
                    ) {
                        console.log("bb");
                        setLoginStatus({
                            class: "failed",
                            message: `Invalid credentials.`,
                        });
                    }
                });
            } catch (error) {}
        }
    };
    return (
        <>
            <Wrapper>
                <Img src={pablo} />
                <LoginContainer>
                    <Title>
                        <h1>TweetX</h1>
                        <Link to="/register">Create Account</Link>
                    </Title>
                    <Form onSubmit={handelSubmit}>
                        <h1>Login</h1>
                        <div>
                            <input
                                placeholder="Email"
                                avlue={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className="error">{userDetailsError.email}</p>
                        </div>
                        <div>
                            <input
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="error">{userDetailsError.password}</p>
                        </div>
                        <Button>
                            <p>Forgot Password?</p>
                            <button type="submit">Login</button>
                        </Button>
                        <div>
                            <p
                                className={
                                    loginStatus.class === "success"
                                        ? "success regMsg"
                                        : "error regMsg"
                                }
                            >
                                {loginStatus.message}
                            </p>
                        </div>
                    </Form>
                </LoginContainer>
            </Wrapper>
        </>
    );
}

export default Login;

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`;
const Img = styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    height: 60%;
    z-index: -1;
`;
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 80px;
    width: 25%;
    height: 90vh;
    padding: 70px 0 0 70px;
`;
const Title = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    h1 {
        color: rgb(255, 116, 141);
        font-weight: 700;
    }
    a {
        padding: 12px 60px;
        border: 1px solid rgba(0, 0, 0, 0.384);
        border-radius: 15px;
        cursor: pointer;
        text-align: center;
        width: fit-content;
        text-decoration: none;
        color: black;
        font-weight: bold;
    }
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    h1 {
        margin-bottom: 30px;
        color: rgb(93, 103, 110);
        font-weight: 700;
    }
    div{
        display: flex;
        flex-direction: column;
        input {
            padding: 20px;
            background-color: rgb(249, 249, 249);
            border: 0;
            border-radius: 8px;
            :focus {
                outline: none;
            }
        }
        .error {
            color: red;
            font-size: 13px;
            font-weight: 500;
        }
        .regMsg{
            font-size: 14px;
            font-weight: 500;
            text-align: center;
        }
        .success {
            color: green;
            
        }

    }
    
`;

const Button = styled.div`
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between;
    align-items: center;
    p {
            font-weight: 600;
            font-size: 14px;
            color: rgb(104, 104, 104);
        }
    button {
        padding: 15px 30px;
        border: 0;
        background-color: rgb(255, 116, 141);
        width: fit-content;
        color: white;
        font-weight: bold;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
        border-radius: 8px;
    }
`;
