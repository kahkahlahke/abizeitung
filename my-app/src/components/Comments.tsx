import { Tr } from "@chakra-ui/table";
import { Text } from "@chakra-ui/react";
import React from "react";

interface Props{
    content: string;
    user: string;
}

const Comment: React.FC<Props> = (props: Props) => {
    return(
        <Tr>
            <Text marginBottom="1em" style={{fontFamily: "cursive"}}>"{props.content}"</Text>
            <Text marginBottom="2em">- {props.user}</Text>
        </Tr>
    )
}

export default Comment;