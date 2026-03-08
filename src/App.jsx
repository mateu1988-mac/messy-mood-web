import React, { useState, useEffect } from 'react';
import { saveReservation, getReservations } from './services/api';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1840&auto=format&fit=crop", // Maternidad cálida
  "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1840&auto=format&fit=crop", // Niños jugando / Montessori
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1840&auto=format&fit=crop", // Familia unida
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1840&auto=format&fit=crop"  // Messy play (niños pintando)
];

// --- ICONOS SVG ---
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconCoffee = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
    <line x1="6" y1="1" x2="6" y2="4"></line>
    <line x1="10" y1="1" x2="10" y2="4"></line>
    <line x1="14" y1="1" x2="14" y2="4"></line>
  </svg>
);

const IconMap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const MessyMoodLogo = ({ className }) => (
  <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs><path id="textPath" d="M 15 55 Q 60 20 105 55" fill="transparent" /></defs>
    <path d="M 12 92 C 20 40, 100 40, 108 92" fill="transparent" stroke="#eab355" strokeWidth="9" strokeLinecap="round" />
    <path d="M 25 95 C 35 55, 85 55, 95 95" fill="transparent" stroke="#5d7b93" strokeWidth="9" strokeLinecap="round" />
    <path d="M 38 98 C 45 75, 75 75, 82 98" fill="transparent" stroke="#7a533c" strokeWidth="9" strokeLinecap="round" />
    <text style={{ fontSize: '9px', fontWeight: '900', fill: '#7a533c', fontFamily: 'sans-serif' }}>
      <textPath href="#textPath" startOffset="50%" textAnchor="middle">MESSY & MOOD</textPath>
    </text>
  </svg>
);

const SpringWreath = ({ className, reflect }) => (
  <svg viewBox="0 0 120 120" className={className} style={{ transform: reflect ? 'scaleX(-1)' : 'none' }}>
    {/* Rama Curvada */}
    <path d="M 20 100 Q 50 20 100 20" fill="none" stroke="#eab355" strokeWidth="4" strokeLinecap="round" className="opacity-60" />
    <path d="M 55 55 Q 70 80 100 70" fill="none" stroke="#eab355" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
    <path d="M 35 35 Q 20 10 30 0" fill="none" stroke="#eab355" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
    
    {/* Hojas */}
    <path d="M 22 80 C 10 70, 0 80, 20 90" fill="#eab355" className="opacity-40" />
    <path d="M 40 40 C 30 20, 20 30, 30 50" fill="#eab355" className="opacity-40" />
    <path d="M 70 25 C 80 10, 90 20, 80 35" fill="#eab355" className="opacity-40" />
    
    {/* Flor Principal */}
    <g transform="translate(10, -10) scale(0.6)">
       <circle cx="50" cy="20" r="12" fill="#f9d7d6" />
       <circle cx="50" cy="80" r="12" fill="#f9d7d6" />
       <circle cx="20" cy="50" r="12" fill="#f9d7d6" />
       <circle cx="80" cy="50" r="12" fill="#f9d7d6" />
       <circle cx="29" cy="29" r="12" fill="#f9d7d6" />
       <circle cx="71" cy="71" r="12" fill="#f9d7d6" />
       <circle cx="29" cy="71" r="12" fill="#f9d7d6" />
       <circle cx="71" cy="29" r="12" fill="#f9d7d6" />
       <circle cx="50" cy="50" r="14" fill="#bc7948" />
    </g>
    
    {/* Flor Pequeña */}
    <g transform="translate(50, 45) scale(0.4)">
       <circle cx="50" cy="20" r="12" fill="#f9d7d6" opacity="0.9" />
       <circle cx="50" cy="80" r="12" fill="#f9d7d6" opacity="0.9" />
       <circle cx="20" cy="50" r="12" fill="#f9d7d6" opacity="0.9" />
       <circle cx="80" cy="50" r="12" fill="#f9d7d6" opacity="0.9" />
       <circle cx="29" cy="29" r="12" fill="#f9d7d6" opacity="0.9" />
       <circle cx="71" cy="71" r="12" fill="#f9d7d6" opacity="0.9" />
       <circle cx="29" cy="71" r="12" fill="#f9d7d6" opacity="0.9" />
       <circle cx="71" cy="29" r="12" fill="#f9d7d6" opacity="0.9" />
       <circle cx="50" cy="50" r="14" fill="#bc7948" />
    </g>
  </svg>
);

