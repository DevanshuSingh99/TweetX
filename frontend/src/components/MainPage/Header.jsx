import {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
function Header() {
    const [activeLink, setActiveLink] = useState("");

    const linkHandeler = (link) => {
        setActiveLink(link);
    };
    return (
        <>
            <HeaderWrapper>
                <div>
                    <h1>TweetX</h1>
                    <div>
                        <Link
                            to="/feed"
                            className={
                                activeLink === "feed" ? "activeLink" : ""
                            }
                            onClick={() => linkHandeler("feed")}
                        >
                            Feed
                        </Link>
                        <Link
                            to="/users"
                            className={
                                activeLink === "users" ? "activeLink" : ""
                            }
                            onClick={() => linkHandeler("users")}
                        >
                            Users
                        </Link>
                        <Link
                            to="/profile/post"
                            className={
                                activeLink === "profile" ? "activeLink" : ""
                            }
                            onClick={() => linkHandeler("profile")}
                        >
                            Profile
                        </Link>
                    </div>
                </div>
            </HeaderWrapper>
        </>
    );
}

export default Header;

const HeaderWrapper = styled.div`
z-index: 10;
    height: 10vh;
    background-color: #fcfcfc;
    width: 100vw;
    box-shadow: 0px 1px 22px 5px  rgba(0, 0, 0, 0.13);
;
    div {
        height: 100%;
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 3vw;
        padding: 0 10vw;
        h1 {
            color: rgb(255, 116, 141);
            font-size: 38px;
        }
        div {
            display: flex;
            gap: 3vw;
            padding: 0;
            margin-right: 15vw;
            flex-direction: row;
            justify-content: space-between;
            a {
                color: #00000028;
                text-decoration: none;
                font-size: 22px;
                    position: relative;
                font-weight: 700;
                :hover {
                    ::before {
                        transform: scaleX(1);
                        transform-origin: bottom left;
                    }
                }
                ::before {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 3px;
                    bottom: 0;
                    left: 0;
                    transform: scaleX(0);
                    background-color: rgba(255, 116, 142, 0.418);
                    transition: transform 0.2s ease;
                    transform-origin: bottom left;
                }
                &.activeLink {
                    color: rgb(255, 116, 142);
                    
                }
            }
        }
    }
`;
