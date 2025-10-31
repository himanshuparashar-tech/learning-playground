import React, { useState, useEffect } from "react";

export const InteractiveDemo = () => {
  const [countNormal, setCountNormal] = useState(0);
  const [countFunctional, setCountFunctional] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");

  // Async incoming messages every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => [...prev, `Auto Message ${prev.length + 1}`]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Normal counter update (may fail with multiple fast clicks)
  const incrementNormalTwice = () => {
    setCountNormal(countNormal + 1);
    setCountNormal(countNormal + 1);
  };

  // Functional counter update (always correct)
  const incrementFunctionalTwice = () => {
    setCountFunctional(prev => prev + 1);
    setCountFunctional(prev => prev + 1);
  };

  // Manual message add
  const addMessage = () => {
    if (inputMsg.trim() === "") return;
    setMessages(prev => [...prev, inputMsg]);
    setInputMsg("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h2>⚡ Interactive Real-Time Demo ⚡</h2>

      {/* Counters */}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
        <div>
          <h3>Normal Counter (may fail)</h3>
          <p>{countNormal}</p>
          <button classname="cstm m-1" style={{ border: '1px solid black', borderRadius: '4px', padding: '5px 10px' }} onClick={incrementNormalTwice}>Increment Twice Fast</button>
        </div>

        <div>
          <h3>Functional Counter (always correct)</h3>
          <p>{countFunctional}</p>
          <button style={{ border: '1px solid black', borderRadius: '4px', padding: '5px 10px' }} onClick={incrementFunctionalTwice}>Increment Twice Fast</button>
        </div>
      </div>

      <hr style={{ margin: "40px 0" }} />

      {/* Messages */}
      <div>
        <h3>Real-time Messages</h3>
        <ul style={{ textAlign: "left", maxHeight: "200px", overflowY: "auto", padding: "0 20px" }}>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>

        {/* Manual add */}
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={inputMsg}
            onChange={e => setInputMsg(e.target.value)}
            placeholder="Type a message"
            style={{ padding: "6px", width: "200px", marginRight: "8px" }}
          />
          <button style={{ border: '1px solid black', borderRadius: '4px', padding: '5px 10px' }} onClick={addMessage}>Add Message</button>
        </div>

        <p style={{ color: "#888", marginTop: "10px" }}>
          Auto message every 2 seconds + manual messages.
        </p>
      </div>
    </div >
  );
};
