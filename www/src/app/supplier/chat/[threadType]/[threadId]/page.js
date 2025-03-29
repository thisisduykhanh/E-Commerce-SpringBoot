import { config } from '@/config';
import { ThreadView } from '@/components/Supplier/chat/thread-view';
import { WebSocketProvider } from '@/contexts/WebSocketContext';


export const metadata = { title: `Thread | Chat | Dashboard | ${config.site.name}` };

export default function Page({ params }) {
    const { threadId, threadType } = params;

    return (
         <WebSocketProvider>
    <ThreadView threadId={threadId} threadType={threadType} />
    </WebSocketProvider>
    );
}
