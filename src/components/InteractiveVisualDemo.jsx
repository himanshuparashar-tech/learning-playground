import React, { useState, useEffect } from "react";

export const InteractiveDemoVisual = () => {
    const [countNormal, setCountNormal] = useState(0);
    const [countFunctional, setCountFunctional] = useState(0);
    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState("");
    const [normalStale, setNormalStale] = useState(false);

    // Async incoming messages every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setMessages(prev => [...prev, `Auto Message ${prev.length + 1}`]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Normal counter update (may fail with multiple fast clicks)
    const incrementNormalTwice = () => {
        // Before updating, capture previous count
        const oldCount = countNormal;

        setCountNormal(countNormal + 1);
        setCountNormal(countNormal + 1);

        // If result is not as expected (+2), mark stale
        setTimeout(() => {
            if (countNormal + 2 !== oldCount + 2) {
                setNormalStale(true);
                setTimeout(() => setNormalStale(false), 800); // reset after 0.8s
            }
        }, 50);
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
            <h2>⚡ Interactive Real-Time Demo with Visual Indicators ⚡</h2>

            {/* Counters */}
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
                <div
                    style={{
                        padding: "20px",
                        borderRadius: "8px",
                        background: normalStale ? "#ffcccc" : "#fff0f0",
                        transition: "background 0.3s",
                    }}
                >
                    <h3>Normal Counter (may fail)</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{countNormal}</p>
                    <button style={{ border: '1px solid black', borderRadius: '4px', padding: '5px 10px' }} onClick={incrementNormalTwice}>Increment Twice Fast</button>
                </div>

                <div
                    style={{
                        padding: "20px",
                        borderRadius: "8px",
                        background: "#d4edda",
                        transition: "background 0.3s",
                    }}
                >
                    <h3>Functional Counter (always correct)</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{countFunctional}</p>
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
                        style={{ padding: "6px", width: "200px", marginRight: "8px", border: '1px solid gray' }}
                    />
                    <button style={{ border: '1px solid black', borderRadius: '4px', padding: '5px 10px' }} onClick={addMessage}>Add Message</button>
                </div>

                <p style={{ color: "#888", marginTop: "10px" }}>
                    Auto message every 2 seconds + manual messages.
                </p>
            </div>
        </div>
    );
};
