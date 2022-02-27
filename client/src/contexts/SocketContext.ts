import { createContext } from 'react';
import type { Socket } from 'socket.io-client';

const SocketContext = createContext<undefined | Socket>(undefined);

export default SocketContext;
