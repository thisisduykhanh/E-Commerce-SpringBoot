'use client';

import * as React from 'react';
import { WebSocketContext } from '@/contexts/WebSocketContext';
import{getChat} from '@/services/admin'

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
   /*  const { client } = React.useContext(WebSocketContext); */

    const [_contacts, _setContacts] = React.useState([]);
        const [groupChat, setGroupChat] = React.useState([]);
        const [_groupChatState, _setGroupChatState] = React.useState(groupChat);

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
        const _token = sessionStorage.getItem('token'); 
        console.log("Subscribing to messages for client:", client);
        if (client) { 
            console.log("Subscribing to messages for log:", client);
            client.activate();
        
            const checkConnection = () => {
                if (client.connected) {
                    console.log("Subscribing to messages for connect:", client);
                    const subscription = client.subscribe('/queue/messages/admin@farm.com', (message) => { 
                        const receivedMessage = JSON.parse(message.body); 
                        console.log("Received message: ", receivedMessage);
    
                        // Gọi hàm fetch để lấy dữ liệu mới nhất
                        fetchGroupChat();
                    });
    
                    return () => subscription.unsubscribe();
                } else {
                    setTimeout(checkConnection, 1000);  // Đợi 1 giây rồi kiểm tra lại kết nối
                }
            };
        
            setTimeout(checkConnection, 1000);  // Bắt đầu với lần kiểm tra đầu tiên
        }
    }, [client, fetchGroupChat]);
    

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
                            userSend: 'admin@farm.com', 
                            token: token, 
                        }, }),
                     }); 
                     console.log('Message sent:', params.content + ' ' + params.threadId);
                     fetchGroupChat(); }
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
