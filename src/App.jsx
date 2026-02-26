import React, { useState, useEffect } from 'react';

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

      const response = await fetch('http://localhost:5678/webhook/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

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

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#f9d7d6] selection:text-[#7a533c]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#fdfbf7]/95 backdrop-blur-md z-50 border-b border-[#f9d7d6] px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <MessyMoodLogo className="w-10 h-10" />
          <h1 className="font-black text-lg text-[#7a533c] tracking-tight">MESSY MOOD</h1>
        </div>
        <div className="hidden md:flex gap-8 font-bold text-xs tracking-widest text-[#7a533c]">
          <a href="#event" className="hover:text-[#eab355] transition-colors">EL EVENTO</a>
          <a href="#agenda" className="hover:text-[#eab355] transition-colors">AGENDA</a>
          <a href="#cafe" className="hover:text-[#eab355] transition-colors">CAFETERÍA</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setView('formulario')} className="bg-[#eab355] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-[#d9a040] transition-colors">RESERVAR</button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#7a533c]">
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
        </div>
      )}

      {/* Hero */}
      <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="bg-[#f9d7d6] text-[#bc7948] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Planazos y Momentazos</span>
          <h2 className="text-5xl md:text-7xl font-black text-[#7a533c] mb-6 leading-[1.1]">Diversión <br/><span className="text-[#eab355]">Messy & Fun</span></h2>
          <p className="text-[#bc7948] mb-10 text-lg leading-relaxed max-w-md mx-auto md:mx-0">Talleres sensoriales y experiencias únicas para disfrutar de la crianza consciente en familia.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button onClick={() => setView('formulario')} className="bg-[#5d7b93] hover:bg-[#4a6378] transition-colors text-white px-10 py-4 rounded-full font-bold shadow-xl">PRÓXIMOS TALLERES</button>
            <a href="#event" className="border border-[#f9d7d6] hover:bg-[#f9d7d6]/30 transition-colors text-[#7a533c] px-10 py-4 rounded-full font-bold text-center">EL EVENTO</a>
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <div className="bg-[#eab355]/20 absolute inset-0 rounded-[40px] rotate-3 -z-10"></div>
          <div className="rounded-[40px] overflow-hidden border-4 border-white shadow-2xl">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1840&auto=format&fit=crop" className="w-full h-[400px] md:h-[550px] object-cover" alt="Taller Messy" />
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
            <h3 className="text-4xl font-black text-[#7a533c] mb-6 leading-tight">Un tentempié <br/>consciente</h3>
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