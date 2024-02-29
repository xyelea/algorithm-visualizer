"use client";

// Mengimpor tipe SortingAlgorithmType dari file types.ts
import { SortingAlgorithmType } from "@/lib/types";
// Mengimpor konstanta MAX_ANIMATION_SPEED dari file utils.ts
import {
  MAX_ANIMATION_SPEED,
  generateRandomNumberFromInterval,
} from "@/lib/utils";
// Mengimpor createContext, useContext, dan useState dari React
import { createContext, useContext, useEffect, useState } from "react";

// Mendefinisikan tipe SortingAlgorithmContextType untuk konteks algoritma pengurutan
interface SortingAlgorithmContextType {
  arrayToSort: number[]; // Array yang akan diurutkan
  setArrayToSort: (array: number[]) => void; // Fungsi untuk menetapkan nilai arrayToSort
  selectedAlgorithm: SortingAlgorithmType; // Algoritma pengurutan yang dipilih
  setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void; // Fungsi untuk menetapkan algoritma pengurutan yang dipilih
  isSorting: boolean; // Status apakah sedang dilakukan proses pengurutan
  setIsSorting: (isSorting: boolean) => void; // Fungsi untuk menetapkan status proses pengurutan
  animationSpeed: number; // Kecepatan animasi pengurutan
  setAnimationSpeed: (animationSpeed: number) => void; // Fungsi untuk menetapkan kecepatan animasi pengurutan
  isAnimationComplete: boolean; // Status apakah animasi pengurutan telah selesai
  setIsAnimationComplete: (isAnimationComplete: boolean) => void; // Fungsi untuk menetapkan status animasi pengurutan
  resetArrayAndAnimation: () => void; // Fungsi untuk mereset array dan animasi pengurutan
  runAnimation: () => void; // Fungsi untuk menjalankan animasi pengurutan
}

// Membuat konteks sortingAlgorithmContext dengan tipe SortingAlgorithmContextType
const sortingAlgorithmContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

// Komponen SortingAlgorithmProvider adalah penyedia konteks algoritma pengurutan
export const SortingAlgorithmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State-state untuk menyimpan nilai-nilai konteks algoritma pengurutan
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlgorithmType>("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] =
    useState<number>(MAX_ANIMATION_SPEED);
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  // Gunakan useEffect untuk menjalankan fungsi resetArrayAndAnimation saat komponen dimount
  useEffect(() => {
    resetArrayAndAnimation();
    window.addEventListener("resize", resetArrayAndAnimation);

    // Membersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener("resize", resetArrayAndAnimation);
    };
  }, []);

  // Fungsi untuk mereset array dan animasi pengurutan
  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    // Menghitung ulang ukuran array berdasarkan ukuran container
    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: number[] = [];
    const numLines = contentContainerWidth / 8;
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);
    for (let i = 0; i < numLines; i++) {
      tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight));
    }

    // Menetapkan nilai arrayToSort dengan array yang baru
    setArrayToSort(tempArray);
    setIsAnimationComplete(false);
    setIsSorting(false);
  };
  // Fungsi untuk menjalankan animasi pengurutan
  const runAnimation = () => {};

  // Nilai yang akan disediakan oleh SortingAlgorithmProvider
  const value: SortingAlgorithmContextType = {
    arrayToSort,
    setArrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    setIsAnimationComplete,
    resetArrayAndAnimation,
    runAnimation,
  };

  // Mengembalikan provider konteks sortingAlgorithmContext dengan nilai value
  return (
    <sortingAlgorithmContext.Provider value={value}>
      {children}
    </sortingAlgorithmContext.Provider>
  );
};

// Hook useSortingAlgorithmContext untuk menggunakan konteks algoritma pengurutan
export const useSortingAlgorithmContext = () => {
  const context = useContext(sortingAlgorithmContext);
  // Mengembalikan konteks algoritma pengurutan
  if (!context) {
    throw new Error(
      "useSortingAlgorithmContext harus digunakan didalam SortingAlgorithmProvider"
    );
  }
  return context;
};