export default function App() {
  const [view, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombreTutor: '',
    nombreNiño: '',
    email: '',
    telefono: '',
    notas: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Estado para el panel de administración
  const [reservations, setReservations] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Efecto para el carrusel hero
  useEffect(() => {
    if (view === 'home') {
      const interval = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
      }, 4500); // Cambia cada 4.5s
      return () => clearInterval(interval);
    }
  }, [view]);

  // Efecto para forzar que el navegador no intente traducir la página
  useEffect(() => {
    document.documentElement.lang = "es";
    const metaTranslate = document.createElement('meta');
    metaTranslate.name = "google";
    metaTranslate.content = "notranslate";
    document.head.appendChild(metaTranslate);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombreTutor.trim() || !formData.nombreNiño.trim() || !formData.email.trim() || !formData.telefono.trim()) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        nombreTutor: formData.nombreTutor,
        nombreNiño: formData.nombreNiño,
        email: formData.email,
        telefono: formData.telefono,
        fechaEvento: '20/03/2026',
        notas: formData.notas,
        timestamp: new Date().toISOString()
      };

      await saveReservation(payload);

      // Limpiar formulario y mostrar página de agradecimiento
      setFormData({
        nombreTutor: '',
        nombreNiño: '',
        email: '',
        telefono: '',
        notas: ''
      });
      setView('gracias');
    } catch (err) {
      setError(`Error al enviar la reserva: ${err.message}`);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAccess = async (e) => {
    e.preventDefault();
    if (pinInput !== '1010') {
      setError('PIN incorrecto. Acceso denegado.');
      return;
    }
    setError('');
    setLoadingAdmin(true);
    setView('admin');

    try {
      const data = await getReservations();
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAdmin(false);
    }
  };

  const collaborators = [
    { name: "Taste the process", bio: "Nutrición y hábitos saludables.", color: "bg-[#fef0d8]" },
    { name: "COA", bio: "Diseño y creatividad infantil.", color: "bg-[#e6eff5]" },
    { name: "Ringana", bio: "Cosmética fresca y sostenible.", color: "bg-[#f9d7d6]" },
    { name: "Vero Vitamina", bio: "Psicología y bienestar familiar.", color: "bg-[#fef0d8]" },
    { name: "Saber-se", bio: "Educación emocional consciente.", color: "bg-[#e6eff5]" },
    { name: "El viaje de Cris", bio: "Acompañamiento en la maternidad.", color: "bg-[#f9d7d6]" }
  ];

  const agenda = [
    { time: "10:00", type: "joint", title: "Bienvenida y Apertura", desc: "Café de bienvenida en el jardín." },
    {
      time: "10:30",
      type: "split",
      left: { title: "Charla Consciente", author: "Vero Vitamina" },
      right: { title: "Taller Sensorial", author: "Messy Mood" }
    },
    { time: "11:30", type: "joint", title: "Cuentacuentos Mágico", desc: "Un viaje a través de la imaginación." },
    {
      time: "12:15",
      type: "split",
      left: { title: "Taller Nutrición", author: "Taste the process" },
      right: { title: "Yoga Infantil", author: "Saber-se" }
    },
    { time: "13:30", type: "joint", title: "Clausura", desc: "Música y aperitivo final." }
  ];

  const menuItems = [
    { item: "Café de Especialidad", price: "2.00€" },
    { item: "Zumo Naranja Natural", price: "3.50€" },
    { item: "Bowl Fruta Temporada", price: "4.50€" },
    { item: "Snacks Saludables", price: "2.50€" }
  ];

  if (view === 'gracias') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#fdfbf7]">
        <div className="mb-8 animate-bounce">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#eab355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1 className="text-4xl font-black text-[#7a533c] mb-4">¡Reserva Confirmada!</h1>
        <p className="text-[#bc7948] mb-3 text-lg">Te hemos enviado un correo con los detalles de tu reserva.</p>
        <p className="text-[#bc7948] mb-8 text-sm">Nos vemos el <span className="font-bold">20 de marzo</span> en la Fiesta de Primavera 🌸</p>
        <button onClick={() => setView('home')} className="bg-[#5d7b93] text-white px-8 py-3 rounded-full font-bold hover:bg-[#4a6378] transition-colors">Volver a la web</button>
      </div>
    );
  }

  if (view === 'formulario') {
    return (
      <div className="min-h-screen bg-[#fdfbf7] font-sans pt-20">
        <nav className="fixed top-0 w-full bg-[#fdfbf7]/95 backdrop-blur-md z-50 border-b border-[#f9d7d6] px-4 md:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <MessyMoodLogo className="w-10 h-10" />
            <h1 className="font-black text-lg text-[#7a533c] tracking-tight">MESSY MOOD</h1>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#7a533c] mb-4">Reserva tu Plaza</h2>
            <p className="text-[#bc7948]">Completa el formulario para asegurar tu participación en la Fiesta de Primavera</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-lg border border-[#f9d7d6]">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-[#7a533c] mb-2">Nombre del Tutor *</label>
                <input
                  type="text"
                  name="nombreTutor"
                  value={formData.nombreTutor}
                  onChange={handleInputChange}
                  placeholder="Ej: Andrés Mateu"
                  className="w-full px-4 py-3 rounded-xl border border-[#f9d7d6] focus:outline-none focus:ring-2 focus:ring-[#eab355] focus:border-transparent"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#7a533c] mb-2">Nombre del Niño/a *</label>
                <input
                  type="text"
                  name="nombreNiño"
                  value={formData.nombreNiño}
                  onChange={handleInputChange}
                  placeholder="Ej: Leo"
                  className="w-full px-4 py-3 rounded-xl border border-[#f9d7d6] focus:outline-none focus:ring-2 focus:ring-[#eab355] focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#7a533c] mb-2">Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ej: andres@ejemplo.com"
                className="w-full px-4 py-3 rounded-xl border border-[#f9d7d6] focus:outline-none focus:ring-2 focus:ring-[#eab355] focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#7a533c] mb-2">Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Ej: +34 666 000 000"
                className="w-full px-4 py-3 rounded-xl border border-[#f9d7d6] focus:outline-none focus:ring-2 focus:ring-[#eab355] focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-[#7a533c] mb-2">Notas (Opcional)</label>
              <textarea
                name="notas"
                value={formData.notas}
                onChange={handleInputChange}
                placeholder="Alergias, restricciones, comentarios..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-[#f9d7d6] focus:outline-none focus:ring-2 focus:ring-[#eab355] focus:border-transparent resize-none"
                disabled={loading}
              />
            </div>

            <div className="mb-6 p-4 bg-[#fef0d8] rounded-xl">
              <p className="text-xs text-[#bc7948] font-bold">
                <span className="block font-black text-[#eab355] mb-1">📅 Fecha del Evento</span>
                Sábado, 20 de Marzo de 2026 · 10:00 - 14:00
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5d7b93] hover:bg-[#4a6378] disabled:bg-gray-400 text-white px-6 py-4 rounded-full font-bold transition-colors shadow-lg disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Confirmar Reserva'}
            </button>

            <p className="text-xs text-[#bc7948] text-center mt-6">
              * Campos requeridos. Recibirás un email de confirmación.
            </p>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'wip') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#fdfbf7]" style={{ backgroundImage: 'radial-gradient(#f9d7d6 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}>
        <MessyMoodLogo className="w-32 h-32 mb-8 animate-bounce" />
        <h1 className="text-3xl font-black text-[#7a533c] mb-4">WORK IN PROGRESS</h1>
        <p className="text-[#bc7948] mb-8">Estamos preparando las inscripciones online.</p>
        <button onClick={() => setView('home')} className="bg-[#5d7b93] text-white px-8 py-3 rounded-full font-bold">Volver a la web</button>
      </div>
    );
  }

  if (view === 'primaveraland') {
    return (
      <div className="min-h-screen bg-[#fdfbf7] font-sans pt-16 md:pt-20 relative overflow-hidden">
        {/* Decoración de fondo Primaveral */}
        <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-[#f9d7d6]/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-40 left-0 -m-32 w-96 h-96 bg-[#eab355]/10 rounded-full blur-3xl -z-10"></div>

        <nav className="fixed top-0 w-full bg-[#fdfbf7]/95 backdrop-blur-md z-50 border-b border-[#f9d7d6] px-4 md:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <MessyMoodLogo className="w-10 h-10" />
            <h1 className="font-black text-lg text-[#7a533c] tracking-tight">MESSY MOOD</h1>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative">
          <div className="text-center mb-12 md:mb-20">
            <span className="bg-[#fef0d8] text-[#eab355] px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6 inline-block shadow-sm">Edición Especial · Marzo 2026</span>
            <div className="relative inline-block mb-6 px-4 md:px-12 py-4">
              <SpringWreath className="absolute -left-6 md:-left-12 -top-4 w-24 md:w-32 h-24 md:h-32 -rotate-12 pointer-events-none" />
              <SpringWreath className="absolute -right-6 md:-right-12 -top-4 w-24 md:w-32 h-24 md:h-32 rotate-12 pointer-events-none" reflect={true} />
              
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#7a533c] leading-none tracking-tight relative z-10">
                PRIMAVERALAND
              </h2>
            </div>
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="h-px bg-[#f9d7d6] w-12"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#eab355" stroke="#eab355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <div className="h-px bg-[#f9d7d6] w-12"></div>
            </div>
            <p className="text-[#bc7948] text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium px-2">
              Bienvenidos a este evento único creado con cariño por MessyMood donde disfrutar de una jornada especial en familia creando <span className="text-[#eab355] font-bold">recuerdos bonitos</span>.
            </p>
            <p className="text-[#7a533c]/80 text-sm md:text-base mt-6 max-w-2xl mx-auto px-4 font-medium">
              Mediante esta difusión haremos llegar la información más relevante del evento así como los recordatorios oportunos.<br /><br />
              Agradeceros de antemano vuestra ilusión y colaboración. Gracias a todos vosotros este evento va a ser maravilloso.
            </p>
          </div>

          <div className="bg-white rounded-[40px] p-6 md:p-10 shadow-xl border border-[#f9d7d6] mb-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-[#eab355] to-[#f9d7d6] text-white text-xs font-black px-6 py-2 rounded-bl-2xl shadow-sm tracking-widest">PLAZO HASTA 10/03</div>
            <h3 className="text-2xl md:text-3xl font-black text-[#7a533c] mb-2 mt-4 md:mt-0 tracking-tight">Reserva de Espacio</h3>
            <p className="text-[#bc7948] mb-8 font-medium text-sm md:text-base border-b border-[#fdfbf7] pb-6">Apertura de plazo para stands y puntos de venta en Primaveraland.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#fef0d8]/50 p-6 md:p-8 rounded-3xl border border-[#eab355]/20">
                <h4 className="font-black text-[#7a533c] text-lg mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#white] shadow-sm flex items-center justify-center text-[#eab355] font-black">1</div>
                  Pasos a seguir
                </h4>
                <ul className="space-y-4 text-[#7a533c] font-medium text-sm">
                  <li className="flex items-start gap-3"><span className="text-[#eab355] font-black mt-0.5">•</span> <span>Revisa la tabla de colaboradores.</span></li>
                  <li className="flex items-start gap-3"><span className="text-[#eab355] font-black mt-0.5">•</span> <span>Elige tu opción de stand o venta.</span></li>
                  <li className="flex items-start gap-3"><span className="text-[#eab355] font-black mt-0.5">•</span> <span className="leading-relaxed">Realiza el pago escogiendo la opción que mejor te convenga.</span></li>
                </ul>
              </div>

              <div className="flex flex-col justify-center gap-5">
                <a href="https://buy.stripe.com/test_aFabJ1fYfgg90GG58yaR200" target="_blank" rel="noopener noreferrer" className="bg-[#5d7b93] hover:bg-[#4a6378] text-white px-8 py-5 rounded-2xl font-black transition-all transform hover:-translate-y-1 shadow-lg text-center tracking-widest text-lg flex justify-center items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                  RESERVAR
                </a>

                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-[#f9d7d6]"></div>
                  <span className="flex-shrink-0 mx-4 text-[#bc7948] font-bold text-xs uppercase tracking-widest">Pago Alternativo</span>
                  <div className="flex-grow border-t border-[#f9d7d6]"></div>
                </div>

                <div className="text-center bg-white p-5 rounded-2xl border border-[#f9d7d6] shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bc7948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <p className="text-[#bc7948] font-black text-xs uppercase tracking-widest">Bizum / Transfer</p>
                  </div>
                  <p className="text-[#7a533c] text-sm font-medium">
                    Envía a <strong className="text-[#5d7b93]">633 022 738</strong><br />
                    Concepto: <span className="text-[#eab355] font-bold">COLAB + Proyecto</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#fdfbf7] border border-[#f9d7d6] p-4 text-center rounded-2xl">
              <p className="text-[#5d7b93] font-bold text-xs tracking-wide uppercase">
                Aviso: El evento se publicitará exclusivamente en horario de mañana.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-lg border border-[#f9d7d6] mb-12 relative">
            <div className="absolute top-0 right-10 -m-6 bg-white border border-[#f9d7d6] p-4 rounded-full shadow-sm text-2xl hidden md:block">🌸</div>
            <h3 className="text-2xl font-black text-[#7a533c] mb-8 flex items-center gap-3 tracking-tight">
              Información del evento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#fcfcfc] border border-[#f9d7d6] p-4 rounded-2xl flex gap-4">
                <span className="text-[#5d7b93] font-bold shrink-0 mt-1">✓</span>
                <p className="text-[#bc7948] text-sm"><strong className="text-[#7a533c]">No reembolsable:</strong> La aportación de reserva no es reembolsable excepto si se cancela el evento.</p>
              </div>
              <div className="bg-[#fcfcfc] border border-[#f9d7d6] p-4 rounded-2xl flex gap-4">
                <span className="text-[#5d7b93] font-bold shrink-0 mt-1">✓</span>
                <p className="text-[#bc7948] text-sm"><strong className="text-[#7a533c]">Mobiliario:</strong> Deberéis traer vuestra propia mesa para el stand.</p>
              </div>
              <div className="bg-[#fcfcfc] border border-[#f9d7d6] p-4 rounded-2xl flex gap-4">
                <span className="text-[#5d7b93] font-bold shrink-0 mt-1">✓</span>
                <p className="text-[#bc7948] text-sm"><strong className="text-[#7a533c]">Decoración:</strong> Incluye mantel a conjunto y decoración general. Podéis ambientar vuestro espacio libremente.</p>
              </div>
              <div className="bg-[#fcfcfc] border border-[#f9d7d6] p-4 rounded-2xl flex gap-4">
                <span className="text-[#5d7b93] font-bold shrink-0 mt-1">✓</span>
                <p className="text-[#bc7948] text-sm"><strong className="text-[#7a533c]">Normativa:</strong> Existen normas de uso del espacio especificadas con las tarifas.</p>
              </div>
            </div>
          </div>

          <div className="text-center pb-8 md:pb-0">
            <button onClick={() => setView('home')} className="w-full sm:w-auto bg-[#5d7b93] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold hover:bg-[#4a6378] transition-colors shadow-lg text-sm md:text-base">Volver a la web</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'pin_auth') {
    return (
      <div className="min-h-screen bg-[#fdfbf7] font-sans flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#f9d7d6] max-w-sm w-full text-center">
          <MessyMoodLogo className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-[#7a533c] mb-2">Área Interna</h2>
          <p className="text-[#bc7948] text-sm mb-6">Introduce tu PIN de administrador para acceder a las reservas.</p>

          <form onSubmit={handleAdminAccess}>
            {error && (
              <div className="mb-4 text-xs font-bold text-red-500 bg-red-50 p-2 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="****"
              className="w-full text-center tracking-widest text-2xl px-4 py-3 mb-6 rounded-xl border-2 border-[#f9d7d6] focus:outline-none focus:ring-2 focus:ring-[#eab355] focus:border-transparent"
              autoFocus
              maxLength={4}
            />
            <div className="flex gap-3">
              <button type="button" onClick={() => { setView('home'); setPinInput(''); setError(''); }} className="flex-1 bg-gray-100 text-gray-500 px-4 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Volver</button>
              <button type="submit" className="flex-1 bg-[#5d7b93] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#4a6378] transition-colors">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-[#fcfcfc] font-sans p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-[#7a533c]">Panel de Reservas</h2>
              <p className="text-[#bc7948] mt-1 font-medium">Hay {reservations.length} inscripciones registradas en la base de datos.</p>
            </div>
            <button onClick={() => { setView('home'); setPinInput(''); setReservations([]); }} className="bg-white border-2 border-[#f9d7d6] text-[#7a533c] px-6 py-2 rounded-full font-bold hover:bg-[#fdfbf7] transition-colors shadow-sm">
              Cerrar Sesión
            </button>
          </div>

          {loadingAdmin ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-[#eab355] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-[#7a533c] font-bold">Cargando datos seguros...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center shadow-sm">
              <p className="font-bold mb-2">Error de Conexión</p>
              <p className="text-sm">{error}</p>
              <button onClick={() => setView('home')} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Volver al inicio</button>
            </div>
          ) : reservations.length === 0 ? (
            <div className="bg-white border text-center border-[#f9d7d6] text-[#bc7948] py-16 rounded-3xl shadow-sm">
              <div className="text-4xl mb-4">📝</div>
              <p className="font-bold text-lg text-[#7a533c]">No hay reservas todavía</p>
              <p className="text-sm mt-1">Cuando la gente rellene el formulario aparecerán aquí.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-[#f9d7d6] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fdfbf7] border-b border-[#f9d7d6]">
                      <th className="p-4 indent-2 text-xs font-black uppercase tracking-wider text-[#bc7948]">Fecha Registro</th>
                      <th className="p-4 text-xs font-black uppercase tracking-wider text-[#bc7948]">Tutor</th>
                      <th className="p-4 text-xs font-black uppercase tracking-wider text-[#bc7948]">Niño/a</th>
                      <th className="p-4 text-xs font-black uppercase tracking-wider text-[#bc7948]">Contacto</th>
                      <th className="p-4 text-xs font-black uppercase tracking-wider text-[#bc7948] max-w-xs">Notas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#fdfbf7]">
                    {reservations.map((res, i) => (
                      <tr key={res.id || i} className="hover:bg-[#fcfcfc] transition-colors">
                        <td className="p-4 indent-2 text-sm text-[#7a533c]">
                          {new Date(res.fecha_registro).toLocaleDateString()} <span className="text-xs opacity-50 block">{new Date(res.fecha_registro).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </td>
                        <td className="p-4 text-sm font-bold text-[#7a533c]">{res.nombre_tutor}</td>
                        <td className="p-4 text-sm font-bold text-[#5d7b93] bg-[#e6eff5]/50 rounded-lg inline-block my-3 ml-2">{res.nombre_nino}</td>
                        <td className="p-4 text-sm text-[#7a533c]">
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${res.email}`} className="hover:text-[#eab355] truncate max-w-[150px]">{res.email}</a>
                            <a href={`tel:${res.telefono}`} className="text-xs font-bold text-[#bc7948]">{res.telefono}</a>
                          </div>
                        </td>
                        <td className="p-4 text-xs text-[#bc7948] max-w-xs italic empty:before:content-['-']">{res.notas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#f9d7d6] selection:text-[#7a533c]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#fdfbf7]/95 backdrop-blur-md z-50 border-b border-[#f9d7d6] px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <MessyMoodLogo className="w-10 h-10" />
          <h1 className="font-black text-lg text-[#7a533c] tracking-tight">MESSY MOOD</h1>
        </div>
        <div className="hidden md:flex gap-8 font-bold text-xs tracking-widest text-[#7a533c]">
          <a href="#event" className="hover:text-[#eab355] transition-colors">EL EVENTO</a>
          <a href="#agenda" className="hover:text-[#eab355] transition-colors">AGENDA</a>
          <a href="#cafe" className="hover:text-[#eab355] transition-colors">CAFETERÍA</a>
        </div>
        <div className="hidden md:flex flex-1 justify-end items-center gap-4">
          <button onClick={() => setView('formulario')} className="bg-[#eab355] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-[#d9a040] transition-colors">RESERVAR</button>
          <button onClick={() => { setView('pin_auth'); setPinInput(''); setError(''); }} className="text-[#bc7948] bg-transparent border border-[#f9d7d6] px-4 py-2 rounded-full font-bold text-[10px] tracking-wider hover:bg-[#f9d7d6]/30 transition-colors">ÁREA INTERNA</button>
        </div>
        <div className="flex md:hidden items-center gap-4">
          <button onClick={() => setView('formulario')} className="bg-[#eab355] text-white px-4 py-2 rounded-full font-bold text-xs">RESERVAR</button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#7a533c]">
            {isMenuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-14 left-0 w-full bg-white z-40 p-8 flex flex-col gap-6 border-b border-[#f9d7d6] md:hidden text-[#7a533c] font-bold shadow-xl">
          <a href="#event" onClick={() => setIsMenuOpen(false)}>EL EVENTO</a>
          <a href="#agenda" onClick={() => setIsMenuOpen(false)}>AGENDA</a>
          <a href="#cafe" onClick={() => setIsMenuOpen(false)}>CAFETERÍA</a>
          <div className="h-px bg-[#f9d7d6] w-full my-2"></div>
          <button onClick={() => { setIsMenuOpen(false); setView('pin_auth'); setPinInput(''); setError(''); }} className="text-left flex items-center gap-2 text-[#bc7948]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            ÁREA INTERNA
          </button>
        </div>
      )}

      {/* Hero */}
      <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="bg-[#f9d7d6] text-[#bc7948] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Planazos y Momentazos</span>
          <h2 className="text-5xl md:text-7xl font-black text-[#7a533c] mb-6 leading-[1.1]">Diversión <br /><span className="text-[#eab355]">Messy & Fun</span></h2>
          <p className="text-[#bc7948] mb-10 text-lg leading-relaxed max-w-md mx-auto md:mx-0">Talleres sensoriales y experiencias únicas para disfrutar de la crianza consciente en familia.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button onClick={() => setView('primaveraland')} className="bg-[#eab355] hover:bg-[#d9a040] transition-colors text-white px-8 py-4 rounded-full font-bold shadow-xl whitespace-nowrap">✨ PRIMAVERALAND ✨</button>
            <button onClick={() => setView('formulario')} className="bg-[#5d7b93] hover:bg-[#4a6378] transition-colors text-white px-8 py-4 rounded-full font-bold shadow-xl border border-[#4a6378]">PRÓXIMOS TALLERES</button>
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <div className="bg-[#eab355]/20 absolute inset-0 rounded-[40px] rotate-3 -z-10"></div>
          <div className="rounded-[40px] overflow-hidden border-4 border-white shadow-2xl relative h-[400px] md:h-[550px] w-full">
            {HERO_IMAGES.map((src, index) => (
              <img
                key={src}
                src={src}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentHeroImage ? 'opacity-100' : 'opacity-0'}`}
                alt={`Maternidad y crianza respetuosa ${index + 1}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#7a533c]/40 to-transparent"></div>

            {/* Controles del carrusel */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
              {HERO_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroImage(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === currentHeroImage ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80 w-2.5'}`}
                  aria-label={`Ir a la imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Colaboradores */}
      <section id="event" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-[#7a533c] mb-4">Fiesta de Primavera 🌸</h3>
            <p className="text-[#bc7948] max-w-xl mx-auto">Un encuentro de emprendedores enfocado a la crianza consciente en un entorno privilegiado.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborators.map((c, i) => (
              <div key={i} className={`${c.color} p-8 rounded-[35px] border border-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1`}>
                <h4 className="font-bold text-xl text-[#7a533c] mb-2">{c.name}</h4>
                <p className="text-sm text-[#7a533c]/70 leading-relaxed">{c.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Agenda */}
      <section id="agenda" className="py-24 px-6" style={{ backgroundImage: 'radial-gradient(#f9d7d6 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-[#7a533c] mb-2">Agenda del Día</h3>
            <p className="text-[#bc7948] text-xs font-bold tracking-[0.3em] uppercase">Sábado 10:00 - 14:00</p>
          </div>
          <div className="space-y-8 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#f9d7d6] -translate-x-1/2"></div>
            {agenda.map((slot, idx) => (
              <div key={idx} className="relative">
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bg-[#eab355] text-white px-3 py-1 rounded-full text-[10px] font-bold z-10 shadow-sm">{slot.time}</div>
                {slot.type === 'joint' ? (
                  <div className="flex justify-center">
                    <div className="bg-white p-6 rounded-3xl border border-[#f9d7d6] w-full md:w-2/3 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="md:hidden text-[10px] font-bold text-[#eab355] block mb-1">{slot.time}</span>
                      <h5 className="font-bold text-[#7a533c] text-lg">{slot.title}</h5>
                      <p className="text-sm text-[#bc7948] mt-1">{slot.desc}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-[#fef0d8] p-6 rounded-3xl border-r-4 border-[#eab355] text-right shadow-sm hover:shadow-md transition-shadow">
                      <span className="md:hidden text-[10px] font-bold text-[#7a533c] block mb-2 text-left">{slot.time}</span>
                      <h5 className="font-bold text-[#7a533c] text-lg">{slot.left.title}</h5>
                      <p className="text-[11px] text-[#bc7948] font-bold uppercase tracking-wider mt-1">{slot.left.author}</p>
                    </div>
                    <div className="flex-1 bg-[#e6eff5] p-6 rounded-3xl border-l-4 border-[#5d7b93] shadow-sm hover:shadow-md transition-shadow">
                      <h5 className="font-bold text-[#7a533c] text-lg">{slot.right.title}</h5>
                      <p className="text-[11px] text-[#bc7948] font-bold uppercase tracking-wider mt-1">{slot.right.author}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafetería */}
      <section id="cafe" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-[#fef0d8] px-4 py-2 rounded-full text-[#eab355] font-bold text-xs mb-6">
              <IconCoffee /> CAFETERÍA SALUDABLE
            </div>
            <h3 className="text-4xl font-black text-[#7a533c] mb-6 leading-tight">Un tentempié <br />consciente</h3>
            <div className="space-y-4">
              {menuItems.map((m, i) => (
                <div key={i} className="flex justify-between border-b border-[#fdfbf7] pb-3">
                  <span className="font-bold text-base text-[#7a533c]">{m.item}</span>
                  <span className="font-bold text-base text-[#5d7b93]">{m.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-2 text-[#bc7948] text-xs font-bold uppercase tracking-widest">
              <IconMap /> GODELLA, VALENCIA
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <img src="https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1887&auto=format&fit=crop" className="rounded-3xl h-64 w-full object-cover shadow-md" alt="Café" />
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1770&auto=format&fit=crop" className="rounded-3xl h-64 w-full object-cover mt-8 shadow-md" alt="Comida saludable" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-[#fdfbf7] border-t border-[#f9d7d6] text-center">
        <MessyMoodLogo className="w-16 h-16 mx-auto mb-6" />
        <h4 className="font-black text-2xl text-[#7a533c] tracking-tighter">MESSY & MOOD</h4>
        <p className="text-[10px] font-bold tracking-[0.4em] text-[#bc7948] mt-2 uppercase">Valencia · Kids & Fun · {new Date().getFullYear()}</p>
        <div className="mt-8 flex justify-center gap-6 text-[#bc7948]">
          <span className="text-[10px] font-bold cursor-pointer hover:text-[#eab355] transition-colors">INSTAGRAM</span>
          <span className="text-[10px] font-bold cursor-pointer hover:text-[#eab355] transition-colors">FACEBOOK</span>
        </div>
      </footer>
    </div>
  );
}