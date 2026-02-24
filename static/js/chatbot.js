// =====================================================
// MediConnect AI Chatbot (RAG-style with Vector DB)
// =====================================================

let chatOpen = false;
let chatHistory = [];

function initChatbot() {
  if (document.getElementById('chatbot-widget')) return;

  const widget = document.createElement('div');
  widget.id = 'chatbot-widget';
  widget.innerHTML = `
    <button class="chatbot-fab" id="chatbot-fab" onclick="toggleChatbot()">
      <i class="fas fa-robot"></i>
      <span class="chatbot-fab-pulse"></span>
    </button>
    <div class="chatbot-window" id="chatbot-window" style="display:none;">
      <div class="chatbot-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="chatbot-avatar"><i class="fas fa-robot"></i></div>
          <div>
            <div style="font-weight:700;font-size:14px;">MediConnect AI</div>
            <div style="font-size:11px;opacity:0.8;">RAG-powered Health Assistant</div>
          </div>
        </div>
        <button class="chatbot-close" onclick="toggleChatbot()">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages">
        <div class="chat-msg bot">
          <div class="chat-bubble bot">
            👋 Hello! I'm your AI Health Assistant powered by RAG (Retrieval-Augmented Generation). 
            I can help you with appointments, symptoms, medicines, emergencies, and more. How can I help you today?
          </div>
        </div>
      </div>
      <div class="chatbot-quick-actions" id="chatbot-quick">
        <button onclick="sendQuickChat('How to book appointment?')">📅 Book Appointment</button>
        <button onclick="sendQuickChat('Emergency help needed')">🚑 Emergency</button>
        <button onclick="sendQuickChat('How to check symptoms?')">🩺 Symptoms</button>
        <button onclick="sendQuickChat('Payment options')">💳 Payments</button>
      </div>
      <div class="chatbot-input-area">
        <input type="text" class="chatbot-input" id="chatbot-input" placeholder="${t('type_message')}" 
               onkeydown="if(event.key==='Enter')sendChatMessage()" />
        <button class="chatbot-send" onclick="sendChatMessage()">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);
}

function toggleChatbot() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chatbot-window');
  const fab = document.getElementById('chatbot-fab');
  if (win) win.style.display = chatOpen ? 'flex' : 'none';
  if (fab) fab.innerHTML = chatOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-robot"></i><span class="chatbot-fab-pulse"></span>';
}

function sendQuickChat(msg) {
  document.getElementById('chatbot-input').value = msg;
  sendChatMessage();
  document.getElementById('chatbot-quick').style.display = 'none';
}

async function sendChatMessage() {
  const input = document.getElementById('chatbot-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  const container = document.getElementById('chatbot-messages');
  // Add user message
  container.innerHTML += `<div class="chat-msg user"><div class="chat-bubble user">${msg}</div></div>`;
  container.scrollTop = container.scrollHeight;

  // Typing indicator
  container.innerHTML += `<div class="chat-msg bot" id="typing-indicator"><div class="chat-bubble bot"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></div></div>`;
  container.scrollTop = container.scrollHeight;

  try {
    const res = await api.chatbot.chat(msg);
    document.getElementById('typing-indicator')?.remove();
    const formatted = res.response.replace(/\n/g, '<br>').replace(/•/g, '&bull;');
    container.innerHTML += `<div class="chat-msg bot"><div class="chat-bubble bot">${formatted}</div></div>`;
  } catch {
    document.getElementById('typing-indicator')?.remove();
    container.innerHTML += `<div class="chat-msg bot"><div class="chat-bubble bot">Sorry, I couldn't process that. Please try again or call our helpline at 1800-180-1104.</div></div>`;
  }
  container.scrollTop = container.scrollHeight;
}
