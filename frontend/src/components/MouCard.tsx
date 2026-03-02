import { Calendar, Building2, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface MouCardProps {
  data: {
    id: number;
    nama_institusi: string;
    jenis_kerjasama: string;
    tanggal_mulai: string;
    tanggal_berakhir: string;
    nomor_mou: string;
    status: string;
    negara?: string;
    provinsi?: string;
  };
  onViewDetails: () => void;
}

export function MouCard({ data, onViewDetails }: MouCardProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Determine status badge color
  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('aktif') || statusLower.includes('active')) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (statusLower.includes('berakhir') || statusLower.includes('expired')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{data.nama_institusi}</CardTitle>
            {(data.negara || data.provinsi) && (
              <p className="text-sm text-muted-foreground">
                {data.provinsi && `${data.provinsi}, `}{data.negara}
              </p>
            )}
          </div>
          {data.status && (
            <Badge className={getStatusColor(data.status)} variant="outline">
              {data.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="size-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Jenis Kerjasama:</span>
            <span className="font-medium">{data.jenis_kerjasama || 'N/A'}</span>
          </div>
          
          {data.nomor_mou && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="size-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">Nomor MoU:</span>
              <span className="font-medium">{data.nomor_mou}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="size-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Mulai:</span>
            <span className="font-medium">{formatDate(data.tanggal_mulai)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="size-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Berakhir:</span>
            <span className="font-medium">{formatDate(data.tanggal_berakhir)}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={onViewDetails}
        >
          Lihat Detail
        </Button>
      </CardContent>
    </Card>
  );
}