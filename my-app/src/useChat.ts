import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:3232";

const useChat = (receiverId: number, authorId: number) => {
  const [messages, setMessages] = useState<Array<{body: string, senderId: number}>>([]); // Sent and received messages
  const socketRef = useRef<Socket>();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { "receiverId": receiverId.toString(), "authorId": authorId.toString() },
    });
    
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, msg => {
        setMessages(messages => [...messages, msg])
    })
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current?.disconnect();
    };
  }, [receiverId, authorId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody: string, senderId: number) => {
    socketRef.current?.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId
    });
  };

  return { messages, sendMessage };
};

export default useChat;