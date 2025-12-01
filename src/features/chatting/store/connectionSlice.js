// WebSocket / STOMP 연결 & 구독 관련 상태/액션 담당

import SockJS from "sockjs-client/dist/sockjs.js";
import { Client } from "@stomp/stompjs";
import {
  WS_URL,
  TOPIC_BASE,
  REACTION_TOPIC_BASE,
} from "./constants";

export const createConnectionSlice = (set, get) => ({
  // 연결 상태
  connected: false,

  // STOMP / SockJS 관련 객체
  client: null,
  subscription: null,
  reactionSub: null,

  // 특정 방 구독 (채팅 + 리액션)
  subscribeRoom: (client, room) => {
    if (!room) return;
    const { subscription, reactionSub } = get();

    // 이전 구독 해제
    if (subscription) {
      subscription.unsubscribe();
    }
    if (reactionSub) {
      reactionSub.unsubscribe();
    }

    // ===== 채팅 구독 =====
    const destination = TOPIC_BASE + room;
    const sub = client.subscribe(destination, (message) => {
      if (!message.body) return;
      const body = JSON.parse(message.body);

      // 새 메시지 추가
      set((prev) => ({
        messages: [...prev.messages, body],
      }));

      // 해당 메시지 리액션 요약 로드
      if (body.id) {
        get().fetchReactionSummary(body.id);
      }
    });

    // ===== 리액션 구독 =====
    const reactionDestination = REACTION_TOPIC_BASE + room;
    const reactSub = client.subscribe(
      reactionDestination,
      (message) => {
        if (!message.body) return;
        const body = JSON.parse(message.body); // { messageId, likeCount, reactors }

        set((prev) => ({
          reactions: {
            ...prev.reactions,
            [body.messageId]: {
              likeCount: body.likeCount,
              reactors: body.reactors || [],
            },
          },
        }));
      }
    );

    set({ subscription: sub, reactionSub: reactSub });
  },

  // 서버에 WebSocket/STOMP 연결
  connect: () => {
    const { connected, rooms, currentRoom } = get();
    if (connected) return; // 이미 연결되어 있으면 무시

    const socket = new SockJS(WS_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log("STOMP:", str),
      onConnect: async () => {
        console.log("STOMP connected");
        set({ connected: true });

        // 사용할 방 결정 (현재 선택된 방 or 첫 번째 방)
        let roomToUse = currentRoom;
        if (!roomToUse && rooms.length > 0) {
          roomToUse = String(rooms[0].id);
          set({ currentRoom: roomToUse });
        }

        // 방이 정해져 있으면 히스토리 + 구독 진행
        if (roomToUse) {
          await get().fetchHistory(roomToUse);
          get().subscribeRoom(client, roomToUse);
        }
      },
    });

    client.activate();
    set({ client });
  },

  // WebSocket/STOMP 연결 해제
  disconnect: () => {
    const { subscription, reactionSub, client } = get();

    if (subscription) {
      subscription.unsubscribe();
    }
    if (reactionSub) {
      reactionSub.unsubscribe();
    }
    if (client) {
      client.deactivate();
    }

    set({
      connected: false,
      messages: [],
      client: null,
      subscription: null,
      reactionSub: null,
    });
  },
});
