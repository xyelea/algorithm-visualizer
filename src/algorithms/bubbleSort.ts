import { AnimationArrayType } from "@/lib/types";

// Fungsi runBubbleSort menerima array angka dan array animasi dan menjalankan algoritma Bubble Sort
function runBubbleSort(array: number[], animations: AnimationArrayType) {
  // Melakukan iterasi melalui seluruh array kecuali elemen terakhir
  for (let i = 0; i < array.length - 1; i++) {
    // Melakukan iterasi melalui array, namun hanya sampai elemen terakhir yang belum diurutkan
    for (let j = 0; j < array.length - i - 1; j++) {
      // Menambahkan animasi untuk menyorot elemen yang sedang dibandingkan
      animations.push([[j, j + 1], false]);
      // Membandingkan dua elemen berturut-turut
      if (array[j] > array[j + 1]) {
        // Menambahkan animasi untuk pertukaran jika elemen sebelumnya lebih besar dari elemen setelahnya
        animations.push([[j, array[j + 1]], true]);
        animations.push([[j + 1, array[j]], true]);
        // Melakukan pertukaran nilai antara dua elemen
        [[array[j], array[j + 1]]] = [[array[j + 1], array[j]]];
      }
    }
  }
}

// Fungsi generateBubbleSortAnimationArray digunakan untuk menghasilkan animasi Bubble Sort
export function generateBubbleSortAnimationArray(
  isSorting: boolean, // Status apakah sedang dilakukan proses pengurutan
  array: number[], // Array angka yang akan diurutkan
  runAnimation: (animations: AnimationArrayType) => void // Fungsi untuk menjalankan animasi pengurutan
) {
  // Jika sedang melakukan proses pengurutan atau array kosong, maka tidak perlu menjalankan animasi
  if (isSorting) return;
  if (array.length < 1) return [];
  // Inisialisasi array untuk menyimpan animasi
  const animations: AnimationArrayType = [];
  // Membuat salinan array untuk mencegah perubahan pada array asli
  const auxiliaryArray = array.slice();
  // Menjalankan algoritma Bubble Sort dan menyimpan animasi yang dihasilkan
  runBubbleSort(auxiliaryArray, animations);
  // Menjalankan animasi pengurutan
  runAnimation(animations);
}
