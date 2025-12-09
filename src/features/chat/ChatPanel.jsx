// src/features/chat/ChatSidebar.jsx
import React, { useEffect, useRef, useState } from "react";
import "./ChatPanel.css";
import useSocket from "@/features/classroom/hooks/useSocket.js";

export default function ChatPanel({ classId = 1 }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [myEmail, setMyEmail] = useState(null);

    const bottomRef = useRef(null);
    const prevLengthRef = useRef(0); // ✅ 새 메시지일 때만 스크롤용

    // ✅ WebSocket / STOMP
    const { connected, error, subscribe, publish } = useSocket(classId);

    // ✅ 내 정보 가져오기
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) {
                    console.error("/api/auth/me 요청 실패:", res.status);
                    return;
                }

                const data = await res.json();
                setMyEmail(data.user.email || null);
            } catch (e) {
                console.error("/api/auth/me 요청 에러:", e);
            }
        };

        fetchMe();
    }, []);

    // ✅ 히스토리 불러오기
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/chat/history?classId=${classId}`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    }
                );

                if (!res.ok) {
                    console.error("채팅 히스토리 요청 실패:", res.status);
                    setMessages([]);
                    return;
                }

                const data = await res.json();
                setMessages(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error("히스토리 요청 에러:", e);
                setMessages([]);
            }
        };

        fetchHistory();
    }, [classId]);

    // ✅ ✅ ✅ WebSocket 수신 (공감 + 일반 메시지 분기 핵심)
    useEffect(() => {
        if (!connected) return;

        const subscription = subscribe(`/topic/chat/${classId}`, (body) => {
            console.log("📡 WebSocket 수신:", body);

            // ✅ 1️⃣ 공감 브로드캐스트인 경우
            if (body.chatId && typeof body.reactionCount === "number") {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.chatId === body.chatId
                            ? { ...msg, reactionCount: body.reactionCount }
                            : msg
                    )
                );
                return;
            }

            // ✅ 2️⃣ 일반 채팅 메시지인 경우만 추가
            setMessages((prev) => [...prev, body]);
        });

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [connected, subscribe, classId]);

    // ✅ ✅ ✅ 자동 스크롤 (새 메시지일 때만)
    useEffect(() => {
        if (messages.length > prevLengthRef.current) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        prevLengthRef.current = messages.length;
    }, [messages]);

    // ✅ 메시지 전송
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        if (!connected) {
            console.warn("웹소켓 연결 안 됨, 메시지 전송 불가");
            return;
        }

        const payload = {
            classId,
            content: inputValue,
            createdAt: new Date().toISOString(),
        };

        publish(`/app/chat/${classId}`, payload);
        setInputValue("");
    };

    // ✅ ✅ ✅ 공감 전송 (이제 UI 직접 set 안 함 — WebSocket으로만 반영)
    const sendReaction = async (chatId) => {
        if (!chatId) {
            console.error("chatId 없음, 공감 전송 불가");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/chat/chat.react", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatId }),
            });

            if (!res.ok) {
                console.error("공감 요청 실패:", res.status);
            }

            // ✅ 여기서 setMessages 하지 않음 ❗
            // ✅ 서버가 WebSocket으로 반영해줌
        } catch (e) {
            console.error("공감 요청 에러:", e);
        }
    };

    // ✅ 날짜 + AM/PM 시간 포맷 (MM-DD AM 3:21)
    const formatDateTime = (iso) => {
        if (!iso) return "";

        const date = new Date(iso);

        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12; // 0 → 12

        return `${month}-${day} ${ampm} ${hours}:${minutes}`;
    };

    return (
        <aside className="chat-sidebar">
            <div className="chat-sidebar__header">
                <div className="chat-sidebar__title">
                    채팅 (classId: {classId})
                </div>
                <div
                    className={connected ? "chat-status online" : "chat-status offline"}
                />
            </div>

            {error && <div className="chat-error">{error}</div>}

            <div className="chat-sidebar__messages">
                {Array.isArray(messages) &&
                    messages.map((msg, idx) => {
                        const mine =
                            msg.email  === myEmail;

                        const created = msg.created_at || msg.createdAt || null;

                        const formattedDateTime = created
                            ? formatDateTime(created)
                            : "";
                        console.log(formattedDateTime)

                        return (
                            <React.Fragment key={idx}>

                                    <div className="chat-date-divider">
                                        {formattedDateTime}
                                    </div>


                                <div
                                    className={`chat-bubble ${mine ? "mine" : "other"}`}
                                >
                                    {!mine && (
                                        <div className="chat-username">
                                            {msg.name}
                                        </div>
                                    )}

                                    <div className="chat-content">{msg.content}</div>

                                    <div className="chat-actions">
                                        <button
                                            type="button"
                                            className="chat-react-btn"
                                            onClick={() => sendReaction(msg.chatId)}
                                        >
                                            ✅
                                        </button>
                                        <span className="chat-react-count">
                                            {msg.reactionCount ?? 0}
                                        </span>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                <div ref={bottomRef} />
            </div>

            <form className="chat-sidebar__input" onSubmit={handleSubmit}>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="메시지 입력..."
                />
                <button type="submit">전송</button>
            </form>
        </aside>
    );
}
