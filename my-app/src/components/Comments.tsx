import React from "react";

interface Props{
    content: string;
    user: string;
}

const Comment: React.FC<Props> = (props: Props) => {
    return(
        <tr>
            <p style={{fontFamily: "cursive"}}>"{props.content}"</p>
            <p>- {props.user}</p>
        </tr>
    )
}

export default Comment;