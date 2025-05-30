document.getElementById('searchBtn').addEventListener('click', async function() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  if (!city) {
    resultDiv.innerHTML = '<div class="text-red-500 text-center font-medium animate-pulse">Masukkan nama kota terlebih dahulu.</div>';
    return;
  }
  resultDiv.innerHTML = '<div class="flex justify-center items-center gap-2 text-blue-500 font-medium animate-pulse"><svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Memuat...</div>';
  try {
    const res = await fetch(`https://api.ryzumi.vip/api/search/jadwal-sholat?kota=${encodeURIComponent(city)}`);
    const data = await res.json();
    if (data.schedules && data.schedules.length > 0) {
      const jadwal = data.schedules[0].jadwal;
      resultDiv.innerHTML = `
        <div class="bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-xl p-5 shadow-lg text-blue-900 border border-blue-100 animate-fade-in">
          <div class="font-bold text-xl mb-1 flex items-center gap-2">
            <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z' /></svg>
            ${data.schedules[0].lokasi}, <span class="text-blue-400 font-normal">${data.schedules[0].daerah}</span>
          </div>
          <div class="mb-3 text-xs text-blue-400">Tanggal: ${jadwal.tanggal}</div>
          <div class="grid grid-cols-2 gap-3 text-base">
            <div><span class="font-semibold text-blue-600">Imsak</span><span class="float-right">${jadwal.imsak}</span></div>
            <div><span class="font-semibold text-blue-600">Subuh</span><span class="float-right">${jadwal.subuh}</span></div>
            <div><span class="font-semibold text-blue-600">Terbit</span><span class="float-right">${jadwal.terbit}</span></div>
            <div><span class="font-semibold text-blue-600">Dhuha</span><span class="float-right">${jadwal.dhuha}</span></div>
            <div><span class="font-semibold text-blue-600">Dzuhur</span><span class="float-right">${jadwal.dzuhur}</span></div>
            <div><span class="font-semibold text-blue-600">Ashar</span><span class="float-right">${jadwal.ashar}</span></div>
            <div><span class="font-semibold text-blue-600">Maghrib</span><span class="float-right">${jadwal.maghrib}</span></div>
            <div><span class="font-semibold text-blue-600">Isya</span><span class="float-right">${jadwal.isya}</span></div>
          </div>
        </div>
      `;
    } else {
      resultDiv.innerHTML = '<div class="text-red-500 text-center font-medium animate-pulse">Jadwal tidak ditemukan untuk kota tersebut.</div>';
    }
  } catch (e) {
    resultDiv.innerHTML = '<div class="text-red-500 text-center font-medium animate-pulse">Terjadi kesalahan saat mengambil data.</div>';
  }
});
