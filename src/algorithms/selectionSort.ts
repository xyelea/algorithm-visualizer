import { AnimationArrayType } from "@/lib/types";

// Fungsi runSelectionSort mengurutkan array menggunakan algoritma selection sort
function runSelectionSort(array: number[], animations: AnimationArrayType) {
  // Perulangan untuk menelusuri seluruh elemen array kecuali elemen terakhir
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i; // Menginisialisasi indeks minimum dengan indeks saat ini
    // Perulangan untuk mencari nilai minimum mulai dari indeks i+1 hingga akhir array
    for (let j = i + 1; j < array.length; j++) {
      animations.push([[j, i], false]); // Menambahkan animasi untuk menyorot elemen yang sedang dibandingkan
      if (array[j] < array[minIndex]) {
        minIndex = j; // Memperbarui indeks minimum jika ditemukan nilai yang lebih kecil
      }
    }
    // Menukar elemen dengan nilai minimum dengan elemen pada indeks i
    animations.push([[i, array[minIndex]], true]);
    animations.push([[minIndex, array[i]], true]);
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
}

// Fungsi generateSelectionSortAnimationArray digunakan untuk menghasilkan animasi dari algoritma selection sort
export function generateSelectionSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return; // Menghentikan eksekusi jika sedang dalam proses pengurutan
  if (array.length <= 1) return; // Menghentikan eksekusi jika panjang array kurang dari atau sama dengan 1

  const animations: AnimationArrayType = []; // Membuat array untuk menyimpan animasi
  const auxiliaryArray = array.slice(); // Membuat salinan array untuk diurutkan
  runSelectionSort(auxiliaryArray, animations); // Menjalankan algoritma selection sort
  runAnimation(animations); // Menjalankan animasi
}
