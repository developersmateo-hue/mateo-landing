
const WEBHOOK_URL =
  'https://n8n-n8n.mwsycw.easypanel.host/webhook/e0c5f767-d7d5-4356-96-mateo-landing-page-mateo';

// === ELEMENTOS ===
const btnToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatSend = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const bubble = document.getElementById('chat-bubble');
const chatIcon = document.getElementById('chat-icon');

// === VARIABLES ===
const bubbles = [
  '🚀 ¿Quieres una landing optimizada para captar más clientes?',
  '🤖 Creamos agentes IA que responden 24/7 por ti.',
  '💡 Pregunta cómo automatizar tus ventas con IA.',
];
let bubbleIndex = 0;
const lang = document.documentElement.lang || 'es';
const sessionId = Math.random().toString(36).slice(2);
let isChatOpen = false;

// === FUNCIONES ===

// Mostrar burbuja fuera del chat
function showBubble() {
  if (!isChatOpen) {
    bubble.textContent = bubbles[bubbleIndex];
    bubble.classList.remove('hidden');
    setTimeout(() => bubble.classList.add('hidden'), 5000);
    bubbleIndex = (bubbleIndex + 1) % bubbles.length;
  }
}
//setInterval(showBubble, 10000);

// Botón: animación de pulso sutil
setInterval(() => {
  btnToggle.classList.toggle('animate-pulse-subtle');
}, 4000);

// Abrir chat
btnToggle.addEventListener('click', () => {
  isChatOpen = !isChatOpen;
  chatWindow.classList.toggle('hidden');
  bubble.classList.add('hidden');

  if (isChatOpen && chatMessages.childElementCount === 0) {
    simulateWelcome();
  }
});

// Cerrar chat
chatClose.addEventListener('click', () => {
  chatWindow.classList.add('hidden');
  isChatOpen = false;
});

// === SIMULAR MENSAJE DE BIENVENIDA ===
async function simulateWelcome() {
  appendMessage('👋 ¡Hola! Soy el asistente IA de Mateo.', 'bot');
  await delay(1800);
  appendTyping();
  await delay(2000);
  removeTyping();
  appendMessage(
    '¿Quieres una landing page optimizada o un agente de IA para tu negocio?',
    'bot'
  );
}

// === FUNCIONES DE ENVÍO ===

// Helper con timeout y manejo JSON/texto
async function callWebhook(payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json,text/plain;q=0.9',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const contentType = res.headers.get('content-type') || '';
    if (!res.ok) {
      const errText = await (contentType.includes('application/json')
        ? res.json().then(JSON.stringify).catch(() => '')
        : res.text());
      throw new Error(`HTTP ${res.status}: ${errText || 'Webhook error'}`);
    }

    let replyText = '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      replyText =
        data.reply || data.message || data.text || JSON.stringify(data);
    } else {
      replyText = await res.text();
    }
    return replyText?.toString() || '';
  } finally {
    clearTimeout(timer);
  }
}

// Enviar mensaje al webhook
async function sendMessage(extra = {}) {
  const userText = chatInput.value.trim();
  if (!userText) return;

  const userId = Date.now();
  appendMessage(userText, 'user');
  chatInput.value = '';

  appendTyping();

  const payload = {
    message: userText,
    lang,
    source: 'floating-whatsapp',
    sessionId,
    timestamp: Date.now(),
    ...extra,
  };

  try {
    const reply = await callWebhook(payload);

    // Intentar parsear JSON si el flujo devuelve varios mensajes
    let parsedParts = [];
    try {
      const parsed = JSON.parse(reply);
      if (parsed.response && typeof parsed.response === 'object') {
        parsedParts = Object.values(parsed.response).filter(
          (part) => typeof part === 'string' && part.trim() !== ''
        );
      }
    } catch {
      parsedParts = [reply];
    }

    // Mostrar mensajes uno por uno con efecto "escribiendo"
    for (let i = 0; i < parsedParts.length; i++) {
      removeTyping();
      await delay(500);
      appendTyping();
      await delay(1000 + parsedParts[i].length * 20);
      removeTyping();
      appendMessage(parsedParts[i], 'bot');
    }
  } catch (err) {
    removeTyping();
    appendMessage(
      '⚠️ Hubo un problema al conectar. Intenta nuevamente.',
      'bot'
    );
  }
}

// === UI helpers ===
function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
  msg.innerHTML = `
    <div class="rounded-2xl px-3 py-2 text-sm max-w-[80%] ${
      sender === 'user'
        ? 'bg-blue-600 text-white rounded-br-none'
        : 'bg-slate-200 text-slate-800 rounded-bl-none'
    }">${text}</div>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendTyping() {
  removeTyping();
  const msg = document.createElement('div');
  msg.className = 'flex justify-start';
  msg.innerHTML = `
    <div class="rounded-2xl px-3 py-2 bg-slate-200 text-slate-800 rounded-bl-none text-sm">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>`;
  msg.classList.add('typing');
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = chatMessages.querySelector('.typing');
  if (typing) typing.remove();
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Eventos envío
chatSend.addEventListener('click', () => sendMessage());
chatInput.addEventListener('keydown', (e) => e.key === 'Enter' && sendMessage());

// === CSS animaciones inline ===
const style = document.createElement('style');
style.textContent = `
@keyframes subtle-pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
  50% { transform: scale(1.05); box-shadow: 0 0 10px 4px rgba(34,197,94,0.3); }
}
.animate-pulse-subtle {
  animation: subtle-pulse 2s ease-in-out infinite;
}
.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: rgba(80,80,80,0.6);
  display: inline-block;
  margin-right: 3px;
  animation: td-bounce 1.2s infinite ease-in-out both;
}
.typing-dot:nth-child(1){animation-delay:-0.32s;}
.typing-dot:nth-child(2){animation-delay:-0.16s;}
@keyframes td-bounce {
  0%,80%,100%{transform:translateY(0);opacity:0.5;}
  40%{transform:translateY(-3px);opacity:1;}
}
`;
document.head.appendChild(style);

