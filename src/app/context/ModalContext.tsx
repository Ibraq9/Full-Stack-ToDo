// ModalContext.tsx
"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  completedTasks: boolean;
  setCompletedTasks: React.Dispatch<React.SetStateAction<boolean>>;
  ModalData: ModalTypes,
  setModalData: React.Dispatch<React.SetStateAction<ModalTypes>>;
  EditMode: boolean,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  sortType:string,
  setSortType:React.Dispatch<React.SetStateAction<string>>
}

type ModalTypes = {
  id: number | null,
  title: string;
  description: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  // Make sure initial state is consistent
  const [isOpen, setIsOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(false);
  const [EditMode, setEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("Relavent");
  const [ModalData, setModalData] = useState<ModalTypes>({
    id: 0,
    title: "",
    description: "",
  })

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, completedTasks, setCompletedTasks, ModalData, setModalData, setEditMode, EditMode, searchTerm, setSearchTerm , sortType,setSortType}}>
      {children}
    </ModalContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}