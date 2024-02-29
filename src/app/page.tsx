"use client";

import { useSortingAlgorithmContext } from "@/context/Visualizer"; // Mengimpor hook useSortingAlgorithmContext dari konteks Visualizer
import { useEffect } from "react"; // Mendapatkan nilai arrayToSort dan isSorting dari konteks Visualizer

export default function Home() {
  const { arrayToSort, isSorting } = useSortingAlgorithmContext();

  // Efek samping yang digunakan untuk mencetak nilai arrayToSort dan isSorting ke konsol setiap kali komponen dirender
  useEffect(() => {
    console.log("array to sort value : ", arrayToSort);
    console.log("isSorting value : ", isSorting);
  });
  return <div>homejj</div>; // Mengembalikan elemen div sebagai konten halaman utama
}
