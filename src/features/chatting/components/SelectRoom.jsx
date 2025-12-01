import useChatStore from "../store/chatStore";

function SelectRoom() {

  const rooms = useChatStore((s) => s.rooms);
  const currentRoom = useChatStore((s) => s.currentRoom);
  const changeRoom = useChatStore((s) => s.changeRoom);
  const nickname = useChatStore((s) => s.nickname);

  return (
    <>
      {/* 방 선택 영역 */}
      <div className="room-row">
        {rooms.map((room) => (
          <button
            key={room.id}
            type="button"
            className={
              String(room.id) === currentRoom ? "room-btn active" : "room-btn"
            }
            onClick={() => changeRoom(room.id)}
          >
            {room.id}번 방
          </button>
        ))}
      </div>

      {/* 닉네임 표시 영역 */}
      <div className="nickname-row">
        <label>닉네임</label>
        <input value={nickname} readOnly disabled />
      </div>
    </>
  );
}

export default SelectRoom;
