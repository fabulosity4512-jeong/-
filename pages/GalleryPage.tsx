
import React, { useState } from 'react';
import { useData } from '../DataContext';

export const GalleryPage: React.FC = () => {
  const { gallery } = useData();
  const [filter, setFilter] = useState<'All' | '30' | '50' | '100+'>('All');

  const filteredItems = filter === 'All' ? gallery : gallery.filter(item => item.scale === filter);

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-red-700 font-bold uppercase tracking-widest text-sm">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">현장 갤러리</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            다양한 규모와 컨셉의 행사 레퍼런스를 확인해보세요.<br />
            실제 운영 경험을 통해 증명된 압도적인 현장 운영 능력을 보여드립니다.
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {['All', '30', '50', '100+'].map((scale) => (
            <button
              key={scale}
              onClick={() => setFilter(scale as any)}
              className={`px-6 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === scale 
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md' 
                  : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {scale === 'All' ? '전체 보기' : `${scale}인 규모`}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.imageUrls[0]} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    {item.type}
                  </span>
                  <span className="bg-stone-200 text-stone-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    {item.scale}인 규모
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-700 transition-colors">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
