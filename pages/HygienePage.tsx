
import React from 'react';
import { ShieldCheck, CheckSquare, ClipboardCheck, Thermometer, UserCheck, Package } from 'lucide-react';
import { useData } from '../DataContext';

export const HygienePage: React.FC = () => {
  const { hygiene } = useData();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-red-700 font-bold uppercase tracking-widest text-sm">Commitment to Safety</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">위생·안전 관리 시스템</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            B2B 행사는 한 치의 실수도 용납되지 않습니다.<br />
            푸드매니저는 업계 최고 수준의 위생 프로토콜을 준수하며 가장 안전한 음식을 제공합니다.
          </p>
        </div>

        {/* Visual Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {hygiene.map((item) => (
            <div key={item.id} className="group">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Checklist Section */}
        <div className="bg-stone-50 rounded-3xl p-8 md:p-16 border border-stone-100">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">푸드매니저 위생 체크리스트</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
            {[
              { icon: <UserCheck />, title: "전 조리원 정기 건강진단 및 위생교육 이수", desc: "보건증 소지는 기본, 분기별 자체 위생 소양 교육을 실시합니다." },
              { icon: <Thermometer />, title: "식자재 콜드체인 관리", desc: "입고부터 조리 전까지 철저한 온도 기록관리를 통해 선도를 보장합니다." },
              { icon: <Package />, title: "HACCP 인증 정식 식자재 사용", desc: "검증된 유통 경로를 통해 확보한 최상급 원재료만을 고집합니다." },
              { icon: <ClipboardCheck />, title: "조리 공간 세스코 방역 관리", desc: "전문 방역 업체를 통해 매월 사업장 전체 위생 점검을 완료합니다." },
              { icon: <CheckSquare />, title: "현장 세팅 전용 위생 키트 운영", desc: "현장 세팅 시 전용 장갑, 마스크, 헤어캡 착용을 의무화합니다." },
              { icon: <ShieldCheck />, title: "생산물 배상 책임 보험 가입", desc: "만일의 사태에도 완벽한 책임을 다하기 위해 현대해상 보험에 가입되어 있습니다." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-white text-red-700 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">{item.title}</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
