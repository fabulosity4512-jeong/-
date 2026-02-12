
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Mail, 
  Instagram, 
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '홈', path: '/' },
    { name: '서비스 소개', path: '/service' },
    { name: '제공 메뉴', path: '/menu' },
    { name: '현장 갤러리', path: '/gallery' },
    { name: '위생·안전', path: '/hygiene' },
    { name: '진행 프로세스', path: '/process' },
    { name: '고객 후기', path: '/reviews' },
    { name: '문의하기', path: '/contact' },
  ];

  // 메인 페이지가 아니거나 스크롤이 된 경우 헤더를 고체(Solid) 상태로 표시
  const isSolid = scrolled || location.pathname !== '/';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isSolid ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-black tracking-tight drop-shadow-md ${isSolid ? 'text-stone-950' : 'text-white'}`}>
          푸드<span className={isSolid ? 'text-red-700' : 'text-red-500'}>매니저</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`text-[15px] font-bold transition-all hover:scale-105 drop-shadow-lg ${
                isSolid 
                  ? (location.pathname === item.path ? 'text-red-700 underline underline-offset-4' : 'text-stone-800 hover:text-red-700') 
                  : (location.pathname === item.path ? 'text-red-400' : 'text-white hover:text-red-300')
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/admin" className={`text-xs font-bold px-3 py-1 rounded border transition-all ${isSolid ? 'text-stone-400 border-stone-200 hover:border-stone-400' : 'text-white/60 border-white/20 hover:border-white/60'}`}>ADMIN</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 rounded-md" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={isSolid ? 'text-stone-900' : 'text-white'} /> : <MenuIcon className={isSolid ? 'text-stone-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-stone-100 shadow-2xl p-6 flex flex-col space-y-4 animate-fade-in">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className={`text-lg font-bold border-b border-stone-50 pb-3 ${location.pathname === item.path ? 'text-red-700' : 'text-stone-800'}`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/admin" onClick={() => setIsOpen(false)} className="text-stone-400 text-sm font-bold pt-2">관리자 모드</Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16 border-b border-stone-800 pb-16 mb-12">
        <div className="col-span-1">
          <h2 className="text-white text-2xl font-black mb-6">푸드매니저</h2>
          <p className="text-sm leading-relaxed text-stone-400 font-medium">
            기업의 가치를 높이는 프리미엄 케이터링 서비스.<br />
            세미나, 워크숍, 박람회, 기업 행사의 품격을 책임집니다.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">서비스 안내</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/menu" className="hover:text-red-500 transition-colors">전체 메뉴 보기</Link></li>
            <li><Link to="/gallery" className="hover:text-red-500 transition-colors">현장 갤러리</Link></li>
            <li><Link to="/hygiene" className="hover:text-red-500 transition-colors">위생 관리 시스템</Link></li>
            <li><Link to="/contact" className="hover:text-red-500 transition-colors">견적 신청하기</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">고객 센터</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-center gap-3"><Phone size={18} className="text-red-600" /> 010-6718-4512</li>
            <li className="flex items-center gap-3"><Mail size={18} className="text-red-600" /> fmfm4512@naver.com</li>
            <li className="flex items-center gap-3"><MessageSquare size={18} className="text-red-600" /> 카카오톡: 푸드매니저</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">인증 및 보안</h3>
          <div className="flex gap-4 items-start">
            <ShieldCheck size={44} className="text-red-700 shrink-0" />
            <div className="text-xs text-stone-400 leading-normal font-medium">
              식품위생교육 이수 완료 업체<br />
              현대해상 생산물배상보험 가입<br />
              HACCP 인증 엄선 식자재 사용
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-stone-500 font-bold uppercase tracking-wider">
        <p>© 2024 FOOD MANAGER. All Rights Reserved.</p>
        <div className="flex gap-8">
          <Link to="/admin" className="hover:text-white transition-colors">ADMIN</Link>
          <span className="cursor-pointer hover:text-white transition-colors">개인정보처리방침</span>
          <span className="cursor-pointer hover:text-white transition-colors">이용약관</span>
        </div>
      </div>
    </footer>
  );
};

const StickyCTA: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4 pointer-events-none">
      <a 
        href="tel:010-6718-4512"
        className="pointer-events-auto bg-white text-stone-900 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border border-stone-100 hover:scale-110 transition-transform active:scale-95 md:hidden"
      >
        <Phone size={28} />
      </a>
      <Link 
        to="/contact"
        className="pointer-events-auto bg-red-700 text-white px-8 py-5 rounded-full flex items-center gap-3 shadow-2xl hover:bg-red-800 transition-all hover:-translate-y-1 active:scale-95 group"
      >
        <span className="font-extrabold text-lg">무료 견적 문의</span>
        <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  );
};
