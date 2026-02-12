
import { MenuItem, GalleryItem, HygieneItem } from './types';

export const INITIAL_MENUS: MenuItem[] = [
  {
    id: '1',
    category: 'Drinks',
    name: '프리미엄 스페셜티 커피',
    description: '최고급 원두를 사용한 아메리카노와 카페라떼, 수제 티 셀렉션',
    minOrder: 30,
    priceInfo: '별도 문의',
    imageUrls: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800']
  },
  {
    id: '2',
    category: 'Brunch',
    name: '클래식 샌드위치 박스',
    description: '신선한 야채와 프리미엄 햄, 치즈로 구성된 든든한 한끼',
    minOrder: 20,
    priceInfo: '15,000원~',
    imageUrls: ['https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800']
  },
  {
    id: '3',
    category: 'Dessert',
    name: '베이커리 & 마카롱 세트',
    description: '당일 구운 페이스트리와 프랑스 정통 마카롱 세트',
    minOrder: 30,
    priceInfo: '별도 문의',
    imageUrls: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800']
  },
  {
    id: '4',
    category: 'Special',
    name: 'VIP 핑거푸드 플래터',
    description: '계절 과일과 치즈, 카나페로 구성된 고급스러운 디스플레이',
    minOrder: 50,
    priceInfo: '25,000원~',
    imageUrls: ['https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800']
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: '1',
    title: '글로벌 테크 기업 컨퍼런스',
    scale: '100+',
    type: 'Seminar',
    description: '강남 ○○타워 컨퍼런스 홀, 150인 규모 프리미엄 다과 세팅',
    imageUrls: ['https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800']
  },
  {
    id: '2',
    title: '○○ 금융그룹 VIP 라운지',
    scale: '50',
    type: 'Vip',
    description: 'VIP 고객 초청 행사를 위한 고급 핑거푸드 및 와인 케이터링',
    imageUrls: ['https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800']
  },
  {
    id: '3',
    title: 'IT 스타트업 런칭 파티',
    scale: '30',
    type: 'Workshop',
    description: '활기찬 분위기의 캐주얼 런치 박스 및 수제 맥주 세팅',
    imageUrls: ['https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800']
  }
];

export const INITIAL_HYGIENE: HygieneItem[] = [
  {
    id: '1',
    title: '청결한 조리 환경',
    description: '매일 조리 전후 전문 방역 및 살균 소독을 실시하며, 세분화된 조리 도구 관리를 실천합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800'
  },
  {
    id: '2',
    title: '완벽한 밀봉 포장',
    description: '배송 중 외부 오염을 완벽 차단하기 위해 모든 음식은 개별 밀봉 포장 및 친환경 패키징을 원칙으로 합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1606850246029-dd00bd5d0681?q=80&w=800'
  },
  {
    id: '3',
    title: '정시 배송 및 신선도 유지',
    description: '자체 콜드체인 시스템을 갖춘 전용 차량으로 약속된 시간에 최상의 신선도 상태 그대로 배송합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800'
  }
];
