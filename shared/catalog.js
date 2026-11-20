export const services = [
  { id: 'domisili', title: 'Surat keterangan domisili', short: 'Domisili', description: 'Draf keterangan tempat tinggal untuk keperluan administrasi.', requirements: ['Identitas pemohon contoh', 'Kartu keluarga contoh', 'Keperluan pengajuan'], fields: [], code: 'DOM' },
  { id: 'usaha', title: 'Surat keterangan usaha', short: 'Usaha', description: 'Draf keterangan usaha dengan nama, bidang, dan lokasi usaha.', requirements: ['Identitas pemohon contoh', 'Kartu keluarga contoh', 'Data usaha contoh'], fields: [{ key: 'businessName', label: 'Nama usaha contoh' }, { key: 'businessType', label: 'Bidang usaha contoh' }, { key: 'businessAddress', label: 'Alamat usaha contoh' }], code: 'USH' },
  { id: 'sktm', title: 'Surat keterangan tidak mampu', short: 'Keterangan tidak mampu', description: 'Skenario draf keterangan untuk keperluan bantuan atau administrasi.', requirements: ['Identitas pemohon contoh', 'Kartu keluarga contoh', 'Keperluan pengajuan'], fields: [], code: 'SKTM' }
];
export const statuses = {
  submitted: 'Diajukan', revision: 'Perlu perbaikan', processing: 'Diproses', completed: 'Selesai', rejected: 'Ditolak'
};
export const getService = id => services.find(service => service.id === id);
