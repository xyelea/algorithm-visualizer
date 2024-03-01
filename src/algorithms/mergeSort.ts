import { AnimationArrayType } from "@/lib/types";

// Fungsi merge untuk menggabungkan dua bagian array yang terurut
function merge(
  array: number[], // Array yang akan digabungkan
  begin: number, // Indeks awal bagian pertama
  middle: number, // Indeks tengah untuk memisahkan bagian pertama dan kedua
  finish: number, // Indeks akhir dari bagian kedua
  animations: AnimationArrayType // Array untuk menyimpan animasi perubahan
) {
  // Membuat salinan array untuk bagian pertama dan kedua
  const left = array.slice(begin, middle);
  const right = array.slice(middle, finish);

  // Inisialisasi indeks untuk array left, right, dan array hasil gabungan
  let i = 0;
  let j = 0;
  let k = begin;
  // Melakukan penggabungan berdasarkan urutan
  while (i < left.length && j < right.length) {
    animations.push([[begin + i, middle + j], false]); // Animasi untuk membandingkan dua nilai
    if (left[i] <= right[j]) {
      animations.push([[k, left[i]], true]); // Animasi untuk menyalin nilai dari array kiri ke array hasil
      array[k] = left[i]; // Menyalin nilai dari array kiri ke array hasil
      i += 1;
    } else {
      animations.push([[k, right[j]], true]); // Animasi untuk menyalin nilai dari array kanan ke array hasil
      array[k] = right[j]; // Menyalin nilai dari array kanan ke array hasil
      j += 1;
    }
    k++;
  }
  // Menyalin sisa nilai dari array kiri
  while (i < left.length) {
    animations.push([[begin + i], false]); // Animasi untuk menyoroti nilai yang tersisa dari array kiri
    animations.push([[k, left[i]], true]); // Animasi untuk menyalin nilai yang tersisa dari array kiri ke array hasil
    array[k] = left[i]; // Menyalin nilai yang tersisa dari array kiri ke array hasil
    i += 1;
    k += 1;
  }
  // Menyalin sisa nilai dari array kanan
  while (j < right.length) {
    animations.push([[middle + j], false]); // Animasi untuk menyoroti nilai yang tersisa dari array kanan
    animations.push([[k, right[j]], true]); // Animasi untuk menyalin nilai yang tersisa dari array kiri ke array hasil
    array[k] = right[j]; // Menyalin nilai yang tersisa dari array kiri ke array hasil
    j += 1;
    k += 1;
  }
}

// Fungsi runMergeSort untuk menjalankan algoritma merge sort pada array
function runMergeSort(array: number[]) {
  const animations: AnimationArrayType = []; // Array untuk menyimpan animasi pengurutan
  for (let k = 1; k < array.length; k = 2 * k) {
    for (let i = 0; i < array.length; i += 2 * k) {
      const begin = i;
      const middle = i + k;
      const finish = Math.min(i + 2 * k, array.length);
      merge(array, begin, middle, finish, animations); // Panggil fungsi merge untuk menggabungkan bagian-bagian array
    }
  }
  return animations; // Kembalikan array animasi pengurutan
}

// Fungsi generateMergeSortAnimationArray untuk membuat animasi pengurutan merge sort
export function generateMergeSortAnimationArray(
  isSorting: boolean, // Status apakah sedang dalam proses pengurutan
  array: number[], // Array yang akan diurutkan
  runAnimation: (animations: AnimationArrayType) => void // Fungsi untuk menjalankan animasi pengurutan
) {
  if (isSorting) return; // Jika sedang dalam proses pengurutan, tidak perlu membuat animasi baru
  if (array.length <= 1) return []; // Jika panjang array kurang dari atau sama dengan 1, tidak perlu pengurutan

  const auxiliaryArray = array.slice(); // Salin array asli untuk digunakan dalam pengurutan
  const animations = runMergeSort(auxiliaryArray); // Jalankan algoritma merge sort untuk membuat animasi pengurutan
  runAnimation(animations); // Jalankan animasi pengurutan
}
