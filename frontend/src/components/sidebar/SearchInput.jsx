import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import axios from 'axios';

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('/api/users');
                if (data) {
                    setConversations(data);
                } else {
                    alert("Data not found");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) alert("search someone");
        else if (search.length < 3) {
            return alert("Search term must be at least 3 characters long");
        }

        const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            alert("No such user found!");  // You can use toast for better user experience
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <input
                type='text'
                placeholder='Search…'
                className='input input-bordered rounded-full'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
        </form>
    );
};

export default SearchInput;
