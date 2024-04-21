import React from 'react'
import Conversation from './Conversation';
import { useEffect, useState } from "react";
import axios from 'axios';
import { getRandomEmoji } from '../../utils/emojis';


const Coverstions = () => {

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/api/users');

                if (data) {
                    setConversations(data);
                } else {
                    alert("Data not found");
                }
            } catch (error) {
                console.log(error);
            }
        })()


    }, []);

    // Use useEffect to log the updated conversations state

    return (
        <div className='py-2 flex flex-col overflow-auto'>

            {conversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIndex={idx === conversations.length - 1}
                />
            ))}

        </div>
    );
}

export default Coverstions
