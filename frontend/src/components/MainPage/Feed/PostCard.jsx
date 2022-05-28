import styled from "styled-components";
function PostCard({author, post, createdOn}) {
    return (
        <>
            <Card>
                <div className="card">
                    <div className="author-details">
                        <div className="author-img"></div>
                        <div className="author-name">{author} </div>
                        <div className="posted-time">
                            {" "}
                            {Math.floor(
                                (new Date().valueOf() - createdOn) / 60000
                            )}{" "}
                            mins ago
                        </div>
                    </div>
                    <div className="post-body">{post}</div>
                </div>
            </Card>
        </>
    );
}
export default PostCard;

const Card = styled.div`
    background-color: #fcfcfc;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    .card {
        padding: 20px;
        display: flex;
        gap:5px;
        flex-direction: column;
        .author-details{
            display: flex;
            flex-direction: row;
            gap:20px;
            align-items: center;
            justify-content: space-between;
            .author-img{
                width: 60px;
                height: 60px;
            border-radius: 50%;
                border: 1px solid rgba(0, 0, 0, 0.2);
            }
            .author-name{
                flex-grow: 2;text-transform: capitalize;
                font-weight: 700;
                color:rgba(0, 0, 0, 0.6);
            }
            .posted-time{
                align-self: flex-end;
                font-size: 12px;
                color:rgba(0, 0, 0, 0.4);
                font-weight: 500;
            }
        }
        .post-body{
            padding-left: 70px;
                color:rgba(0, 0, 0, 0.5);
            font-size: 14px;
            font-weight: 600;
        }
    }
`;
