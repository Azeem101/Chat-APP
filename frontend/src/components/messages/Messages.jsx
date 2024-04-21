import MessageSkeleton from "../skeletons/MessageSkeleton";
import axios from "axios";
import useConversation from "../../zustand/useConversation";
import Message from "./Message";
import { useEffect, useState, useRef } from "react";
import { useSocketContext } from "../../context/SocketContext";

const Messages = () => {
    const { messages, setMessages, selectedConversation } = useConversation();
    const [loading, setLoading] = useState(false);
    const lastMessageRef = useRef(null); // Define a ref for the last message

    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/message/${selectedConversation._id}`);
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    const { socket } = useSocketContext();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            // const sound = new Audio(notificationSound);
            // sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message, index) => (
                    <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center' style={{ color: 'white' }}>
                    Send a message to start the conversation
                </p>
            )}
        </div>
    );
};

export default Messages;
