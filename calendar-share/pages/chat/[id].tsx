import ChatFooter from '../../src/components/ui/ChatFooter/ChatFooter';
import styles from './styles.module.css';

import {useRouter} from 'next/router';

export default function ChatPage() {
  const router = useRouter();
  const {id} = router.query;

  return (
    <div className={styles.chatRoomWrapper}>
      chat room {id}
      <ChatFooter />
    </div>
  );
}
