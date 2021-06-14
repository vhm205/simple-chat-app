import React, { useState, createRef } from 'react';

import './Input.css';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';

const Input = ({ setMessage, sendMessage, message }) => {
  const [showEmoji, setShowEmoji] = useState(Boolean);
  const input = createRef()

  const showEmojis = e => {
    setShowEmoji(true)
  }

  const closeMenu = e => {
    if(showEmoji) setShowEmoji(false);
  };

  const addEmoji = e => {
    let emoji = e.native
    setMessage(message + emoji)
    closeMenu(e)
    input.current.focus()
  }
  
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        ref={input}
        onFocus={closeMenu}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={e => e.which === 13 ? sendMessage(e) : null}
      />
      {showEmoji ? (
        <span style={styles.emojiPicker}>
          <Picker
            onSelect={addEmoji}
            emojiTooltip={true}
            title="Chat"
          />
        </span>
      ) : <p style={styles.getEmojiButton} onClick={showEmojis}>
          <Emoji emoji=':grinning::skin-tone-3:' size={24} />
        </p>
      }
      <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>
  )
}

export default Input;

const styles = {
  getEmojiButton: {
    cssFloat: "right",
    border: "none",
    margin: 0,
    marginTop: 8,
    marginRight: 5,
    cursor: "pointer"
  },
  emojiPicker: {
    position: "absolute",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px"
  }
};