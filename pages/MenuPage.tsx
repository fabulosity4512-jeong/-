
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';
import { Category } from '../types';

export const MenuPage: React.FC = () => {
  const { menus } = useData();
  const [filter, setFilter] = useState<Category>('All');

  const categories: { label: string; value: Category }[] = [
    { label: '전체', value: 'All' },
    { label: '☕ 커피·음료', value: 'Drinks' },
    { label: '🥪 브런치 세트', value: 'Brunch' },
    { label: '🍰 디저트 세트', value: 'Dessert' },
    { label: '🍓 행사 맞춤 세트', value: 'Special' },
  ];

  const filteredMenus = filter === 'All' ? menus : menus.filter(m => m.category === filter);

  return (
    <div className="pt-32 pb-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-red-700 font-bold uppercase tracking-widest text-sm">Our Selection</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">제공 메뉴 안내</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            신선한 식자재와 감각적인 플레이팅으로 행사의 분위기를 고조시킵니다.<br />
            모든 메뉴는 인원과 예산에 맞춰 커스터마이징이 가능합니다.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                filter === cat.value 
                  ? 'bg-red-700 text-white shadow-lg' 
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredMenus.map((menu) => (
            <div key={menu.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={menu.imageUrls[0]} 
                  alt={menu.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-red-700 uppercase shadow-sm">
                    {menu.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">{menu.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 h-10 line-clamp-2">
                  {menu.description}
                </p>
                
                <div className="space-y-3 pt-6 border-t border-stone-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400 font-medium">최소 주문 수량</span>
                    <span className="text-stone-900 font-bold">{menu.minOrder}인분</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-stone-400 font-medium">예상 가격대</span>
                    <span className="text-red-700 font-bold text-lg">{menu.priceInfo}</span>
                  </div>
                </div>

                <Link 
                  to={`/contact?menu=${encodeURIComponent(menu.name)}`}
                  className="mt-8 w-full block text-center py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-stone-200"
                >
                  견적문의
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMenus.length === 0 && (
          <div className="py-20 text-center text-stone-400">
            해당 카테고리의 메뉴를 준비 중입니다. 맞춤 구성을 원하시면 문의해 주세요.
          </div>
        )}
      </div>
    </div>
  );
};
