import React, { useState } from 'react';
import '../css/waitingroom.css'

const WaitingRoom = () => {
  // Mock data for live rooms
  const [rooms, setRooms] = useState([
    { id: 1, players: ['Player 1', 'Player 2', 'Player 3', 'Player 4'] },
    { id: 2, players: ['Player 5'] },
    { id: 3, players: [] },
  ]);

  const handleJoinRoom = roomId => {
    // Logic to join the room
    console.log(`Joined room ${roomId}`);
  };

  return (
    <div className="waitingRoomContainer">
    <h2>Waiting Room</h2>
    <div className="roomWrapper">
      {rooms.map(room => (
        <div key={room.id} className="roomContainer">
          <div className="room">
            <h3>Room {room.id}</h3>
            {room.players.length < 1 ? (
              <p>Waiting for players...</p>
            ) : (
              <p>Players in the room: {room.players.join(', ')}</p>
            )}
          </div>
          <div className="roomActions">
            <button class="multiplayerButton" onClick={() => handleJoinRoom(room.id)}>Join</button>
            {room.players.length > 0 && (
              <button class="multiplayerButton">Expand</button>
              // Logic to expand and show players in the room
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
};
export default WaitingRoom;
