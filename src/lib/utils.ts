import { generateBubbleSortAnimationArray } from "@/algorithms/bubbleSort";
import { generateInsertionSortAnimationArray } from "@/algorithms/insertionSort";
import { generateMergeSortAnimationArray } from "@/algorithms/mergeSort";
import { generateQuickSortAnimationArray } from "@/algorithms/quickSort";
import { generateSelectionSortAnimationArray } from "@/algorithms/selectionSort";
import { SortingAlgorithmType } from "./types";

export function generateRandomNumberFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const MNI_ANIMATION_SPEED = 100;
export const MAX_ANIMATION_SPEED = 400;

export const algorithmOptions = [
  { label: "Bubble", value: "bubble" },
  { label: "Quick", value: "quick" },
  { label: "Merge", value: "merge" },
  { label: "Insertion", value: "insertion" },
  { label: "Selection", value: "selection" },
];

export function generateAnimationArray(
  selectedAlgorithm: SortingAlgorithmType,
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: [number[], boolean][]) => void
) {
  switch (selectedAlgorithm) {
    case "bubble":
      generateBubbleSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "quick":
      generateQuickSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "merge":
      generateMergeSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "insertion":
      generateInsertionSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "selection":
      generateSelectionSortAnimationArray(isSorting, array, runAnimation);
      break;
    default:
      break;
  }
}

export const sortingAlgorithmsData = {
  bubble: {
    title: "Bubble Sort",
    description:
      "Sebuah algoritma pengurutan berbasis perbandingan yang sederhana. Bubble sort secara berulang membandingkan dan menukar elemen-elemen yang bersebelahan jika mereka berada dalam urutan yang salah, menggerakkan elemen-elemen yang lebih besar menuju ke akhir setiap kali melewati daftar. Proses ini berlanjut sampai daftar diurutkan dan tidak lagi memerlukan pertukaran.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
  },
  insertion: {
    title: "Insertion Sort",
    description:
      "Insertion sort membangun array yang diurutkan akhir satu elemen pada satu waktu, dengan secara berulang mengambil elemen yang belum diurutkan berikutnya dan memasukkannya ke posisinya yang benar di antara elemen-elemen yang sebelumnya telah diurutkan. Proses ini berlanjut sampai semua elemen telah dimasukkan ke tempatnya dengan benar, menghasilkan daftar yang diurutkan.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
  },
  selection: {
    title: "Selection Sort",
    description:
      "Selection sort bekerja dengan cara secara berulang menemukan elemen minimum dari bagian yang belum diurutkan dari daftar dan menukarnya dengan elemen pada posisi saat ini. Proses ini dilanjutkan untuk setiap posisi dalam daftar, menggerakkan batas bagian yang diurutkan dan belum diurutkan satu elemen ke depan setiap kali sampai seluruh daftar diurutkan.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n²)",
  },
  merge: {
    title: "Merge Sort",
    description:
      "Merge sort membagi daftar yang belum diurutkan menjadi n sublist, masing-masing berisi satu elemen (daftar satu elemen dianggap sudah diurutkan), dan kemudian secara berulang menggabungkan sublist ini untuk menghasilkan sublist yang diurutkan baru hingga hanya tersisa satu sublist, yang merupakan daftar yang diurutkan. Algoritma ini menggunakan pendekatan divide-and-conquer, membagi daftar menjadi dua bagian secara rekursif dan menggabungkan kembali bagian-bagian yang sudah diurutkan.",
    worstCase: "O(n log n)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
  },
  quick: {
    title: "Quick Sort",
    description:
      "Quick sort memilih sebuah elemen 'pivot' dari array dan membagi elemen-elemen lain ke dalam dua sub-array, berdasarkan apakah mereka kurang dari atau lebih besar dari pivot. Sub-array tersebut kemudian diurutkan secara rekursif, dan sub-array yang sudah diurutkan digabungkan dengan pivot untuk membentuk array yang sudah diurutkan.",
    worstCase: "O(n²)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
  },
};
