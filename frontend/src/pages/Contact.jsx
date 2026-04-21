import { TbMail, TbBrandTwitter, TbBrandLinkedin, TbSend, TbMessage2 } from "react-icons/tb";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Halkan waxaad ku dari kartaa logic-ga fariinta lagu dirayo
    alert("Fariintaada waa la helay! Waad ku mahadsantahay xiriirkaaga.");
  };

  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Nala <span className="text-indigo-600">Xiriir</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Ma qabtaa su'aal ama ma u baahantahay caawinaad? Fadlan fariin noo soo dir, waxaan kuugu soo jawaabi doonaa sida ugu dhakhsaha badan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TbMessage2 className="text-indigo-600" size={24} /> Xogta Xiriirka
              </h2>
              
              <div className="space-y-6">
                {/* Email Item */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <TbMail size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Email-ka</p>
                    <p className="text-slate-500 text-sm">support@techblog.com</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-6 border-t border-slate-50">
                  <p className="text-sm font-bold text-slate-900 mb-4">Social Media</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
                      <TbBrandTwitter size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
                      <TbBrandLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
              <h3 className="font-bold text-lg mb-2">Halkan ayaan diyaar kuugu nahay!</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Kooxdayada waxay shaqeeyaan 24/7 si ay kuugu caawiyaan wixii cilad tignoolajiyada ah.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-2">
            <form 
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Magacaaga</label>
                  <input 
                    type="text" 
                    placeholder="Tusaale: Ahmed Ali"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email-kaaga</label>
                  <input 
                    type="email" 
                    placeholder="ahmed@tusaale.com"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Maxaan kugu caawinnaa?"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Fariintaada</label>
                <textarea 
                  rows="5"
                  placeholder="Halkan ku qor fariintaada..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full md:w-max px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Soo Dir Fariinta <TbSend size={20} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;