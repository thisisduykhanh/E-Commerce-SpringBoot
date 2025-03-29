'use client';

import * as React from 'react';
import { WebSocketContext } from '@/contexts/WebSocketContext';
import { getChat } from '@/services/admin';
import { getUser } from '@/services/auth';

function noop() {
    return undefined;
}

export const ChatContext = React.createContext({
    groupChat: [],
    messages: new Map(),
    createThread: noop,
    markAsRead: noop,
    createMessage: noop,
    openDesktopSidebar: true,
    setOpenDesktopSidebar: noop,
    openMobileSidebar: true,
    setOpenMobileSidebar: noop,
});

export function ChatProvider({
    children,
    groupChat: initialLabels = [],
    messages: initialMessages = [],
}) {
    const [user, setUser] = React.useState({
        id: '',
        nameSupply: '',
        status: false,
        address: '',
        image: '',
        nameDelivery: [],
        nameProductType: [],
        email: '',
        phone: '',
        block: false,
        createDate: '',
        supplierStatus: ''
    });
    
    
    
       /*  const { client } = React.useContext(WebSocketContext); */
         React.useEffect(() => { const fetchUser = async () => { 
               const userData = await getUser(); 
               setUser(userData.data);
            }; 
            fetchUser(); 
           }, []);
   /*  const { client } = React.useContext(WebSocketContext); */
    const [contacts, setContacts] = React.useState([]);
    const [groupChat, setGroupChat] = React.useState([]);
    const [groupChatState, setGroupChatState] = React.useState(groupChat);
    const [messages, setMessages] = React.useState(new Map());
    const [openDesktopSidebar, setOpenDesktopSidebar] = React.useState(true);
    const [openMobileSidebar, setOpenMobileSidebar] = React.useState(false);
    const { client } = React.useContext(WebSocketContext);

  /*   React.useEffect(() => {
        setContacts(initialContacts);
    }, [initialContacts]); */

    React.useEffect(() => {
        console.log("client23: ", client);
        setGroupChat(initialLabels);
    }, [initialLabels]);
    const fetchGroupChat = React.useCallback(async () => { 
        const response = await getChat(); 
        console.log("data: ", response.data); 
        setGroupChat(response.data); 
    }, []);

    React.useEffect(() => {
        setMessages(
            initialMessages.reduce((acc, curr) => {
                const byThread = acc.get(curr.threadId) ?? [];
                // We unshift the message to ensure the messages are sorted by date
                byThread.unshift(curr);
                acc.set(curr.threadId, byThread);
                return acc;
            }, new Map())
        );
    }, [initialMessages]);
    React.useEffect(() => {
        const token = sessionStorage.getItem('token'); 
        console.log("Subscribing to messages for client:", client);
        if (client) { 
            console.log("Subscribing to messages for log:", client);
            client.activate();
        
            const checkConnection = () => {
                if (client.connected) {
                    console.log("Subscribing to messages for connect:", client);
                    const subscription = client.subscribe('/user/queue/messages', (message) => { 
                        const receivedMessage = JSON.parse(message.body); 
                        console.log("Received message: ", receivedMessage);
    
                        // Gọi hàm fetch để lấy dữ liệu mới nhất
                        fetchGroupChat();
                    });
                    console.log("Subscription details:", subscription);
    
                    return () => subscription.unsubscribe();
                } else {
                    setTimeout(checkConnection, 1000);  // Đợi 1 giây rồi kiểm tra lại kết nối
                }
            };
        
            setTimeout(checkConnection, 1000);  // Bắt đầu với lần kiểm tra đầu tiên
        }
    }, [client, fetchGroupChat]);
    


    const handleCreateMessage = React.useCallback(
        async (params) => { 
            const token = sessionStorage.getItem('token'); 
            if (client) { 
                client.publish({ 
                    destination: '/app/chat.send', 
                    body: JSON.stringify({ 
                        message: { 
                            content: params.content, 
                            idGroup: params.threadId, 
                            userSend: user.email, 
                            token: token, 
                        }, }),
                     }); 
                     console.log('Message sent:', params.content); 
                     fetchGroupChat();}
                    },
        [messages, fetchGroupChat, client] 
    );

    return (
        <ChatContext.Provider
            value={{
                groupChat,
                messages,
             
                createMessage: handleCreateMessage,
                openDesktopSidebar,
                setOpenDesktopSidebar,
                openMobileSidebar,
                setOpenMobileSidebar,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}
