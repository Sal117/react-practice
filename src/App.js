import { useRef, useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  // ------------------------------
  // 1️⃣ useRef: previous value tracker
  // ------------------------------
  const [count, setCount] = useState(0);
  const previousCount = useRef(0);

  useEffect(() => {
    previousCount.current = count;
  }, [count]);

  // ------------------------------
  // 2️⃣ useRef: local HTML5 video control
  // ------------------------------
  const videoRef = useRef(null);
  const playVideo = () => videoRef.current.play();
  const pauseVideo = () => videoRef.current.pause();
  const restartVideo = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  // ------------------------------
  // 3️⃣ useRef: auto-scroll in chat
  // ------------------------------
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState(["👋 Welcome to the chat!"]);
  const addMessage = () => {
    setMessages((prev) => [...prev, `New message ${prev.length + 1}`]);
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ------------------------------
  // 4️⃣ useRef: page scroll (top & bottom)
  // ------------------------------
  const pageTopRef = useRef(null);
  const pageBottomRef = useRef(null);
  const scrollToTop = () =>
    pageTopRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToBottom = () =>
    pageBottomRef.current.scrollIntoView({ behavior: "smooth" });

  // ------------------------------
  // 🧩 UI
  // ------------------------------
  return (
    <div className="App" ref={pageTopRef}>
      <h1>⚡ useRef Advanced Playground</h1>

      {/* 🧠 Previous Value Tracker */}
      <section className="card">
        <h2>🧠 Previous Value Tracker</h2>
        <p>Current: {count}</p>
        <p>Previous: {previousCount.current}</p>
        <button className="btn green" onClick={() => setCount(count + 1)}>
          +1
        </button>
        <button className="btn red" onClick={() => setCount(0)}>
          Reset
        </button>
      </section>

      {/* 🎞 Local HTML5 Video */}
      <section className="card">
        <h2>🎞 Local Video (HTML5)</h2>
        <div className="video-wrapper">
          <video
            ref={videoRef}
            width="100%"
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="btn-group">
          <button className="btn green" onClick={playVideo}>
            ▶️ Play
          </button>
          <button className="btn red" onClick={pauseVideo}>
            ⏸️ Pause
          </button>
          <button className="btn purple" onClick={restartVideo}>
            🔄 Restart
          </button>
        </div>
      </section>

      {/* 🎬 YouTube Embed (Iframe) */}
      <section className="card">
        <h2>📺 YouTube Embed</h2>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/d2FizMoU2eM?si=bQxmnO1TSAwMFYsr"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* 💬 Chat Section */}
      <section className="card">
        <h2>💬 Auto Scroll Chat</h2>
        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className="chat-message">
              {msg}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <button className="btn green" onClick={addMessage}>
          ➕ Add Message
        </button>
      </section>

      {/* ⬆⬇ Scroll Control */}
      <section className="card" ref={pageBottomRef}>
        <h2>⬆⬇ Scroll Control</h2>
        <p>Scroll smoothly to top or bottom using useRef.</p>
        <button className="btn green" onClick={scrollToTop}>
          ⬆ Scroll to Top
        </button>
        <button className="btn purple" onClick={scrollToBottom}>
          ⬇ Scroll to Bottom
        </button>
      </section>
    </div>
  );
}
