"use client";

import Select from "@/components/input/Select";
import { Slider } from "@/components/input/Slider";
import { useSortingAlgorithmContext } from "@/context/Visualizer"; // Mengimpor hook useSortingAlgorithmContext dari konteks Visualizer
import { SortingAlgorithmType } from "@/lib/types";
import { algorithmOptions } from "@/lib/utils";
import { useEffect } from "react"; // Mendapatkan nilai arrayToSort dan isSorting dari konteks Visualizer
import { FaPlayCircle } from "react-icons/fa";
import { RxReset } from "react-icons/rx";

export default function Home() {
  const {
    arrayToSort, // Array yang akan diurutkan
    isSorting, // Status apakah sedang dilakukan proses pengurutan
    animationSpeed, // Kecepatan animasi pengurutan
    setAnimationSpeed, // Fungsi untuk menetapkan kecepatan animasi pengurutan
    setSelectedAlgorithm, // Fungsi untuk menetapkan algoritma pengurutan yang dipilih
    selectedAlgorithm, // Algoritma pengurutan yang dipilih
    requireReset, // Status apakah memerlukan reset array dan animasi pengurutan
    resetArrayAndAnimation,
  } = useSortingAlgorithmContext();

  const handlePlay = () => {
    if (requireReset) {
      resetArrayAndAnimation();
      return;
    }
    // generate animation array
  };
  // Fungsi untuk menangani perubahan pilihan algoritma pengurutan pada Select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType);
  };
  return (
    // Komponen utama yang menyimpan konten halaman
    <main className="absolute top-0 h-screen w-screen z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#150229_1px)] bg-[size:40px_40px]">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4">
          {/* controls */}
          {/* Kontrol untuk pengaturan animasi */}
          <div className="h-[66px] relative flex items-center justify-between w-full">
            <h1 className="text-gray-300 text-2xl font-light hidden md:flex">
              Sorting Visualizer
            </h1>
            {/* Slider untuk mengatur kecepatan animasi */}
            <div className="flex items-center justify-center gap-4">
              <Slider
                isDisabled={isSorting}
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
              {/* Select untuk memilih algoritma pengurutan */}
              <Select
                options={algorithmOptions}
                defaultValue={selectedAlgorithm}
                onChange={handleSelectChange}
                isDisabled={isSorting}
              />
              {/* Tombol untuk memulai ulang atau menjalankan animasi */}
              <button
                className="flex items-center justify-center"
                onClick={() => {}}>
                {/* Menampilkan ikon RxReset jika memerlukan reset, dan ikon FaPlayCircle jika tidak */}
                {requireReset ? (
                  <RxReset className="text-gray-400 h-8 w-8" />
                ) : (
                  <FaPlayCircle className="text-system-green60 h-8 w-8" />
                )}
              </button>
            </div>
          </div>

          {/* Container untuk array yang akan diurutkan */}
          <div className="relative h-[calc(100vh-66px)] w-full">
            {/* Container untuk merepresentasikan array dalam bentuk garis */}
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {/* Menampilkan setiap elemen array sebagai garis dengan ketinggian yang sesuai */}
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                  style={{ height: `${value}px` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  ); // Mengembalikan elemen div sebagai konten halaman utama
}
