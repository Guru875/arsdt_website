'use client';

import { createContext, useContext, useState } from 'react';
import EnquiryModal from '@/components/EnquiryModal';

const EnquiryContext = createContext({
  isOpen: false,
  initialCourse: '',
  openEnquiryModal: () => {},
  closeEnquiryModal: () => {}
});

export function EnquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialCourse, setInitialCourse] = useState('');

  const openEnquiryModal = (courseName = '') => {
    setInitialCourse(courseName);
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
  };

  return (
    <EnquiryContext.Provider value={{ isOpen, initialCourse, openEnquiryModal, closeEnquiryModal }}>
      {children}
      <EnquiryModal
        isOpen={isOpen}
        onClose={closeEnquiryModal}
        initialCourse={initialCourse}
      />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  return useContext(EnquiryContext);
}
