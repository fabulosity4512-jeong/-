
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Presentation, 
  Mic2, 
  GraduationCap, 
  Flag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  Utensils
} from 'lucide-react';
import { useData } from '../DataContext';

export const Home: React.FC = () => {
  const { menus, gallery, hygiene } = useData();
  const mainHygieneItem = hygiene[0] || { imageUrl: 'https://images.unsplash.com/photo-1595273670150-db0d3bf39241?q=80&w=800' };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.45]"
            alt="Main catering background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <span className="inline-block text-red-400 font-black mb-6 tracking-[0.2em] text-sm animate-fade-in uppercase bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">Premium Catering Service</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
            기업 행사에 품격을 더하는<br />
            <span className="text-red-600">푸드매니저</span> 케이터링
          </h1>
          <p className="text-lg md:text-2xl text-stone-200 mb-12 max-w-2xl leading-relaxed font-medium drop-shadow-lg">
            단순한 다과를 넘어 브랜드의 가치를 전달합니다.<br />
            세미나, 워크숍, VIP 행사를 위한 전문 케이터링 솔루션.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/contact" className="bg-red-700 hover:bg-red-800 text-white px-10 py-5 rounded-xl font-black text-xl text-center transition-all flex items-center justify-center gap-3 shadow-2xl shadow-red-900/40 hover:-translate-y-1 active:scale-95">
              무료 견적 신청 <ArrowRight size={24} />
            </Link>
            <Link to="/menu" className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/30 px-10 py-5 rounded-xl font-black text-xl text-center transition-all hover:-translate-y-1 active:scale-95">
              메뉴 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended For */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-stone-900">Perfect Match For Your Event</h2>
            <p className="text-stone-500 text-lg font-medium">푸드매니저의 전문 케이터링이 필요한 모든 순간을 함께합니다.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: <Building2 />, title: '기업 세미나' },
              { icon: <Users />, title: '워크숍/연수' },
              { icon: <Flag />, title: '박람회/부스' },
              { icon: <Mic2 />, title: '기자간담회' },
              { icon: <GraduationCap />, title: '학교 행사' },
              { icon: <Presentation />, title: '관공서 행사' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-8 border border-stone-100 rounded-3xl hover:shadow-2xl hover:border-red-100 hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-20 h-20 bg-stone-50 text-red-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 40 })}
                </div>
                <span className="font-black text-stone-900 text-lg">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-stone-900">Our Signature Collections</h2>
              <p className="text-stone-500 text-lg font-medium">참석자의 오감을 사로잡는 프리미엄 다과 구성을 만나보세요.</p>
            </div>
            <Link to="/menu" className="flex items-center gap-2 text-red-700 font-black text-lg hover:gap-4 transition-all group">
              전체 메뉴 보기 <ArrowRight size={24} className="group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menus.slice(0, 4).map((menu) => (
              <div key={menu.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-stone-200/50 group border border-transparent hover:border-red-200 transition-all duration-500">
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={menu.imageUrls[0]} 
                    alt={menu.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/95 backdrop-blur-md text-red-700 text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">{menu.category}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black mt-2 mb-4 text-stone-900">{menu.name}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2 mb-8 font-medium leading-relaxed">{menu.description}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-stone-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-stone-400 font-black uppercase">Capacity</span>
                      <span className="text-stone-900 font-bold">최소 {menu.minOrder}인</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-stone-400 font-black uppercase">Estimate</span>
                      <span className="font-black text-red-700 text-lg">{menu.priceInfo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hygiene and Reliability Section */}
      <section className="py-32 bg-stone-950 text-white relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-12 leading-[1.1] tracking-tight">
              B2B 행사의 완성은<br />
              <span className="text-red-700 italic">완벽한 위생</span>입니다
            </h2>
            <div className="space-y-10">
              {[
                { icon: <ShieldCheck className="text-red-600" />, title: '기업 전담 위생 관리 매뉴얼', desc: '모든 조리 공정은 3단계 위생 체크리스트를 통과해야 합니다.' },
                { icon: <CheckCircle2 className="text-red-600" />, title: '행사 당일 라이브 조리 원칙', desc: '배송 직전 완성하여 최상의 신선도와 플레이팅을 약속합니다.' },
                { icon: <Truck className="text-red-600" />, title: '스마트 콜드체인 물류', desc: '실시간 온도 관제가 가능한 전용 차량으로 안전하게 배송합니다.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="mt-1 p-3 bg-white/5 rounded-2xl border border-white/10">{item.icon}</div>
                  <div>
                    <h4 className="text-xl font-black mb-2 text-stone-100">{item.title}</h4>
                    <p className="text-stone-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/hygiene" className="mt-16 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-10 py-4 rounded-xl text-lg font-black transition-all hover:gap-4 group">
              위생 정책 리포트 보기 <ArrowRight className="group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl relative group">
              <img 
                src={mainHygieneItem.imageUrl} 
                alt="Professional Catering Service"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12">
                <p className="text-red-600 text-sm font-black uppercase tracking-[0.3em] mb-2">Since 2012</p>
                <p className="text-3xl font-black text-white">압도적인 신뢰의 기록</p>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-red-700 p-10 rounded-3xl shadow-3xl animate-bounce-slow">
              <p className="text-6xl font-black text-white mb-2">100%</p>
              <p className="text-xs font-black uppercase tracking-widest text-red-200">Safety Compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-stone-900">Portfolio & Cases</h2>
            <p className="text-stone-500 text-lg font-medium">수많은 글로벌 기업들과 함께한 성공적인 케이터링 현장입니다.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {gallery.map((item) => (
              <div key={item.id} className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-stone-200 cursor-pointer">
                <img src={item.imageUrls[0]} alt={item.title} className="w-full aspect-[3/4] object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0">
                  <span className="text-red-500 text-xs font-black uppercase mb-3 tracking-widest">{item.type}</span>
                  <h4 className="text-white text-3xl font-black mb-4 leading-tight">{item.title}</h4>
                  <p className="text-stone-400 text-sm font-medium line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-32 bg-stone-50 overflow-hidden relative">
        <Utensils className="absolute -top-20 -right-20 text-stone-100/50" size={500} strokeWidth={0.5} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="text-red-700 mb-10 flex justify-center gap-1">
            {[1,2,3,4,5].map(i => <span key={i} className="text-3xl text-red-600">★</span>)}
          </div>
          <p className="text-2xl md:text-4xl font-black italic text-stone-900 leading-[1.4] mb-12 tracking-tight">
            "B2B 행사는 디테일이 생명인데, 푸드매니저는 세팅부터 맛까지 흠잡을 데가 없습니다.<br className="hidden md:block" />
            참석자들의 감탄이 끊이지 않았던 완벽한 선택이었습니다."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-700 font-black text-xl">K</div>
            <p className="font-black text-xl text-stone-900">○○금융그룹 경영지원팀 김○○ 팀장님</p>
            <p className="text-sm text-stone-500 font-bold mt-1 uppercase tracking-widest">Global Finance Summit 2024</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-red-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Success starts with Catering.</h2>
            <p className="text-red-100 text-xl font-medium">행사 일정에 맞춰 지금 바로 전문 매니저의 제안을 받아보세요.</p>
          </div>
          <Link to="/contact" className="bg-white text-red-800 px-12 py-6 rounded-[1.5rem] font-black text-2xl shadow-3xl transition-all hover:-translate-y-2 hover:scale-105 active:scale-95 whitespace-nowrap">
            지금 무료 견적 받기
          </Link>
        </div>
      </section>
    </div>
  );
};
