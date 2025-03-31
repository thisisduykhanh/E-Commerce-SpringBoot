'use client';
import { ChatProvider } from '@/components/Supplier/chat/chat-context';
import { ChatView } from '@/components/Supplier/chat/chat-view';
import{getChat} from '@/services/admin'
import * as React from 'react';
import { WebSocketProvider } from '@/contexts/WebSocketContext';



export default function Layout({ children }) {
    const [groupChat, setGroupChat] = React.useState([]);
 const fetchGroupChat = React.useCallback(async () => {
    const response = await getChat();
    console.log("data: ", response.data);
    setGroupChat(response.data);
  
  }, []);

  React.useEffect(() => {
    fetchGroupChat();
  }, [fetchGroupChat]);
    return (
        <WebSocketProvider>
        <ChatProvider groupChat={groupChat} >
            <ChatView>{children}</ChatView>
        </ChatProvider>
        </WebSocketProvider>
    );
}
