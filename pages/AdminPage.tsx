
import React, { useState, useRef } from 'react';
import { useData } from '../DataContext';
import { 
  Trash2, Plus, Edit, Lock, X, Upload, 
  ChevronRight, ChevronLeft, Image as ImageIcon, CheckCircle, Clock, ShieldCheck, Settings, Mail
} from 'lucide-react';
import { MenuItem, GalleryItem, HygieneItem } from '../types';

export const AdminPage: React.FC = () => {
  const { 
    menus, gallery, hygiene, inquiries, settings,
    deleteMenu, addMenu, updateMenu,
    deleteGallery, addGallery, updateGallery,
    updateHygiene,
    updateInquiryStatus, deleteInquiry, updateSettings
  } = useData();
  
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [tab, setTab] = useState<'menus' | 'gallery' | 'inquiries' | 'hygiene' | 'settings'>('inquiries');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'menu' | 'gallery' | 'hygiene'>('menu');
  
  // Form states
  const [formData, setFormData] = useState<any>({});
  const [settingsForm, setSettingsForm] = useState({ notificationEmail: settings.notificationEmail });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '4512') {
      setIsAuthorized(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const openAddModal = (type: 'menu' | 'gallery') => {
    setModalType(type);
    setEditingItem(null);
    if (type === 'menu') {
      setFormData({
        name: '', category: 'Drinks', description: '', 
        minOrder: 30, priceInfo: '', imageUrls: []
      });
    } else {
      setFormData({
        title: '', scale: '50', type: 'Seminar', 
        description: '', imageUrls: []
      });
    }
    setShowModal(true);
  };

  const openEditHygieneModal = (item: HygieneItem) => {
    setModalType('hygiene');
    setEditingItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const promise = new Promise<string>((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
      newImages.push(await promise);
    }

    if (modalType === 'hygiene') {
      setFormData((prev: any) => ({
        ...prev,
        imageUrl: newImages[0]
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        imageUrls: [...(prev.imageUrls || []), ...newImages]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSave = () => {
    if (modalType === 'menu') {
      const item: MenuItem = {
        id: editingItem?.id || Math.random().toString(36).substr(2, 9),
        ...formData
      };
      editingItem ? updateMenu(item) : addMenu(item);
    } else if (modalType === 'gallery') {
      const item: GalleryItem = {
        id: editingItem?.id || Math.random().toString(36).substr(2, 9),
        ...formData
      };
      editingItem ? updateGallery(item) : addGallery(item);
    } else if (modalType === 'hygiene') {
      updateHygiene(formData as HygieneItem);
    }
    setShowModal(false);
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  if (!isAuthorized) {
    return (
      <div className="pt-48 pb-32 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100 max-w-sm w-full">
          <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={24} />
          </div>
          <h1 className="text-xl font-bold text-center mb-6">Admin Access</h1>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-stone-200 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-red-700 focus:outline-none"
            placeholder="비밀번호 입력"
            autoFocus
          />
          <button className="w-full py-3 bg-stone-900 text-white rounded-lg font-bold hover:bg-black transition-all">
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h1 className="text-3xl font-bold">시스템 관리자</h1>
          <div className="flex bg-white rounded-lg shadow-sm p-1 border border-stone-100 overflow-x-auto max-w-full">
            <button 
              onClick={() => setTab('inquiries')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all whitespace-nowrap ${tab === 'inquiries' ? 'bg-red-700 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              문의 현황
            </button>
            <button 
              onClick={() => setTab('menus')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all whitespace-nowrap ${tab === 'menus' ? 'bg-red-700 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              메뉴 관리
            </button>
            <button 
              onClick={() => setTab('gallery')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all whitespace-nowrap ${tab === 'gallery' ? 'bg-red-700 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              갤러리 관리
            </button>
            <button 
              onClick={() => setTab('hygiene')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all whitespace-nowrap ${tab === 'hygiene' ? 'bg-red-700 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              위생 관리
            </button>
            <button 
              onClick={() => setTab('settings')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all whitespace-nowrap ${tab === 'settings' ? 'bg-red-700 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              환경 설정
            </button>
          </div>
        </div>

        {tab === 'inquiries' && (
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase">일시</th>
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase">회사/담당자</th>
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase">일정/장소</th>
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase">인원</th>
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase text-center">상태 관리</th>
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase text-center">삭제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-stone-50/50">
                      <td className="px-6 py-4 text-sm text-stone-500">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-stone-900">{inq.company}</div>
                        <div className="text-xs text-stone-400">{inq.name} | {inq.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium">{inq.date}</div>
                        <div className="text-xs text-stone-400">{inq.location}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">{inq.attendees}명</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <button 
                            onClick={() => updateInquiryStatus(inq.id, inq.status === 'pending' ? 'responded' : 'pending')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all ${
                              inq.status === 'pending' 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {inq.status === 'pending' ? (
                              <><Clock size={12} /> 상담 대기</>
                            ) : (
                              <><CheckCircle size={12} /> 상담 완료</>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => deleteInquiry(inq.id)}
                          className="p-2 text-stone-400 hover:text-red-500 hover:bg-stone-50 rounded-full transition-all"
                          title="삭제"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {inquiries.length === 0 && (
                <div className="py-20 text-center text-stone-300">신규 문의가 없습니다.</div>
              )}
            </div>
          </div>
        )}

        {tab === 'menus' && (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button 
                onClick={() => openAddModal('menu')}
                className="aspect-video rounded-xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 hover:border-red-700 hover:text-red-700 transition-all bg-white"
              >
                <Plus size={32} className="mb-2" />
                <span className="font-bold">새 메뉴 추가</span>
              </button>
              {menus.map((menu) => (
                <div key={menu.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex gap-4">
                  <img src={menu.imageUrls[0]} className="w-20 h-20 object-cover rounded-lg" alt="" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-stone-900">{menu.name}</h4>
                    <p className="text-xs text-stone-400 mb-2">{menu.category} | {menu.minOrder}인분</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setModalType('menu');
                          setEditingItem(menu);
                          setFormData({...menu});
                          setShowModal(true);
                        }}
                        className="p-1.5 text-stone-400 hover:text-red-700 hover:bg-stone-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteMenu(menu.id)}
                        className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-stone-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'gallery' && (
          <div className="grid md:grid-cols-3 gap-6">
            <button 
              onClick={() => openAddModal('gallery')}
              className="aspect-video rounded-xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 hover:border-red-700 hover:text-red-700 transition-all bg-white"
            >
              <Plus size={32} className="mb-2" />
              <span className="font-bold">갤러리 사진 추가</span>
            </button>
            {gallery.map((item) => (
              <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-video shadow-sm border border-stone-100 bg-white">
                <img src={item.imageUrls[0]} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={() => {
                      setModalType('gallery');
                      setEditingItem(item);
                      setFormData({...item});
                      setShowModal(true);
                    }}
                    className="p-3 bg-white text-stone-900 rounded-full hover:scale-110 transition-transform"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => deleteGallery(item.id)}
                    className="p-3 bg-white text-red-600 rounded-full hover:scale-110 transition-transform"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'hygiene' && (
          <div className="grid md:grid-cols-3 gap-6">
            {hygiene.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col">
                <div className="aspect-square rounded-xl overflow-hidden mb-4 relative group">
                  <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => openEditHygieneModal(item)}
                      className="p-3 bg-white text-stone-900 rounded-full hover:scale-110 transition-transform"
                    >
                      <Edit size={20} />
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-stone-900 mb-2">{item.title}</h4>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">{item.description}</p>
                <button 
                  onClick={() => openEditHygieneModal(item)}
                  className="mt-4 text-xs font-bold text-red-700 flex items-center gap-1 hover:gap-2 transition-all"
                >
                  수정하기 <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'settings' && (
          <div className="max-w-2xl bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-red-100 text-red-700 rounded-xl flex items-center justify-center">
                <Mail size={20} />
              </div>
              <h2 className="text-xl font-bold">알림 이메일 설정</h2>
            </div>
            <form onSubmit={handleSettingsSave} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase mb-2 tracking-widest">수신 이메일 주소</label>
                <input 
                  type="email" 
                  value={settingsForm.notificationEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, notificationEmail: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium transition-all"
                  placeholder="fmfm4512@naver.com"
                  required
                />
                <p className="mt-3 text-xs text-stone-400 leading-relaxed font-medium">
                  * 고객이 견적 문의를 제출할 때, 해당 이메일로 알림이 발송됩니다.<br />
                  * 현재 프론트엔드 환경에서는 시뮬레이션 알림이 작동합니다.
                </p>
              </div>
              <button 
                type="submit"
                className="bg-stone-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all flex items-center gap-2"
              >
                <CheckCircle size={18} /> 설정 저장하기
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Entry Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-up">
            <div className="sticky top-0 bg-white border-b border-stone-100 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">
                {modalType === 'hygiene' ? '위생 항목 수정' : (editingItem ? '정보 수정' : (modalType === 'menu' ? '새 메뉴 추가' : '새 현장 추가'))}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-stone-50 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className={modalType === 'hygiene' ? 'col-span-2' : ''}>
                  <label className="block text-xs font-bold text-stone-400 uppercase mb-2">
                    {modalType === 'menu' ? '메뉴 이름' : (modalType === 'hygiene' ? '항목 제목' : '행사 명')}
                  </label>
                  <input 
                    type="text" 
                    value={formData.name || formData.title || ''} 
                    onChange={(e) => setFormData({...formData, [modalType === 'menu' ? 'name' : 'title']: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                  />
                </div>
                {modalType !== 'hygiene' && (
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-2">분류</label>
                    <select 
                      value={formData.category || formData.type || ''} 
                      onChange={(e) => setFormData({...formData, [modalType === 'menu' ? 'category' : 'type']: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                    >
                      {modalType === 'menu' ? (
                        <>
                          <option value="Drinks">Drinks</option>
                          <option value="Brunch">Brunch</option>
                          <option value="Dessert">Dessert</option>
                          <option value="Special">Special</option>
                        </>
                      ) : (
                        <>
                          <option value="Seminar">Seminar</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Exhibition">Exhibition</option>
                          <option value="Vip">VIP</option>
                        </>
                      )}
                    </select>
                  </div>
                )}
              </div>

              {modalType === 'menu' ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-2">최소 주문량 (인원)</label>
                    <input 
                      type="number" 
                      value={formData.minOrder || 0} 
                      onChange={(e) => setFormData({...formData, minOrder: parseInt(e.target.value)})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-2">가격 정보</label>
                    <input 
                      type="text" 
                      value={formData.priceInfo || ''} 
                      onChange={(e) => setFormData({...formData, priceInfo: e.target.value})}
                      placeholder="예: 15,000원~ 또는 별도문의"
                      className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                    />
                  </div>
                </div>
              ) : modalType === 'gallery' ? (
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase mb-2">규모</label>
                  <select 
                    value={formData.scale || ''} 
                    onChange={(e) => setFormData({...formData, scale: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                  >
                    <option value="30">30인 규모</option>
                    <option value="50">50인 규모</option>
                    <option value="100+">100인 이상 규모</option>
                  </select>
                </div>
              ) : null}

              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase mb-2">상세 설명</label>
                <textarea 
                  rows={3}
                  value={formData.description || ''} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                ></textarea>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase mb-4">
                  {modalType === 'hygiene' ? '대표 사진 (로컬 이미지)' : '사진 관리 (로컬 이미지 여러 장 가능)'}
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {modalType === 'hygiene' ? (
                    formData.imageUrl && (
                      <div className="relative aspect-square group rounded-lg overflow-hidden border border-stone-100">
                        <img src={formData.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                    )
                  ) : (
                    formData.imageUrls?.map((url: string, index: number) => (
                      <div key={index} className="relative aspect-square group rounded-lg overflow-hidden border border-stone-100">
                        <img src={url} className="w-full h-full object-cover" alt="" />
                        <button 
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))
                  )}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 hover:text-red-700 hover:border-red-700 transition-all"
                  >
                    <Upload size={20} className="mb-1" />
                    <span className="text-[10px] font-bold uppercase">Upload</span>
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  multiple={modalType !== 'hygiene'}
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              <div className="pt-6 border-t border-stone-100 flex gap-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 bg-stone-100 text-stone-600 rounded-xl font-bold hover:bg-stone-200 transition-all"
                >
                  취소
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-4 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 shadow-xl shadow-red-700/20 transition-all"
                >
                  {modalType === 'hygiene' ? '수정 완료' : (editingItem ? '수정 완료' : '저장하기')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
