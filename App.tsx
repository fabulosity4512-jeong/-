
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './DataContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MenuPage } from './pages/MenuPage';
import { GalleryPage } from './pages/GalleryPage';
import { HygienePage } from './pages/HygienePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Placeholder pages for simpler components
const ServiceIntro = () => (
  <div className="pt-48 pb-32 max-w-4xl mx-auto px-6 text-center">
    <h1 className="text-4xl font-bold mb-8">서비스 소개</h1>
    <p className="text-stone-500 leading-relaxed text-lg mb-12">
      푸드매니저는 기업 행사 전문 파트너로서<br />
      최상의 맛과 감각적인 플레이팅을 제공합니다.
    </p>
    <div className="grid md:grid-cols-2 gap-8 text-left">
      <div className="p-8 bg-stone-50 rounded-2xl border border-stone-100">
        <h3 className="font-bold text-xl mb-4 text-red-700">Premium Branding</h3>
        <p className="text-sm text-stone-500">기업 로고 컵홀더, 맞춤 스티커, 브랜드 컬러 플레이팅으로 우리 기업만의 정체성을 담은 케이터링을 제공합니다.</p>
      </div>
      <div className="p-8 bg-stone-50 rounded-2xl border border-stone-100">
        <h3 className="font-bold text-xl mb-4 text-red-700">Full Service</h3>
        <p className="text-sm text-stone-500">단순 배송이 아닌 현장 세팅부터 행사 종료 후 뒷정리까지 올인원 서비스를 제공하여 담당자의 부담을 덜어드립니다.</p>
      </div>
    </div>
  </div>
);

const Process = () => (
  <div className="pt-48 pb-32 max-w-4xl mx-auto px-6">
    <h1 className="text-4xl font-bold text-center mb-16">진행 프로세스</h1>
    <div className="space-y-12">
      {[
        { step: '01', title: '문의 및 상담', desc: '홈페이지 또는 전화를 통해 행사의 일시, 장소, 인원을 전달해 주시면 담당자가 즉시 확인합니다.' },
        { step: '02', title: '맞춤 메뉴 제안', desc: '행사의 성격과 예산에 최적화된 메뉴 구성 및 견적서를 제안 드립니다.' },
        { step: '03', title: '계약 및 선입금', desc: '최종 메뉴와 견적을 확정한 후 예약을 확정합니다.' },
        { step: '04', title: '행사 준비 및 제조', desc: '행사 당일 신선한 식자재로 정성껏 음식을 조리하고 패키징합니다.' },
        { step: '05', title: '현장 세팅 및 운영', desc: '약속된 시간에 방문하여 정갈하게 세팅하고 행사가 원활히 진행되도록 서포트합니다.' },
        { step: '06', title: '마무리 및 정리', desc: '행사 종료 후 신속하고 깔끔하게 뒷정리를 진행합니다.' },
      ].map((item, i) => (
        <div key={i} className="flex gap-8 items-start relative">
          {i !== 5 && <div className="absolute top-12 left-6 w-0.5 h-16 bg-stone-100 hidden md:block"></div>}
          <div className="w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 z-10">
            {item.step}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-stone-500 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Reviews = () => (
  <div className="pt-48 pb-32 max-w-5xl mx-auto px-6">
    <h1 className="text-4xl font-bold text-center mb-16">고객 후기</h1>
    <div className="grid md:grid-cols-2 gap-8">
      {[
        { org: '현대○○ 자동차', event: '신차 런칭 부품 박람회', content: 'VIP분들이 너무 좋아하셨어요. 특히 위생복 입고 세팅해주시는 모습에 다들 믿음직스럽다고 하셨습니다.' },
        { org: '서울대학교 ○○연구소', event: '국제 심포지엄', content: '음식 맛은 말할 것도 없고, 외국인 교수님들을 위한 메뉴 구성도 탁월했습니다. 다음에도 꼭 이용할게요.' },
        { org: '○○ 테크놀로지', event: '사내 송년회', content: '갑작스러운 일정 변경에도 유연하게 대처해 주셔서 감사합니다. 세팅이 너무 예뻐서 사진 찍는 직원이 많았네요.' },
        { org: '대한○○공사', event: '정기 워크숍', content: '매번 이용하는 곳이지만 변함없는 퀄리티가 인상적입니다. 정갈하고 깔끔한 맛이 일품이에요.' },
      ].map((item, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
          <div className="text-red-600 mb-4">★★★★★</div>
          <p className="text-stone-700 font-medium mb-6 leading-relaxed">"{item.content}"</p>
          <div className="border-t border-stone-50 pt-4">
            <p className="font-bold text-sm text-stone-900">{item.org}</p>
            <p className="text-xs text-stone-400">{item.event}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<ServiceIntro />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/hygiene" element={<HygienePage />} />
            <Route path="/process" element={<Process />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
};

export default App;
