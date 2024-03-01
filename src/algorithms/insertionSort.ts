import { AnimationArrayType } from "@/lib/types";

// Fungsi runInsertionSort menerima array angka dan array animasi dan menjalankan algoritma Insertion Sort
function runInsertionSort(array: number[], animations: AnimationArrayType) {
  // Melakukan iterasi melalui seluruh array, dimulai dari indeks kedua
  for (let i = 1; i < array.length; i++) {
    // Menambahkan animasi untuk menyorot elemen yang akan dimasukkan pada langkah ini
    animations.push([[i], false]);
    // Menyimpan nilai elemen yang akan dimasukkan
    const currentValue = array[i];
    // Inisialisasi variabel j sebagai indeks untuk membandingkan dengan nilai sebelumnya
    let j = i - 1;
    // Melakukan perulangan sampai elemen sebelumnya lebih kecil atau sudah mencapai indeks awal array
    while (j >= 0 && array[j] > currentValue) {
      // Menambahkan animasi untuk menyorot elemen yang sedang dibandingkan
      animations.push([[j, j + 1, i], false]);
      // Memindahkan elemen yang lebih besar ke kanan
      array[j + 1] = array[j];
      // Menambahkan animasi untuk menyorot perpindahan elemen
      animations.push([[j + 1, array[j]], true]);
      // Memperbarui indeks untuk membandingkan dengan nilai sebelumnya
      j -= 1;
    }
    // Memasukkan nilai elemen yang disimpan ke posisi yang tepat
    array[j + 1] = currentValue;
    // Menambahkan animasi untuk menyorot elemen yang telah dimasukkan ke posisi yang tepat
    animations.push([[j + 1, currentValue], true]);
  }
}

// Fungsi generateInsertionSortAnimationArray digunakan untuk menghasilkan animasi Insertion Sort
export function generateInsertionSortAnimationArray(
  isSorting: boolean, // Status apakah sedang dilakukan proses pengurutan
  array: number[], // Array angka yang akan diurutkan
  runAnimation: (animations: AnimationArrayType) => void // Fungsi untuk menjalankan animasi pengurutan
) {
  // Jika sedang melakukan proses pengurutan atau array memiliki panjang kurang dari atau sama dengan satu, tidak perlu menjalankan animasi
  if (isSorting) return;
  if (array.length <= 1) return [];
  // Inisialisasi array untuk menyimpan animasi
  const animations: AnimationArrayType = [];

  // Membuat salinan array untuk mencegah perubahan pada array asli
  const auxiliaryArray = array.slice();
  runInsertionSort(auxiliaryArray, animations);
  // Menjalankan animasi pengurutan
  runAnimation(animations);
}
