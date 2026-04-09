import React, { useState } from 'react';
import { MapPin, Shield, Briefcase, Landmark, Menu, Bell, Search, Map as MapIcon, Navigation, ChevronRight, HeartPulse, Pill, Camera, X, Plus, MessageSquare, Heart, Image, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MapPinItem = ({ top, left, color, icon, pulse }: { top: string, left: string, color: string, icon: React.ReactNode, pulse?: boolean }) => (
  <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
    <div className="relative">
      {pulse && <div className={`absolute inset-0 rounded-full ${color} opacity-40 animate-ping`}></div>}
      <div className={`w-8 h-8 rounded-full ${color} shadow-lg border-2 border-white flex items-center justify-center relative z-10`}>
        {icon}
      </div>
      {/* Pin shadow */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-black/20 rounded-full blur-[1px]"></div>
    </div>
  </div>
);

const AbstractMap = ({ showMyLocation, onLocate, onOpenFullMap }: { showMyLocation?: boolean, onLocate?: () => void, onOpenFullMap?: () => void }) => (
  <div className="relative w-full h-full bg-theme-border rounded-[1.5rem] overflow-hidden shadow-[inset_4px_-4px_8px_#d1d1d9,inset_-4px_4px_8px_#ffffff]">
    {/* Map graphic */}
    <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      {/* River */}
      <path d="M-20,50 Q40,80 80,40 T220,90" fill="none" stroke="var(--color-river-blue)" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
      <path d="M-20,50 Q40,80 80,40 T220,90" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      
      {/* Roads */}
      <path d="M40,-20 L60,220" fill="none" stroke="#fff" strokeWidth="4" />
      <path d="M120,-20 L90,220" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M-20,140 L220,120" fill="none" stroke="#fff" strokeWidth="5" />
    </svg>
    
    {/* Pins */}
    <MapPinItem top="35%" left="45%" color="bg-terracotta" icon={<HeartPulse size={14} className="text-white" />} pulse />
    <MapPinItem top="65%" left="30%" color="bg-jute-green" icon={<Pill size={14} className="text-white" />} />
    <MapPinItem top="50%" left="75%" color="bg-river-blue" icon={<Shield size={14} className="text-white" />} />
    <MapPinItem top="20%" left="65%" color="bg-gray-700" icon={<Landmark size={14} className="text-white" />} />
    
    {showMyLocation && (
      <MapPinItem top="55%" left="50%" color="bg-blue-500" icon={<div className="w-3 h-3 bg-white rounded-full" />} pulse />
    )}

    {/* Glassmorphic overlay for map controls */}
    <div className="absolute bottom-3 right-3 flex flex-col gap-2">
      <button onClick={onOpenFullMap} className="w-10 h-10 rounded-full neu-glass flex items-center justify-center text-main hover:text-river-blue transition-colors" title="Open Interactive Map">
        <Maximize size={18} />
      </button>
      <button onClick={onLocate} className="w-10 h-10 rounded-full neu-glass flex items-center justify-center text-main hover:text-river-blue transition-colors" title="My Location">
        <Navigation size={18} />
      </button>
    </div>
  </div>
);

const NavItem = ({ icon, active, onClick }: { icon: React.ReactNode, active?: boolean, onClick?: () => void }) => (
  <div onClick={onClick} className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${active ? 'neu-pressed text-river-blue' : 'text-light hover:text-muted'}`}>
    {icon}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [theme, setTheme] = useState('light');
  const [customBg, setCustomBg] = useState<string | null>(null);
  const [gigFilter, setGigFilter] = useState('');
  const [showMyLocation, setShowMyLocation] = useState(false);
  const [isFullMapOpen, setIsFullMapOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Hridoy Khan',
    status: 'Verified Resident',
    location: 'Pabna Sadar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pabna'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  const [posts, setPosts] = useState([
    { id: 1, author: 'Rahim Uddin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahim', content: 'Just visited the Hardinge Bridge today. The weather was amazing!', image: null as string | null, likes: 12, comments: [{ id: 1, author: 'Karim', text: 'Great view!' }] },
    { id: 2, author: 'Ayesha Siddiqua', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha', content: 'Does anyone know a good electrician in Shalgaria?', image: null as string | null, likes: 3, comments: [] }
  ]);
  const [newPost, setNewPost] = useState({ content: '', image: null as string | null });
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editPostContent, setEditPostContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [feedSearch, setFeedSearch] = useState('');

  const [gigs, setGigs] = useState([
    { id: 1, title: 'Need a plumber ASAP', price: '৳500', loc: 'Radhanagar', color: 'text-jute-green', image: null as string | null },
    { id: 2, title: 'Math Tutor for Class 10', price: 'Negotiable', loc: 'Shalgaria', color: 'text-river-blue', image: null as string | null },
    { id: 3, title: 'Delivery Boy Needed', price: '৳300/day', loc: 'Dilalpur', color: 'text-terracotta', image: null as string | null }
  ]);
  const [newGig, setNewGig] = useState({ title: '', price: '', loc: '', image: null as string | null });

  const renderModalContent = () => {
    switch(activeModal) {
      case 'emergency':
        return (
          <div className="flex flex-col gap-4">
            <div className="neu-flat rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full neu-pressed flex items-center justify-center text-terracotta"><HeartPulse size={18} /></div>
                <div>
                  <h4 className="font-bold text-main text-sm">Pabna General Hospital</h4>
                  <p className="text-[10px] text-muted">Ambulance: +880 731-66066</p>
                </div>
              </div>
              <a href="tel:+88073166066" className="px-4 py-2 rounded-full bg-terracotta text-white text-xs font-bold shadow-lg shadow-terracotta/30 active:scale-95 transition-transform flex items-center justify-center">Call</a>
            </div>
            <div className="neu-flat rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full neu-pressed flex items-center justify-center text-river-blue"><Shield size={18} /></div>
                <div>
                  <h4 className="font-bold text-main text-sm">Pabna Sadar Police</h4>
                  <p className="text-[10px] text-muted">Emergency: 999</p>
                </div>
              </div>
              <a href="tel:999" className="px-4 py-2 rounded-full bg-river-blue text-white text-xs font-bold shadow-lg shadow-river-blue/30 active:scale-95 transition-transform flex items-center justify-center">Call</a>
            </div>
          </div>
        );
      case 'gov':
        return (
          <div className="flex flex-col gap-4">
            <div className="neu-flat rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center text-jute-green"><Landmark size={20} /></div>
              <div><h4 className="font-bold text-main text-sm">Birth Registration</h4><p className="text-[10px] text-muted">Apply or download certificate</p></div>
            </div>
            <div className="neu-flat rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center text-jute-green"><Briefcase size={20} /></div>
              <div><h4 className="font-bold text-main text-sm">NID Services</h4><p className="text-[10px] text-muted">Correction and updates</p></div>
            </div>
          </div>
        );
      case 'tourist':
        return (
          <div className="flex flex-col gap-4">
            <div className="neu-flat rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center text-river-blue"><Camera size={20} /></div>
              <div><h4 className="font-bold text-main text-sm">Hardinge Bridge</h4><p className="text-[10px] text-muted">Historic railway bridge</p></div>
            </div>
            <div className="neu-flat rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center text-river-blue"><MapPin size={20} /></div>
              <div><h4 className="font-bold text-main text-sm">Jor Bangla Temple</h4><p className="text-[10px] text-muted">Ancient terracotta architecture</p></div>
            </div>
          </div>
        );
      case 'createGig':
        return (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-main">Post a Gig</h2>
            <input type="text" placeholder="Gig Title" className="neu-pressed rounded-xl px-4 py-3 text-sm text-main outline-none bg-transparent" value={newGig.title} onChange={e => setNewGig({...newGig, title: e.target.value})} />
            <input type="text" placeholder="Price (e.g. ৳500)" className="neu-pressed rounded-xl px-4 py-3 text-sm text-main outline-none bg-transparent" value={newGig.price} onChange={e => setNewGig({...newGig, price: e.target.value})} />
            <input type="text" placeholder="Location" className="neu-pressed rounded-xl px-4 py-3 text-sm text-main outline-none bg-transparent" value={newGig.loc} onChange={e => setNewGig({...newGig, loc: e.target.value})} />
            
            <div className="neu-pressed rounded-xl p-4 flex flex-col items-center justify-center gap-2 relative overflow-hidden h-32">
              {newGig.image ? (
                <img src={newGig.image} className="absolute inset-0 w-full h-full object-cover" alt="Gig preview" />
              ) : (
                <>
                  <Camera size={24} className="text-muted" />
                  <span className="text-xs text-muted font-medium">Tap to upload image</span>
                </>
              )}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const url = URL.createObjectURL(e.target.files[0]);
                  setNewGig({...newGig, image: url});
                }
              }} />
            </div>

            <button onClick={() => {
              if(newGig.title && newGig.price && newGig.loc) {
                setGigs([{ ...newGig, id: Date.now(), color: 'text-river-blue' }, ...gigs]);
                setActiveModal(null);
                setNewGig({ title: '', price: '', loc: '', image: null });
              }
            }} className="neu-flat rounded-xl py-3 text-sm font-bold text-river-blue mt-2 active:neu-pressed transition-all">Post Gig</button>
          </div>
        );
      case 'profile':
        return isEditingProfile ? (
          <div className="flex flex-col gap-4">
            <div className="neu-pressed rounded-xl p-4 flex flex-col items-center justify-center gap-2 relative overflow-hidden h-32 w-32 mx-auto rounded-full">
              <img src={editProfile.avatar} className="absolute inset-0 w-full h-full object-cover" alt="Avatar" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                <Camera size={24} className="text-white" />
              </div>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setEditProfile({...editProfile, avatar: URL.createObjectURL(e.target.files[0])});
                }
              }} />
            </div>
            <input type="text" className="neu-pressed rounded-xl px-4 py-3 text-sm text-main outline-none bg-transparent" value={editProfile.name} onChange={e => setEditProfile({...editProfile, name: e.target.value})} placeholder="Name" />
            <input type="text" className="neu-pressed rounded-xl px-4 py-3 text-sm text-main outline-none bg-transparent" value={editProfile.status} onChange={e => setEditProfile({...editProfile, status: e.target.value})} placeholder="Status" />
            <input type="text" className="neu-pressed rounded-xl px-4 py-3 text-sm text-main outline-none bg-transparent" value={editProfile.location} onChange={e => setEditProfile({...editProfile, location: e.target.value})} placeholder="Location" />
            <div className="flex gap-3 mt-2">
              <button onClick={() => { setProfile(editProfile); setIsEditingProfile(false); }} className="flex-1 neu-flat rounded-xl py-3 text-sm font-bold text-river-blue active:neu-pressed">Save</button>
              <button onClick={() => { setEditProfile(profile); setIsEditingProfile(false); }} className="flex-1 neu-flat rounded-xl py-3 text-sm font-bold text-terracotta active:neu-pressed">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full neu-pressed p-2">
                <img src={profile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <div className="neu-pressed rounded-2xl p-4 flex flex-col gap-3">
              <p className="text-sm text-main"><strong>Name:</strong> {profile.name}</p>
              <p className="text-sm text-main"><strong>Status:</strong> {profile.status}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-main"><strong>Location:</strong> {profile.location}</p>
                <button 
                  onClick={() => { 
                    setActiveModal(null); 
                    setActiveTab('home'); 
                    setShowMyLocation(true); 
                  }} 
                  className="w-8 h-8 rounded-full neu-flat flex items-center justify-center text-river-blue active:neu-pressed" 
                  title="View on Map"
                >
                  <MapIcon size={14} />
                </button>
              </div>
            </div>
            <button onClick={() => { setEditProfile(profile); setIsEditingProfile(true); }} className="neu-flat rounded-xl py-3 text-sm font-bold text-river-blue mt-2 active:neu-pressed">Edit Profile</button>
            <button onClick={() => setActiveModal(null)} className="neu-flat rounded-xl py-3 text-sm font-bold text-terracotta active:neu-pressed">Close</button>
          </div>
        );
      case 'saved':
        return (
          <div className="flex flex-col gap-4">
            <div className="neu-flat rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center text-river-blue"><MapPin size={20} /></div>
              <div><h4 className="font-bold text-main text-sm">Edward College</h4><p className="text-[10px] text-muted">Saved 2 days ago</p></div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="neu-flat rounded-2xl p-4 flex justify-between items-center">
                <span className="text-sm text-main font-medium">Push Notifications</span>
                <div className="w-10 h-6 rounded-full neu-pressed flex items-center px-1"><div className="w-4 h-4 rounded-full bg-river-blue"></div></div>
              </div>
              <div className="neu-flat rounded-2xl p-4 flex justify-between items-center cursor-pointer" onClick={() => setShowMyLocation(!showMyLocation)}>
                <span className="text-sm text-main font-medium">Location Services</span>
                <div className={`w-10 h-6 rounded-full neu-pressed flex items-center px-1 transition-colors ${showMyLocation ? 'bg-river-blue/20' : ''}`}>
                  <div className={`w-4 h-4 rounded-full transition-transform ${showMyLocation ? 'bg-river-blue translate-x-4' : 'bg-gray-400'}`}></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="flex flex-col gap-4">
            <div className="neu-pressed rounded-2xl p-4 text-sm text-main">
              <p>Need assistance? Contact our support team at:</p>
              <p className="font-bold text-river-blue mt-2">support@dearpabna.com</p>
              <p className="font-bold text-river-blue">01700-000000</p>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className={`h-screen w-full flex flex-col relative overflow-hidden ${customBg ? '' : 'bg-bg-neu'} ${theme === 'light' ? '' : `theme-${theme}`}`}>
      {customBg && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${customBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Top Right Controls (Theme & BG Upload) */}
      <div className="absolute right-4 top-4 z-50 flex gap-3 items-center">
        <label className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-xl border border-white/50 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" title="Upload Background">
          <Image size={18} className="text-gray-700" />
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setCustomBg(URL.createObjectURL(e.target.files[0]));
            }
          }} />
        </label>
        <button 
          onClick={() => {
            const themes = ['light', 'dark', 'nature', 'ocean'];
            setTheme(themes[(themes.indexOf(theme) + 1) % themes.length]);
            setCustomBg(null);
          }} 
          className="w-10 h-10 rounded-full shadow-xl border-2 border-white/50 hover:scale-105 transition-transform"
          style={{ background: 'conic-gradient(#f87171, #facc15, #4ade80, #60a5fa, #c084fc, #f87171)' }}
          title="Change Theme"
        ></button>
      </div>

      {/* Creator Info (Moved to bottom) */}
      <div className="absolute bottom-24 right-4 z-50">
        <div className="bg-white/80 backdrop-blur-md px-3 py-2 rounded-2xl shadow-xl border border-white/50 text-right">
          <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Created By</p>
          <p className="text-xs font-black text-gray-800 mt-0.5">HRIDOY HOSSAIN</p>
        </div>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 relative w-full max-w-2xl mx-auto">
          {/* Header */}
          <header className="pt-12 pb-4 px-6 flex items-center justify-between sticky top-0 bg-bg-neu/80 backdrop-blur-md z-40">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-main">Dear <span className="text-river-blue">Pabna</span></h1>
              <p className="text-[10px] font-bold text-light tracking-widest uppercase mt-0.5">
                {activeTab === 'home' ? 'Community Dashboard' : activeTab === 'search' ? 'Search' : activeTab === 'gigs' ? 'Local Gigs' : 'Menu'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full neu-flat flex items-center justify-center text-muted cursor-pointer active:neu-pressed transition-all">
              <Bell size={18} />
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.main 
                key="home"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="px-6 flex flex-col gap-6 mt-2"
              >
              {/* Map Section */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-[240px] w-full rounded-[2rem] neu-pressed p-2 relative"
              >
                 <AbstractMap showMyLocation={showMyLocation} onLocate={() => setShowMyLocation(true)} onOpenFullMap={() => setIsFullMapOpen(true)} />
              </motion.section>

              {/* Modules Grid */}
              <section className="flex flex-col gap-6">
                 {/* Community Feed Shortcut */}
                 <motion.div 
                   onClick={() => setActiveTab('feed')}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                   className="neu-flat rounded-[2rem] p-5 flex items-center justify-between cursor-pointer active:neu-pressed-sm transition-all border-2 border-river-blue/10"
                 >
                   <div className="flex items-center gap-4">
                     <div className="relative w-14 h-14 rounded-full neu-pressed flex items-center justify-center text-river-blue">
                       <MessageSquare size={24} className="relative z-10" />
                     </div>
                     <div>
                       <h3 className="font-bold text-main text-sm">Community Feed</h3>
                       <p className="text-[11px] text-muted font-medium mt-0.5">See what's happening in Pabna</p>
                     </div>
                   </div>
                   <div className="w-8 h-8 rounded-full neu-pressed-sm flex items-center justify-center">
                     <ChevronRight size={16} className="text-light" />
                   </div>
                 </motion.div>

                 {/* Emergency Services */}
                 <motion.div 
                   onClick={() => setActiveModal('emergency')}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                   className="neu-flat rounded-[2rem] p-5 flex items-center justify-between cursor-pointer active:neu-pressed-sm transition-all"
                 >
                   <div className="flex items-center gap-4">
                     <div className="relative w-14 h-14 rounded-full neu-pressed flex items-center justify-center">
                       <div className="absolute inset-0 rounded-full bg-terracotta opacity-20 animate-ping"></div>
                       <HeartPulse size={24} className="text-terracotta relative z-10" />
                     </div>
                     <div>
                       <h3 className="font-bold text-main text-sm">Emergency Services</h3>
                       <p className="text-[11px] text-muted font-medium mt-0.5">Hospitals, Fire, Police</p>
                     </div>
                   </div>
                   <div className="w-8 h-8 rounded-full neu-pressed-sm flex items-center justify-center">
                     <ChevronRight size={16} className="text-light" />
                   </div>
                 </motion.div>

                 {/* Tourist Attractions */}
                 <motion.div 
                   onClick={() => setActiveModal('tourist')}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                   className="neu-flat rounded-[2rem] p-5 flex flex-col gap-4 cursor-pointer"
                 >
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center text-river-blue">
                         <Camera size={20} />
                       </div>
                       <h3 className="font-bold text-main text-sm">Tourist Attractions</h3>
                     </div>
                   </div>
                   {/* Micro carousel */}
                   <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
                     {[
                       { id: 1, seed: 'monument', title: 'Hardinge Bridge' },
                       { id: 2, seed: 'temple', title: 'Jor Bangla' },
                       { id: 3, seed: 'palace', title: 'Tarash Bhaban' }
                     ].map(item => (
                       <div key={item.id} className="min-w-[120px] h-[80px] rounded-2xl neu-pressed-sm p-1.5 snap-center relative group">
                         <img src={`https://picsum.photos/seed/${item.seed}/200/150`} className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" alt={item.title} referrerPolicy="no-referrer" />
                         <div className="absolute bottom-2 left-2 right-2 bg-black/40 backdrop-blur-sm rounded text-[8px] text-white font-medium px-1.5 py-0.5 truncate">
                           {item.title}
                         </div>
                       </div>
                     ))}
                   </div>
                 </motion.div>

                 {/* Government Services */}
                 <motion.div 
                   onClick={() => setActiveModal('gov')}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                   className="neu-flat rounded-[2rem] p-5 flex items-center justify-between cursor-pointer active:neu-pressed-sm transition-all"
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-full neu-pressed flex items-center justify-center text-jute-green">
                       <Landmark size={24} />
                     </div>
                     <div>
                       <h3 className="font-bold text-main text-sm">Government Services</h3>
                       <p className="text-[11px] text-muted font-medium mt-0.5">E-services, Certificates</p>
                     </div>
                   </div>
                   <div className="w-8 h-8 rounded-full neu-pressed-sm flex items-center justify-center">
                     <ChevronRight size={16} className="text-light" />
                   </div>
                 </motion.div>

                 {/* Local Gigs */}
                 <motion.div 
                   onClick={() => setActiveTab('gigs')}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                   className="neu-flat rounded-[2rem] p-5 flex flex-col gap-4 cursor-pointer"
                 >
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center text-main">
                         <Briefcase size={20} />
                       </div>
                       <h3 className="font-bold text-main text-sm">Local Gigs</h3>
                     </div>
                     <span className="text-[9px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">New</span>
                   </div>
                   <div className="flex flex-col gap-3">
                     <div className="neu-pressed-sm rounded-2xl p-3.5 flex flex-col gap-2">
                       <div className="flex justify-between items-start">
                         <span className="text-xs font-bold text-main">Need a plumber ASAP</span>
                         <span className="text-xs font-black text-jute-green">৳500</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-[10px] text-muted font-medium">
                         <MapPin size={10} className="text-terracotta" /> <span>Radhanagar, Pabna</span>
                       </div>
                     </div>
                     <div className="neu-pressed-sm rounded-2xl p-3.5 flex flex-col gap-2">
                       <div className="flex justify-between items-start">
                         <span className="text-xs font-bold text-main">Math Tutor for Class 10</span>
                         <span className="text-xs font-black text-river-blue">Negotiable</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-[10px] text-muted font-medium">
                         <MapPin size={10} className="text-terracotta" /> <span>Shalgaria, Pabna</span>
                       </div>
                     </div>
                   </div>
                 </motion.div>
              </section>
            </motion.main>
          )}

          {activeTab === 'search' && (
            <motion.main key="search" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-6 flex flex-col gap-6 mt-2">
              <div className="neu-pressed rounded-full flex items-center px-4 py-3 gap-3">
                <Search size={18} className="text-light" />
                <input type="text" placeholder="Search Pabna..." className="bg-transparent border-none outline-none text-sm w-full text-main placeholder-gray-400" autoFocus />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold text-muted uppercase tracking-wider ml-2">Recent Searches</h3>
                {['Plumber in Shalgaria', 'Sadar Hospital Contact', 'Edward College Admission'].map((q, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                    className="neu-flat rounded-2xl p-4 text-sm text-main font-medium cursor-pointer active:neu-pressed-sm"
                  >
                    {q}
                  </motion.div>
                ))}
              </div>
            </motion.main>
          )}

          {activeTab === 'gigs' && (
            <motion.main key="gigs" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-6 flex flex-col gap-6 mt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-main">Available Gigs</h2>
                <button onClick={() => setActiveModal('createGig')} className="w-8 h-8 rounded-full neu-flat flex items-center justify-center text-terracotta active:neu-pressed transition-all"><Plus size={16} /></button>
              </div>
              
              <div className="neu-pressed rounded-full flex items-center px-4 py-3 gap-3">
                <Search size={18} className="text-light" />
                <input 
                  type="text" 
                  placeholder="Filter by location or title..." 
                  className="bg-transparent border-none outline-none text-sm w-full text-main placeholder-gray-400" 
                  value={gigFilter}
                  onChange={(e) => setGigFilter(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-4">
                {gigs.filter(gig => gig.loc.toLowerCase().includes(gigFilter.toLowerCase()) || gig.title.toLowerCase().includes(gigFilter.toLowerCase())).map((gig, i) => (
                  <motion.div 
                    key={gig.id} 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                    className="neu-flat rounded-2xl p-4 flex flex-col gap-3 cursor-pointer active:neu-pressed-sm"
                  >
                    {gig.image && (
                      <div className="w-full h-32 rounded-xl overflow-hidden neu-pressed-sm">
                        <img src={gig.image} alt={gig.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-main">{gig.title}</span>
                      <span className={`text-xs font-black ${gig.color}`}>{gig.price}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted font-medium">
                      <MapPin size={10} className="text-terracotta" /> <span>{gig.loc}, Pabna</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.main>
          )}

          {activeTab === 'feed' && (
            <motion.main key="feed" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-6 flex flex-col gap-6 mt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-main">Community Feed</h2>
              </div>

              {/* Facebook Group Banner */}
              <a href="https://www.facebook.com/share/g/1aUz3unauN/" target="_blank" rel="noopener noreferrer" className="neu-flat rounded-2xl p-4 flex items-center justify-between bg-[#1877F2]/5 border border-[#1877F2]/20 active:scale-95 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#1877F2]/30">f</div>
                  <div>
                    <h4 className="font-bold text-[#1877F2] text-sm">Pabna Facebook Group</h4>
                    <p className="text-[10px] text-[#1877F2]/70 font-medium">Tap to view live posts & images</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#1877F2]" />
              </a>

              {/* Search Feed */}
              <div className="neu-pressed rounded-full flex items-center px-4 py-3 gap-3">
                <Search size={18} className="text-light" />
                <input 
                  type="text" 
                  placeholder="Search posts or images..." 
                  className="bg-transparent border-none outline-none text-sm w-full text-main placeholder-gray-400" 
                  value={feedSearch}
                  onChange={(e) => setFeedSearch(e.target.value)}
                />
              </div>
              
              {/* Create Post */}
              <div className="neu-flat rounded-2xl p-4 flex flex-col gap-3">
                <textarea 
                  placeholder="What's on your mind?" 
                  className="bg-transparent border-none outline-none text-sm w-full text-main placeholder-gray-400 resize-none h-20 neu-pressed-sm p-3 rounded-xl"
                  value={newPost.content}
                  onChange={e => setNewPost({...newPost, content: e.target.value})}
                />
                {newPost.image && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden neu-pressed-sm">
                    <img src={newPost.image} className="w-full h-full object-cover" alt="Post preview" />
                    <button onClick={() => setNewPost({...newPost, image: null})} className="absolute top-2 right-2 bg-bg-neu/80 p-1 rounded-full text-terracotta"><X size={16}/></button>
                  </div>
                )}
                <div className="flex justify-between items-center mt-1">
                  <div className="relative w-8 h-8 rounded-full neu-flat flex items-center justify-center text-river-blue cursor-pointer">
                    <Camera size={14} />
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setNewPost({...newPost, image: URL.createObjectURL(e.target.files[0])});
                      }
                    }} />
                  </div>
                  <button 
                    onClick={() => {
                      if (newPost.content || newPost.image) {
                        setPosts([{ id: Date.now(), author: profile.name, avatar: profile.avatar, content: newPost.content, image: newPost.image, likes: 0, comments: [] }, ...posts]);
                        setNewPost({ content: '', image: null });
                      }
                    }}
                    className="px-4 py-2 neu-flat rounded-xl text-xs font-bold text-river-blue active:neu-pressed"
                  >
                    Post
                  </button>
                </div>
              </div>

              {/* Posts List */}
              <div className="flex flex-col gap-6">
                {posts.filter(post => post.content.toLowerCase().includes(feedSearch.toLowerCase()) || post.author.toLowerCase().includes(feedSearch.toLowerCase())).map((post, i) => (
                  <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="neu-flat rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={post.avatar} className="w-10 h-10 rounded-full neu-pressed p-0.5 object-cover" alt={post.author} />
                        <span className="font-bold text-sm text-main">{post.author}</span>
                      </div>
                      {post.author === profile.name && (
                        <button onClick={() => {
                          setEditingPostId(post.id);
                          setEditPostContent(post.content);
                        }} className="text-xs text-river-blue font-bold hover:underline">Edit</button>
                      )}
                    </div>
                    
                    {editingPostId === post.id ? (
                      <div className="flex flex-col gap-2 mt-2">
                        <textarea 
                          className="bg-transparent border-none outline-none text-sm w-full text-main resize-none h-20 neu-pressed-sm p-3 rounded-xl"
                          value={editPostContent}
                          onChange={e => setEditPostContent(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => setEditingPostId(null)} className="text-xs font-bold text-terracotta">Cancel</button>
                          <button onClick={() => {
                            setPosts(posts.map(p => p.id === post.id ? { ...p, content: editPostContent } : p));
                            setEditingPostId(null);
                          }} className="text-xs font-bold text-river-blue px-3 py-1 neu-flat rounded-lg">Save</button>
                        </div>
                      </div>
                    ) : (
                      post.content && <p className="text-sm text-main whitespace-pre-wrap">{post.content}</p>
                    )}
                    
                    {post.image && <img src={post.image} className="w-full rounded-xl neu-pressed-sm object-cover max-h-64 mt-2" alt="Post content" />}
                    
                    <div className="flex items-center gap-4 mt-2 pt-3 border-t border-gray-300/30">
                      <button 
                        onClick={() => {
                          setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p));
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-river-blue transition-colors"
                      >
                        <Heart size={16} className={post.likes > 0 ? 'text-terracotta fill-terracotta' : ''} /> {post.likes}
                      </button>
                      <button 
                        onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                        className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-river-blue transition-colors"
                      >
                        <MessageSquare size={16} /> {post.comments.length}
                      </button>
                    </div>

                    {/* Comments Section */}
                    {activeCommentPostId === post.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-col gap-3 mt-2">
                        <div className="flex flex-col gap-2">
                          {post.comments.map(c => (
                            <div key={c.id} className="neu-pressed-sm rounded-xl p-3 flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-river-blue">{c.author}</span>
                                {c.author === profile.name && (
                                  <button onClick={() => {
                                    setEditingCommentId(c.id);
                                    setEditCommentContent(c.text);
                                  }} className="text-[10px] text-muted hover:text-river-blue">Edit</button>
                                )}
                              </div>
                              {editingCommentId === c.id ? (
                                <div className="flex flex-col gap-2 mt-1">
                                  <input 
                                    type="text" 
                                    className="bg-transparent border-none outline-none text-xs w-full text-main border-b border-gray-300/30 pb-1"
                                    value={editCommentContent}
                                    onChange={e => setEditCommentContent(e.target.value)}
                                  />
                                  <div className="flex gap-2 justify-end">
                                    <button onClick={() => setEditingCommentId(null)} className="text-[10px] font-bold text-terracotta">Cancel</button>
                                    <button onClick={() => {
                                      setPosts(posts.map(p => p.id === post.id ? {
                                        ...p,
                                        comments: p.comments.map(comment => comment.id === c.id ? { ...comment, text: editCommentContent } : comment)
                                      } : p));
                                      setEditingCommentId(null);
                                    }} className="text-[10px] font-bold text-river-blue">Save</button>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-xs text-main">{c.text}</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 items-center mt-1">
                          <input 
                            type="text" 
                            placeholder="Write a comment..." 
                            className="flex-1 neu-pressed-sm rounded-xl px-3 py-2 text-xs text-main outline-none bg-transparent"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && newComment.trim()) {
                                setPosts(posts.map(p => p.id === post.id ? { ...p, comments: [...p.comments, { id: Date.now(), author: profile.name, text: newComment.trim() }] } : p));
                                setNewComment('');
                              }
                            }}
                          />
                          <button 
                            onClick={() => {
                              if (newComment.trim()) {
                                setPosts(posts.map(p => p.id === post.id ? { ...p, comments: [...p.comments, { id: Date.now(), author: profile.name, text: newComment.trim() }] } : p));
                                setNewComment('');
                              }
                            }}
                            className="w-8 h-8 rounded-full neu-flat flex items-center justify-center text-river-blue"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.main>
          )}

          {activeTab === 'menu' && (
            <motion.main key="menu" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-6 flex flex-col gap-6 mt-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="neu-flat rounded-[2rem] p-6 flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 rounded-full neu-pressed p-1">
                  <img src={profile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-main">{profile.name}</h3>
                  <p className="text-xs text-muted">{profile.status}</p>
                </div>
              </motion.div>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'profile', label: 'My Profile' },
                  { id: 'saved', label: 'Saved Places' },
                  { id: 'settings', label: 'Settings' },
                  { id: 'help', label: 'Help & Support' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    onClick={() => setActiveModal(item.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.1, ease: "easeOut" }}
                    className="neu-flat rounded-2xl p-4 text-sm text-main font-medium flex justify-between items-center cursor-pointer active:neu-pressed-sm"
                  >
                    {item.label} <ChevronRight size={16} className="text-light" />
                  </motion.div>
                ))}
              </div>
            </motion.main>
          )}
          </AnimatePresence>

          {/* Modal Overlay */}
          {activeModal && (
            <motion.div 
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-bg-neu/95 backdrop-blur-md flex flex-col max-w-2xl mx-auto"
            >
              <div className="p-6 pt-12 flex items-center justify-between border-b border-gray-300/30">
                <h2 className="text-xl font-bold text-main capitalize">
                  {activeModal === 'emergency' ? 'Emergency Services' : 
                   activeModal === 'gov' ? 'Government Services' : 
                   activeModal === 'tourist' ? 'Tourist Attractions' : 
                   activeModal === 'createGig' ? 'Post a Gig' :
                   activeModal === 'profile' ? 'My Profile' :
                   activeModal === 'saved' ? 'Saved Places' :
                   activeModal === 'settings' ? 'Settings' :
                   activeModal === 'help' ? 'Help & Support' : ''}
                </h2>
                <button onClick={() => setActiveModal(null)} className="w-10 h-10 rounded-full neu-flat flex items-center justify-center text-muted active:neu-pressed">
                  <div className="w-4 h-0.5 bg-gray-600 rotate-45 absolute"></div>
                  <div className="w-4 h-0.5 bg-gray-600 -rotate-45 absolute"></div>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 pb-24">
                {renderModalContent()}
              </div>
            </motion.div>
          )}
          {/* Full Interactive Map Modal */}
          <AnimatePresence>
            {isFullMapOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-[60] bg-bg-neu flex flex-col"
              >
                <div className="p-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm z-10 absolute top-0 left-0 right-0">
                  <h2 className="font-bold text-main">Interactive Map</h2>
                  <button onClick={() => setIsFullMapOpen(false)} className="w-10 h-10 rounded-full neu-flat flex items-center justify-center text-terracotta active:neu-pressed">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 w-full h-full pt-16">
                  <iframe 
                    src="https://maps.google.com/maps?q=Pabna,Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <nav className="w-full max-w-2xl h-20 bg-bg-neu neu-flat-sm rounded-t-[2.5rem] flex items-center justify-around px-6 pb-2 pointer-events-auto">
             <NavItem icon={<MapIcon size={22} />} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
             <NavItem icon={<Search size={22} />} active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
             <NavItem icon={<MessageSquare size={22} />} active={activeTab === 'feed'} onClick={() => setActiveTab('feed')} />
             <NavItem icon={<Briefcase size={22} />} active={activeTab === 'gigs'} onClick={() => setActiveTab('gigs')} />
             <NavItem icon={<Menu size={22} />} active={activeTab === 'menu'} onClick={() => setActiveTab('menu')} />
          </nav>
        </div>
      </div>
  );
}
