'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { usePathname, } from 'next/navigation';

import { ChatContext } from './chat-context';
import { MessageAdd } from './message-add';
import { MessageBox } from './message-box';
import { ThreadToolbar } from './thread-toolbar';
 import{getListChat} from '@/services/admin'
 import { WebSocketContext } from '@/contexts/WebSocketContext';
  import {getSupplier} from '@/services/supplier';


/**
 * This method is used to get the thread from the context based on the thread type and ID.
 * The thread should be loaded from the API in the page, but for the sake of simplicity we are just using the context.
 */


export function ThreadView({ threadId }) {
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
                   const userData = await getSupplier(); 
                   setUser(userData);
                }; 
                fetchUser(); 
               }, []);
    const pathname = usePathname();
     const _segments = pathname.split('/').filter(Boolean); 
     const { client } =React.useContext(WebSocketContext);
    
   
      const messagesRef = React.useRef(null);
      const [messages, setMessages] = React.useState({ contentDTOPage: { content: [] }});
      
      const fetchMessages = React.useCallback(async (_id) => {
        const response = await getListChat(threadId);
        console.log("data: ", response.data);
        setMessages(response.data);
      }, []);
      React.useEffect(() => {
        console.log("Checking messagesRef...");
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, [messagesRef]);
      
      
      React.useEffect(() => {
        console.log("Fetching messages for threadId:", threadId);
        fetchMessages(threadId); // Pass the id to fetchMessages here
      }, [fetchMessages,threadId]);
    const { createMessage, markAsRead } = React.useContext(ChatContext);

   

    

  
    const _handleThreadChange = React.useCallback(() => {
        console.log("Marking thread as read for threadId:", threadId);
        markAsRead(threadId);
    }, [threadId, markAsRead]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Prevent infinite loop
   

    const handleSendMessage =React.useCallback( 
      async (type, content) => {
         createMessage({ threadId, type, content }); 
         
         setMessages((prevState) => ({ 
          ...prevState, contentDTOPage: 
          { ...prevState.contentDTOPage, 
            content: [...prevState.contentDTOPage.content, 
              { id: Date.now(),
                 content ,userSend: user.email
                }],
               },
               })); 
              }, [threadId, createMessage] );
              React.useEffect(() => {
                const _token = sessionStorage.getItem('token'); 
                console.log("Subscribing to messages for client:", client);
                if (client) { 
                  console.log("Subscribing to messages for log:", client);
                  client.activate();
              
                  const checkConnection = () => {
                    if (client.connected) {
                      console.log("Subscribing to messages for connect:", client);
                      const subscription = client.subscribe('/user/queue/messages' ,(message) => { 
                        const receivedMessage = JSON.parse(message.body); 
                        console.log("Received message1: ", receivedMessage);
                        
                     
                          setMessages((prevState) => ({
                            ...prevState,
                            contentDTOPage: {
                              ...prevState.contentDTOPage,
                              content: [...prevState.contentDTOPage.content, receivedMessage],
                            },
                          }));
                        
                      });
              
                      return () => subscription.unsubscribe();
                    } else {
                      setTimeout(checkConnection, 1000);  // Đợi 1 giây rồi kiểm tra lại kết nối
                    }
                  };
              
                  setTimeout(checkConnection, 1000);  // Bắt đầu với lần kiểm tra đầu tiên
                }
              }, [client, threadId]);
              

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    React.useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messagesRef]);

    if (!messages) {
        return (
            <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
                <Typography color="textSecondary" variant="h6">
                    Thread not found
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
          <ThreadToolbar thread={messages} />
          <Stack ref={messagesRef} spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 3 }}>
            {messages.contentDTOPage.content.map((message) => (
              <MessageBox key={message.id} message={message} />
            ))}
          </Stack>
          <MessageAdd onSend={handleSendMessage} />
        </Box>
      );
      
    
      
}
