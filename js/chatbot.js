document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".chat-input input");
    const sendBtn = document.querySelector(".chat-input button");
    const chat = document.querySelector(".chat-window");

    // Financial Chatbot
    const chatbot = {
      getResponse: function(msg) {
        msg = msg.toLowerCase().trim();
        if (msg.includes('expense')) return '📊 Total Expenses: Tracking your spending...';
        if (msg.includes('goal')) return '🎯 Your goals are being tracked!';
        if (msg.includes('invest')) return '📈 Investment portfolio analysis ready!';
        if (msg.includes('budget')) return '💡 Budget optimization tips available!';
        if (msg.includes('save')) return '💰 Smart savings strategies!';
        return 'I can help with expenses, goals, investments, and budgeting! What would you like to know? 💰';
      }
    };
  
    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => { if (e.key === 'Enter') sendMessage(); });
  
    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;
  
      addMessage(text, "user");
      input.value = "";
  
      setTimeout(() => {
        const response = chatbot.getResponse(text);
        addMessage(response, "bot");
      }, 500);
    }
  
    function addMessage(text, type) {
      const div = document.createElement("div");
      div.className = `message ${type}`;
      div.style.whiteSpace = 'pre-wrap';
      div.innerHTML = `<p style="margin: 0;">${text}</p>`;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }

    // Welcome message
    addMessage("👋 Hello! I'm FinPilot, your financial assistant. How can I help you today?", "bot");
  });  