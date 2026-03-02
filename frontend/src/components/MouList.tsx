import { useEffect, useState } from 'react';
import { MouFilters } from './MouFilters';
import { MouDetailModal } from './MouDetailModal';
import { Loader2, AlertCircle, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface daftarJenisMoU {
  label: string;
  value: string;
}

interface MouData {
  // id: number;
  // nama_institusi: string;
  // jenis_kerjasama: string;
  tanggal_mulai: string;
  tanggal_berakhir: string;
  // nomor_mou: string;
  // status: string;
  // negara?: string;
  // provinsi?: string;
  // deskripsi?: string;
  // ruang_lingkup?: string[];
  // pic_institusi?: string;
  // email_institusi?: string;
  // additional fields returned by API
  bidang_kerjasama?: string;
  durasi?: string;
  fakultas?: string;
  id_dokumen?: string;
  id_jenis_mou?: string;
  id_mitra?: string;
  id_mou?: string;
  implementasi?: any[];
  is_tak_terhingga?: string;
  jenis_mou?: string;
  judul_kegiatan?: string;
  mitra_alamat?: string;
  mitra_asal?: string;
  mitra_lembaga?: string;
  mitra_nama?: string;
  mitra_website?: string;
  mou?: string;
  nama_dokumen?: string;
  nomor_dokumen?: string;
  prodi?: string;
  status_dokumen?: string;
  tingkat?: string;
  tujuan_kerjasama?: string;
  unit_penanggung_jawab?: string;
}

interface ApiResponse {
  daftarJenisMoU: daftarJenisMoU[];
  content: MouData[];
}

export function MouList() {
  const [mouData, setMouData] = useState<MouData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [selectedMou, setSelectedMou] = useState<MouData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMouData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/api/frontend/kemitraan/getdata');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: ApiResponse = await response.json();
        console.log('API Response:', result);

        if (result && Array.isArray(result.content)) {
          setMouData(result.content);
          setIsUsingMockData(false);
        } else {
          throw new Error('Data tidak tersedia dalam format yang diharapkan');
        }
      } catch (err) {
        // Silently fall back to mock data when API is not accessible
        setIsUsingMockData(true);
        
      } finally {
        setLoading(false);
      }
    };

    fetchMouData();
  }, []);

  // Get unique countries and types for filters
  const countries = Array.from(new Set(mouData.map(mou => mou.mitra_asal).filter(Boolean))) as string[];
  const types = Array.from(new Set(mouData.map(mou => mou.jenis_mou).filter(Boolean))) as string[];

  // Filter data
  const filteredData = mouData.filter((mou) => {
    const matchesSearch = 
      mou.mitra_nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mou.nomor_dokumen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mou.jenis_mou?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || mou.status_dokumen?.toLowerCase().includes(selectedStatus.toLowerCase());
    // const matchesCountry = selectedCountry === 'all' || mou.negara === selectedCountry;
    // const matchesType = selectedType === 'all' || mou.jenis_kerjasama === selectedType;

    // return matchesSearch && matchesStatus && matchesCountry && matchesType;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedCountry, selectedType]);

  const handleViewDetails = (mou: MouData) => {
    setSelectedMou(mou);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('aktif') || statusLower.includes('active')) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (statusLower.includes('berakhir') || statusLower.includes('expired')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error && mouData.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (mouData.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">Tidak ada data kemitraan yang tersedia</p>
      </div>
    );
  }

  return (
    <div>
      {isUsingMockData && (
        <Alert className="mb-6">
          <AlertCircle className="size-4" />
          <AlertTitle>Demo Mode</AlertTitle>
          <AlertDescription>
            Tidak dapat mengakses API (kemungkinan masalah CORS). Menampilkan data contoh untuk demonstrasi.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Filters */}
      <MouFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        countries={countries}
        types={types}
        totalResults={filteredData.length}
      />

      {/* No Results */}
      {filteredData.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Tidak ada hasil yang sesuai dengan filter Anda
          </p>
        </div>
      )}
      
      {/* MoU Table */}
      {currentData.length > 0 && (
        <>
          <div className="mt-8 border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead className="min-w-[250px]">Institusi</TableHead>
                    <TableHead className="min-w-[150px]">Jenis Lembaga</TableHead>
                    <TableHead className="min-w-[180px]">Jenis Kerjasama</TableHead>
                    <TableHead className="min-w-[150px]">Nomor MoU</TableHead>
                    <TableHead className="min-w-[130px]">Tanggal Mulai</TableHead>
                    <TableHead className="min-w-[130px]">Tanggal Berakhir</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px] text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((mou, index) => (
                    <TableRow key={mou.id_dokumen}>
                      <TableCell className="font-medium">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{mou.mitra_nama}</div>
                          {mou.mitra_asal && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {mou.mitra_asal}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{mou.mitra_lembaga || '-'}</TableCell>
                      <TableCell>{mou.jenis_mou}</TableCell>
                      <TableCell className="font-mono text-sm">{mou.nomor_dokumen}</TableCell>
                      <TableCell>{formatDate(mou.tanggal_mulai)}</TableCell>
                      <TableCell>{formatDate(mou.tanggal_berakhir)}</TableCell>
                      {/* <TableCell>
                        <Badge className={getStatusColor(mou.status_dokumen)} variant="outline">
                          {mou.status_dokumen}
                        </Badge>
                      </TableCell> */}
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(mou)}
                        >
                          <Eye className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-4" />
                Sebelumnya
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-[40px]"
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {/* <MouDetailModal
        mou={selectedMou}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      /> */}
    </div>
  );
}