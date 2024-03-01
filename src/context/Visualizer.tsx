"use client";

// Mengimpor tipe AnimationArrayType dan SortingAlgorithmType dari file types.ts
import { AnimationArrayType, SortingAlgorithmType } from "@/lib/types";
// Mengimpor konstanta MAX_ANIMATION_SPEED dan fungsi generateRandomNumberFromInterval dari file utils.ts
import {
  MAX_ANIMATION_SPEED,
  generateRandomNumberFromInterval,
} from "@/lib/utils";
// Mengimpor beberapa modul React yang diperlukan
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Definisi tipe data konteks SortingAlgorithmContextType
interface SortingAlgorithmContextType {
  arrayToSort: number[]; // Array yang akan diurutkan
  selectedAlgorithm: SortingAlgorithmType; // Algoritma pengurutan yang dipilih
  isSorting: boolean; // Status apakah sedang melakukan pengurutan atau tidak
  setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void; // Fungsi untuk mengatur algoritma pengurutan yang dipilih
  setIsSorting: (isSorting: boolean) => void; // Fungsi untuk mengatur status apakah sedang melakukan pengurutan atau tidak
  animationSpeed: number; // Kecepatan animasi pengurutan
  setAnimationSpeed: (speed: number) => void; // Fungsi untuk mengatur kecepatan animasi pengurutan
  resetArrayAndAnimation: () => void; // Fungsi untuk mereset array dan animasi pengurutan
  runAnimation: (animations: AnimationArrayType) => void; // Fungsi untuk menjalankan animasi pengurutan
  isAnimationComplete: boolean; // Status apakah animasi pengurutan sudah selesai atau tidak
  requiresReset: boolean; // Status apakah memerlukan reset atau tidak
}

// Membuat konteks SortingAlgorithmContext menggunakan createContext
const SortingAlgorithmContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

// Komponen SortingAlgorithmProvider adalah penyedia konteks untuk aplikasi
export const SortingAlgorithmProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // State untuk menyimpan array yang akan diurutkan
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  // State untuk menyimpan algoritma pengurutan yang dipilih
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlgorithmType>("bubble");
  // State untuk menyimpan status apakah sedang melakukan pengurutan atau tidak
  const [isSorting, setIsSorting] = useState<boolean>(false);
  // State untuk menyimpan status apakah animasi pengurutan sudah selesai atau tidak
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);
  // State untuk menyimpan kecepatan animasi pengurutan
  const [animationSpeed, setAnimationSpeed] =
    useState<number>(MAX_ANIMATION_SPEED);
  // State untuk menyimpan status apakah memerlukan reset atau tidak
  const requiresReset = isAnimationComplete || isSorting;

  // Efek samping untuk mereset array dan animasi pengurutan saat komponen dimuat atau saat ukuran layar berubah
  useEffect(() => {
    resetArrayAndAnimation();
    window.addEventListener("resize", resetArrayAndAnimation);

    return () => {
      window.removeEventListener("resize", resetArrayAndAnimation);
    };
  }, []);

  // Fungsi untuk mereset array dan animasi pengurutan
  const resetArrayAndAnimation = () => {
    // Mendapatkan lebar konten dari elemen dengan id "content-container"
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;
    const contentContainerWidth = contentContainer.clientWidth;

    // Menghasilkan array acak yang panjangnya sesuai dengan lebar konten
    const tempArray: number[] = [];
    const numLines = contentContainerWidth / 8;
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);
    for (let i = 0; i < numLines; i++) {
      tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight));
    }

    // Memperbarui state arrayToSort dengan array yang baru dibuat
    setArrayToSort(tempArray);
    // Memperbarui state isSorting dan isAnimationComplete menjadi false
    setIsSorting(false);
    setIsAnimationComplete(false);

    // Membersihkan semua timeout yang masih berjalan
    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
      }
    }, 0);

    // Mengatur ulang warna garis array menjadi default
    setTimeout(() => {
      const arrLines = document.getElementsByClassName("array-line");
      for (let i = 0; i < arrLines.length; i++) {
        arrLines[i].classList.remove("change-line-color");
        arrLines[i].classList.add("default-line-color");
      }
    }, 0);
  };

  // Fungsi untuk menjalankan animasi pengurutan
  const runAnimation = (animations: AnimationArrayType) => {
    setIsSorting(true); // Menetapkan status isSorting menjadi true

    // Menghitung kecepatan inverse animasi
    const inverseSpeed = (1 / animationSpeed) * 200;
    // Mendapatkan elemen-elemen dengan kelas "array-line"
    const arrLines = document.getElementsByClassName(
      "array-line"
    ) as HTMLCollectionOf<HTMLElement>;

    // Fungsi untuk memperbarui kelas dari elemen array-line
    const updateClassList = (
      indexes: number[],
      addClassName: string,
      removeClassName: string
    ) => {
      indexes.forEach((index) => {
        arrLines[index].classList.add(addClassName);
        arrLines[index].classList.remove(removeClassName);
      });
    };

    // Fungsi untuk memperbarui tinggi dari elemen array-line
    const updateHeightValue = (
      lineIndex: number,
      newHeight: number | undefined
    ) => {
      arrLines[lineIndex].style.height = `${newHeight}px`;
    };

    // Iterasi melalui setiap animasi dan menjalankannya
    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [lineIndexes, isSwap] = animation;
        if (!isSwap) {
          // Jika bukan pertukaran, ubah warna garis
          updateClassList(
            lineIndexes,
            "change-line-color",
            "default-line-color"
          );
          setTimeout(
            () =>
              updateClassList(
                lineIndexes,
                "default-line-color",
                "change-line-color"
              ),
            inverseSpeed
          );
        } else {
          // Jika pertukaran, perbarui tinggi garis
          const [lineIndex, newHeight] = lineIndexes;
          updateHeightValue(lineIndex, newHeight);
        }
      }, index * inverseSpeed);
    });

    // Set timeout untuk menyelesaikan animasi pengurutan
    const finalTimeout = animations.length * inverseSpeed;
    setTimeout(() => {
      // Menambahkan animasi pulse pada garis array
      Array.from(arrLines).forEach((line) => {
        line.classList.add("pulse-animation", "change-line-color");
        line.classList.remove("default-line-color");
      });

      // Set timeout untuk menghapus animasi pulse
      setTimeout(() => {
        Array.from(arrLines).forEach((line) => {
          line.classList.remove("pulse-animation", "change-line-color");
          line.classList.add("default-line-color");
        });
        // Menetapkan status isSorting dan isAnimationComplete menjadi false
        setIsSorting(false);
        setIsAnimationComplete(true);
      }, 1000);
    }, finalTimeout);
  };

  // Nilai yang disediakan oleh konteks
  const value = {
    arrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    resetArrayAndAnimation,
    runAnimation,
    requiresReset,
  };

  // Mengembalikan provider konteks dengan value yang telah ditentukan
  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

// Fungsi hook useSortingAlgorithmContext untuk menggunakan konteks SortingAlgorithmContext
export const useSortingAlgorithmContext = (): SortingAlgorithmContextType => {
  const context = useContext(SortingAlgorithmContext);
  if (context === undefined) {
    throw new Error(
      "useSortingAlgorithmContext must be used within a SortingAlgorithmProvider"
    );
  }
  return context;
};
