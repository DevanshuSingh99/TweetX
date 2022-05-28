import {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import pablo from "../assets/images/pablo-sign-in.png";
import validator from "validator";
import axios from "axios";
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState({
        message: "",
        class: "",
    });
    const [userDetailsError, setUserDetailsError] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    function validate() {
        let error = 0;
        let errorMessage = {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
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
        if (
            !validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 0,
            })
        ) {
            errorMessage = {
                ...errorMessage,
                password: "Please should be minimun length of 8 charecters",
            };
            error++;
        } else {
            errorMessage = {...errorMessage, password: ""};
        }
        if (password !== confirmPassword) {
            errorMessage = {
                ...errorMessage,
                confirmPassword: "Password does not match the above password",
            };

            error++;
        }
        if (!name.trim()) {
            errorMessage = {
                ...errorMessage,
                name: "Please enter your full name",
            };

            error++;
        } else {
            errorMessage = {...errorMessage, name: ""};
        }

        if (error) {
            setUserDetailsError(errorMessage);
            return 0;
        }
        return 1;
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            let userData = {name, email, password};
            try {
                await axios({
                    method: "post",
                    url: "http://localhost:5000/users",
                    data: userData,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }).then((res) => {
                    let response = res.data;
                    if (response.message === "Registered") {
                        console.log("aa");
                        setRegistrationStatus({
                            class: "success",
                            message: "User registered. You can login now.",
                        });
                    } else if (
                        response.message === "error" &&
                        response.error.code === 11000
                    ) {
                        console.log("bb");
                        setRegistrationStatus({
                            class: "failed",
                            message: `Can not register, ${
                                Object.keys(response.error.keyPattern)[0]
                            } already exists.`,
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
                <RegistrationContainer>
                    <Title>
                        <h1>TweetX</h1>
                        <Link to="/login">Login</Link>
                    </Title>
                    <Form onSubmit={handelSubmit}>
                        <h1>Create Account</h1>
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <p className="error">{userDetailsError.name}</p>
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <p className="error">{userDetailsError.email}</p>
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <p className="error">
                                {userDetailsError.password}
                            </p>
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                            <p className="error">
                                {userDetailsError.confirmPassword}
                            </p>
                        </div>
                        <Button>
                            <button type="submit">Sign up</button>
                        </Button>
                        <div>
                            <p
                                className={
                                    registrationStatus.class === "success"
                                        ? "success regMsg"
                                        : "error regMsg"
                                }
                            >
                                {registrationStatus.message}
                            </p>
                        </div>
                    </Form>
                </RegistrationContainer>
            </Wrapper>
        </>
    );
}

export default Register;

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
const RegistrationContainer = styled.div`
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
    div {
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
    justify-content: flex-end ;
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