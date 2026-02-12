
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import { Send, Phone, MessageSquare, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addInquiry, settings } = useData();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    date: '',
    attendees: 30,
    location: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry(formData);
    
    // 이메일 알림 시뮬레이션
    console.log(`[Notification] Sending inquiry details to: ${settings.notificationEmail}`);
    console.log(`[Details] From: ${formData.company} (${formData.name}), Date: ${formData.date}, Message: ${formData.message}`);
    
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-32 max-w-xl mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Send size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-stone-900">견적 문의가 성공적으로 접수되었습니다.</h1>
        <p className="text-stone-500 mb-10 leading-relaxed font-medium">
          푸드매니저를 선택해 주셔서 감사합니다.<br />
          담당자(${settings.notificationEmail})가 내용을 검토한 후 1시간 이내에 연락드리겠습니다.<br />
          급한 용무는 고객센터(010-6718-4512)로 전화 부탁드립니다.
        </p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-stone-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-xl active:scale-95"
        >
          홈으로 이동하기
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div className="lg:py-10">
            <span className="text-red-700 font-black uppercase tracking-widest text-sm bg-red-50 px-3 py-1 rounded-md">Consultation</span>
            <h1 className="text-4xl md:text-5xl font-black mt-6 mb-8 leading-tight text-stone-900">당신의 행사에<br />품격을 더해드립니다.</h1>
            <p className="text-stone-500 mb-12 text-lg leading-relaxed font-medium">
              행사의 목적, 인원, 예산을 남겨주시면<br />
              푸드매니저의 맞춤형 제안서를 보내드립니다.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-black text-stone-900 text-lg">1시간 이내 답변</h4>
                  <p className="text-stone-500 font-medium">영업시간(09:00~19:00) 내 문의 시 실시간 상담</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-black text-stone-900 text-lg">전화 상담</h4>
                  <p className="text-stone-500 font-medium">010-6718-4512 (월~금, 09:00~19:00)</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-black text-stone-900 text-lg">카카오톡 문의</h4>
                  <p className="text-stone-500 font-medium">카카오 채널: 푸드매니저</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-white rounded-3xl border border-stone-200 shadow-sm">
              <h5 className="font-black mb-4 text-stone-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                현재 예약 현황
              </h5>
              <p className="text-sm text-stone-500 font-medium mb-2">• 10월 주말 일부 마감</p>
              <p className="text-sm text-stone-500 font-medium">• 기업 정기 케이터링 상담 환영</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-stone-100">
            <h2 className="text-2xl font-black mb-10 text-stone-900">견적 문의 양식</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase mb-2 tracking-widest">회사/기관명</label>
                  <input 
                    required type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium transition-all"
                    placeholder="○○기업 / 학교 / 공공기관"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase mb-2 tracking-widest">담당자명</label>
                  <input 
                    required type="text" name="name" value={formData.name} onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium transition-all"
                    placeholder="성함 입력"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase mb-2 tracking-widest">연락처</label>
                  <input 
                    required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium transition-all"
                    placeholder="010-0000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase mb-2 tracking-widest">이메일</label>
                  <input 
                    required type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium transition-all"
                    placeholder="fmfm4512@naver.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase mb-2 tracking-widest">행사 날짜</label>
                  <input 
                    required type="date" name="date" value={formData.date} onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase mb-2 tracking-widest">예상 인원</label>
                  <input 
                    required type="number" name="attendees" value={formData.attendees} onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium transition-all"
                    placeholder="인원 입력"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-stone-400 uppercase mb-2 tracking-widest">행사 장소</label>
                <input 
                  required type="text" name="location" value={formData.location} onChange={handleChange}
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium transition-all"
                  placeholder="정확한 장소 또는 지역"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-stone-400 uppercase mb-2 tracking-widest">문의 내용</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange}
                  rows={4}
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium transition-all"
                  placeholder="예상 예산, 메뉴 구성 희망사항, 로고 스티커 제작 여부 등"
                ></textarea>
              </div>

              <p className="text-[11px] text-stone-400 text-center font-bold">
                개인정보 수집 및 이용에 동의하며 견적을 신청합니다.
              </p>

              <button 
                type="submit"
                className="w-full py-5 bg-red-700 text-white rounded-2xl font-black text-xl hover:bg-red-800 shadow-2xl shadow-red-900/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                견적 제안 요청하기 <Send size={24} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
