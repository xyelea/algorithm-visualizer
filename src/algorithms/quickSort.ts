import { AnimationArrayType } from "@/lib/types";

/**
 * Fungsi untuk membagi array menjadi dua bagian berdasarkan pivot.
 * @param {number[]} array - Array yang akan dipartisi.
 * @param {number} begin - Indeks awal dari subarray yang akan dipartisi.
 * @param {number} finish - Indeks akhir dari subarray yang akan dipartisi.
 * @param {AnimationArrayType} animations - Array yang berisi animasi untuk visualisasi.
 * @returns {number} Indeks dari pivot setelah dipartisi.
 */ function partition(
  array: number[],
  begin: number,
  finish: number,
  animations: AnimationArrayType
) {
  let i = begin;
  let j = finish + 1;
  const condition = true;
  const pivot = array[begin];
  // Mulai algoritma partisi
  while (condition) {
    // Cari elemen yang lebih besar dari pivot di sebelah kanan
    while (array[++i] <= pivot) {
      if (i === finish) break;
      animations.push([[i], false]); // Animasi: Sorot elemen yang sedang dibandingkan
    }
    // Cari elemen yang lebih kecil dari pivot di sebelah kiri
    while (array[--j] >= pivot) {
      if (j === begin) break;
      animations.push([[j], false]); // Animasi: Sorot elemen yang sedang dibandingkan
    }
    // Jika indeks j dan i bertemu, selesaikan algoritma partisi
    if (j <= i) break;
    // Tukar nilai array[i] dengan array[j]
    animations.push([[i, array[j]], true]); // Animasi: Tukar elemen
    animations.push([[j, array[i]], true]); // Animasi: Tukar elemen
    [array[i], array[j]] = [array[j], array[i]]; // Lakukan pertukaran
  }
  // Posisi pivot di tengah setelah partisi selesai
  animations.push([[begin, array[j]], true]); // Animasi: Tukar pivot ke posisi tengah
  animations.push([[j, array[begin]], true]); // Animasi: Tukar pivot ke posisi tengah
  [array[begin], array[j]] = [array[j], array[begin]]; // Lakukan pertukaran pivot dengan posisi tengah
  return j; // Kembalikan indeks pivot
}

/**
 * Fungsi untuk menjalankan algoritma quicksort pada array.
 * @param {number[]} array - Array yang akan diurutkan.
 * @param {number} begin - Indeks awal dari subarray yang akan diurutkan.
 * @param {number} finish - Indeks akhir dari subarray yang akan diurutkan.
 * @param {AnimationArrayType} animations - Array yang berisi animasi untuk visualisasi.
 */ function runQuickort(
  array: number[],
  begin: number,
  finish: number,
  animations: AnimationArrayType
) {
  // Jika masih terdapat lebih dari satu elemen di subarray
  if (begin < finish) {
    // Lakukan partisi untuk membagi array menjadi dua bagian
    const part = partition(array, begin, finish, animations);
    // Lakukan quicksort pada bagian kiri pivot
    runQuickort(array, begin, part - 1, animations);
    // Lakukan quicksort pada bagian kanan pivot
    runQuickort(array, part + 1, finish, animations);
  }
}

/**
 * Fungsi untuk menghasilkan array animasi untuk visualisasi quicksort.
 * @param {boolean} isSorting - Status apakah sedang dalam proses pengurutan.
 * @param {number[]} array - Array yang akan diurutkan.
 * @param {Function} runAnimation - Fungsi untuk menjalankan animasi pengurutan.
 */ export function generateQuickSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return; // Jika sedang dalam proses pengurutan, hentikan eksekusi
  if (array.length <= 1) return array; // Jika array kosong atau hanya memiliki satu elemen, kembalikan array

  const animations: AnimationArrayType = []; // Inisialisasi array animasi
  const auxiliaryArray = array.slice(); // Buat salinan array untuk diurutkan
  runQuickort(auxiliaryArray, 0, array.length - 1, animations); // Jalankan algoritma quicksort
  runAnimation(animations); // Jalankan animasi pengurutan
}
