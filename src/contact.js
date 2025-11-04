
const form = document.getElementById('contact-form');
const msg = document.getElementById('message');
const msgCount = document.getElementById('msg-count');
const toast = document.getElementById('toast');

// contador mensaje
msg.addEventListener('input', () => {
  msgCount.textContent = `${msg.value.length}/300`;
});

// normaliza texto
function normalizeMsg(s) {
  return s.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

// toast
function showToast(text, color = 'bg-green-600') {
  toast.className = `fixed top-16 right-6 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white ${color} transition-all duration-500`;
  toast.textContent = text;
  toast.classList.remove('hidden');
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.classList.add('hidden'), 400);
  }, 4000);
}



// envío
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  data.message = normalizeMsg(data.message || '');

  try {
    await fetch('https://n8n-n8n.mwsycw.easypanel.host/webhook/7564c55f-1732-451d-b2bc-13dabe9a866f-info-form-landing-page', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Determinar idioma actual
    const lang = localStorage.getItem("lang") || document.documentElement.lang || "es";

    // Mensaje dinámico según idioma
    const successMsg =
      lang === "en"
        ? "✅ Message sent! We'll contact you soon."
        : "✅ ¡Mensaje enviado! Te contactaremos pronto.";

    // Mostrar el toast
    showToast(successMsg);
    form.reset();
    msgCount.textContent = '0/300';
  } catch (err) {
    showToast(
      lang === "en"
        ? "❌ Couldn’t send. Try WhatsApp or email us directly."
        : "❌ No se pudo enviar. Escríbenos por WhatsApp o correo.",
      'bg-red-600'
    );
  }
});

// animaciones suaves on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((el) => {
    if (el.isIntersecting) el.target.classList.add('animate-fade-in');
  });
});
document.querySelectorAll('.fade-in,.fade-left,.fade-right').forEach((el) => observer.observe(el));

// === CSS animaciones inline ===
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)}}
@keyframes fadeLeft {from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)}}
@keyframes fadeRight {from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)}}
.animate-fade-in {animation: fadeIn 0.8s ease-out forwards;}
.fade-left.animate-fade-in {animation: fadeLeft 0.8s ease-out forwards;}
.fade-right.animate-fade-in {animation: fadeRight 0.8s ease-out forwards;}
`;
document.head.appendChild(style);