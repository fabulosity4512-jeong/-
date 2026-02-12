
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, GalleryItem, Inquiry, HygieneItem, AppSettings } from './types';
import { INITIAL_MENUS, INITIAL_GALLERY, INITIAL_HYGIENE } from './constants';

interface DataContextType {
  menus: MenuItem[];
  gallery: GalleryItem[];
  hygiene: HygieneItem[];
  inquiries: Inquiry[];
  settings: AppSettings;
  addMenu: (menu: MenuItem) => void;
  updateMenu: (menu: MenuItem) => void;
  deleteMenu: (id: string) => void;
  addGallery: (item: GalleryItem) => void;
  updateGallery: (item: GalleryItem) => void;
  deleteGallery: (id: string) => void;
  updateHygiene: (item: HygieneItem) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: 'pending' | 'responded') => void;
  deleteInquiry: (id: string) => void;
  updateSettings: (settings: AppSettings) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menus, setMenus] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('catering_menus');
    return saved ? JSON.parse(saved) : INITIAL_MENUS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('catering_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [hygiene, setHygiene] = useState<HygieneItem[]>(() => {
    const saved = localStorage.getItem('catering_hygiene');
    return saved ? JSON.parse(saved) : INITIAL_HYGIENE;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('catering_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('catering_settings');
    return saved ? JSON.parse(saved) : { notificationEmail: 'fmfm4512@naver.com' };
  });

  useEffect(() => {
    localStorage.setItem('catering_menus', JSON.stringify(menus));
  }, [menus]);

  useEffect(() => {
    localStorage.setItem('catering_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('catering_hygiene', JSON.stringify(hygiene));
  }, [hygiene]);

  useEffect(() => {
    localStorage.setItem('catering_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('catering_settings', JSON.stringify(settings));
  }, [settings]);

  const addMenu = (menu: MenuItem) => setMenus(prev => [...prev, menu]);
  const updateMenu = (updatedMenu: MenuItem) => 
    setMenus(prev => prev.map(m => m.id === updatedMenu.id ? updatedMenu : m));
  const deleteMenu = (id: string) => setMenus(prev => prev.filter(m => m.id !== id));

  const addGallery = (item: GalleryItem) => setGallery(prev => [...prev, item]);
  const updateGallery = (updatedItem: GalleryItem) =>
    setGallery(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
  const deleteGallery = (id: string) => setGallery(prev => prev.filter(i => i.id !== id));

  const updateHygiene = (updatedItem: HygieneItem) =>
    setHygiene(prev => prev.map(h => h.id === updatedItem.id ? updatedItem : h));

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: 'pending' | 'responded') => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const deleteInquiry = (id: string) => {
    if (window.confirm('정말로 이 문의를 삭제하시겠습니까?')) {
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    }
  };

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    alert('설정이 저장되었습니다.');
  };

  return (
    <DataContext.Provider value={{ 
      menus, gallery, hygiene, inquiries, settings,
      addMenu, updateMenu, deleteMenu, 
      addGallery, updateGallery, deleteGallery,
      updateHygiene,
      addInquiry, updateInquiryStatus, deleteInquiry,
      updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
