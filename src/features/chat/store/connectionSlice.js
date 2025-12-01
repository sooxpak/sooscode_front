import SockJS from "sockjs-client/dist/sockjs.js";
import { Client } from "@stomp/stompjs";
import { WS_URL, TOPIC_BASE, REACTION_TOPIC_BASE } from "./constants";

export const createConnectionSlice = (set, get) => ({
  // 연결 상태
  connected: false,

  // STOMP / SockJS 관련 객체
  client: null,
  subscription: null,
  reactionSub: null,

  /**
   * ✅ 특정 수업(classId)에 대한 채팅 + 리액션 구독
   *   - classId는 문자열/숫자 아무거나, 그대로 토픽에 붙임
   *   - 백엔드에서 "/topic/chat/{classId}" 로 브로드캐스트한다고 가정
   */
  subscribeRoom: (client, classId) => {
    if (!classId) return;
    const { subscription, reactionSub } = get();

    // 이전 구독 해제
    if (subscription) subscription.unsubscribe();
    if (reactionSub) reactionSub.unsubscribe();

    // ===== 채팅 구독 =====
    const destination = TOPIC_BASE + classId; // 예: "/topic/chat/" + classId
    const sub = client.subscribe(destination, (message) => {
      if (!message.body) return;
      const body = JSON.parse(message.body);
      // body: { chatId, content, createdAt, ... }

      set((prev) => ({
        messages: [...prev.messages, body],
      }));

      // 해당 메시지 리액션 요약 로드 (chatId 기준)
      if (body.chatId) {
        get().fetchReactionSummary(body.chatId);
      }
    });

    // ===== 리액션 구독 =====
    const reactionDestination = REACTION_TOPIC_BASE + classId;
    const reactSub = client.subscribe(reactionDestination, (message) => {
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
    });

    set({ subscription: sub, reactionSub: reactSub });
  },

  /**
   * ✅ 서버에 WebSocket/STOMP 연결
   *   - 로그인 여부 상관없이 바로 연결 시도
   *   - currentClassId가 세팅돼 있으면, 연결되자마자 그 수업 히스토리 + 구독
   */
  connect: () => {
    const { connected, currentClassId } = get();
    if (connected) return; // 이미 연결되어 있으면 무시

    const socket = new SockJS(WS_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log("STOMP:", str),
      onConnect: async () => {
        console.log("STOMP connected");
        set({ connected: true });

        // 현재 수업 ID가 있다면 그 수업의 히스토리 + 구독
        if (currentClassId) {
          await get().fetchHistory(currentClassId);
          get().subscribeRoom(client, currentClassId);
        }
      },
    });

    client.activate();
    set({ client });
  },

  /**
   * ✅ WebSocket/STOMP 연결 해제
   */
  disconnect: () => {
    const { subscription, reactionSub, client } = get();

    if (subscription) subscription.unsubscribe();
    if (reactionSub) reactionSub.unsubscribe();
    if (client) client.deactivate();

    set({
      connected: false,
      messages: [],
      client: null,
      subscription: null,
      reactionSub: null,
    });
  },
});
