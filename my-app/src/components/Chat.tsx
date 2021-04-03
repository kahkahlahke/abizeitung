import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import React from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { Input } from "@chakra-ui/input";
import { Box, Button, Grid, GridItem, Text, useSafeLayoutEffect } from "@chakra-ui/react";
import useChat from "../useChat";
import { useParams } from "react-router-dom";
import { meQuery } from "../fetchUtils";
import { genericPost, Student } from "../utils";
import Correspondent from "./Correspondent";
import "../chat.css"
const ENDPOINT = "http://localhost:3232";

interface Props{}

const Chat: React.FC<Props> = (props: Props) =>  {
    const {schuelerId} = useParams<{schuelerId: string}>();
    const [meId, setMeId] = useState(-1);
    const [receiverData, setReceiver] = useState<Student>(null);
    const [response, setResponse] = useState<any>("");
    const [textfield, setTextfield] = useState("");
    const {messages, sendMessage} = useChat(meId, parseInt(schuelerId))

    useEffect(() => {
        meQuery().then(data => {
            if(data.error !== null){
                setResponse("Please log in.")
                return;
            }
            setMeId(data.data._id)
        })
        fetch("/api/students/singular", {
                    // Adding method type 
            method: "POST", 
                
            // Adding body or contents to send 
            body: JSON.stringify({ 
                studentId: schuelerId
            }), 
                
            // Adding headers to the request 
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })
            .then(resp => resp.json())
            .then(data => {
                if(data.error !== null){
                    return setResponse(data.error.errorMessage);
                }
                setReceiver(data.data);
            })
  
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTextfield(e.target.value)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(textfield !== ""){
            sendMessage(textfield, meId);
            setTextfield("");
        }
    }

    return(
        <Grid placeItems="center">

            <Correspondent schueler={receiverData}></Correspondent>

            <Grid className="messages-list">
                {messages.map((message, i) => (
                    <Box
                    key={i}
                    p={4}
                    color="black"
                    className={`message-item ${
                        message.senderId === meId ? "my-message" : "received-message"
                    }`}
                    >
                    {message.senderId === meId ? "Me: " : receiverData?.name +  ": "}{message.body}
                    </Box>
                ))}
            </Grid>
            <form onSubmit={handleSubmit}>
                <Input value={textfield} onChange={handleChange}></Input>
                <Button type="submit" color="black" colorScheme="cyan">Send</Button>
            </form>
            {response}
        </Grid>
    )
}

export default Chat;