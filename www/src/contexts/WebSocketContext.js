// src/contexts/WebSocketContext.js
'use client';
import React, { createContext, useEffect, } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
 
  const clientRef =React.useRef(null); 
  const [client, setClient] = React.useState(null);
  

  React.useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log("token: ", token);
    const newClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/api/v1/ws'),
      connectHeaders: { Authorization: `Bearer ${token}`, },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        console.log("token: ", token);
          console.log("client1: ", newClient);
          console.log("Connect frame headers: ", frame.headers);

         
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    newClient.activate();
    console.log("client1: ", newClient);
    clientRef.current = newClient;
    setClient(newClient);
    return () => {
      newClient.deactivate();
    };
  }, []);
 
  

  return (
    <WebSocketContext.Provider value={{ client }}>
      {children}
    </WebSocketContext.Provider>
  );
};
