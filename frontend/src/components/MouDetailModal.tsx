import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Calendar, Building2, FileText, Clock, MapPin, Globe, Users, Target } from 'lucide-react';

interface MouData {
  id: number;
  nama_institusi: string;
  jenis_kerjasama: string;
  tanggal_mulai: string;
  tanggal_berakhir: string;
  nomor_mou: string;
  status: string;
  negara?: string;
  provinsi?: string;
  deskripsi?: string;
  ruang_lingkup?: string[];
  pic_institusi?: string;
  email_institusi?: string;
}

interface MouDetailModalProps {
  mou: MouData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MouDetailModal({ mou, open, onOpenChange }: MouDetailModalProps) {
  if (!mou) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{mou.nama_institusi}</DialogTitle>
              <DialogDescription>
                Detail lengkap tentang kemitraan dengan {mou.nama_institusi}
              </DialogDescription>
            </div>
            <Badge className={getStatusColor(mou.status)} variant="outline">
              {mou.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Location */}
          {(mou.negara || mou.provinsi) && (
            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Lokasi</div>
                <div className="text-sm text-muted-foreground">
                  {mou.provinsi && `${mou.provinsi}, `}{mou.negara}
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Partnership Type */}
          <div className="flex items-start gap-3">
            <Building2 className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium mb-1">Jenis Kerjasama</div>
              <div className="text-sm text-muted-foreground">{mou.jenis_kerjasama}</div>
            </div>
          </div>

          {/* MoU Number */}
          <div className="flex items-start gap-3">
            <FileText className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium mb-1">Nomor MoU</div>
              <div className="text-sm text-muted-foreground">{mou.nomor_mou}</div>
            </div>
          </div>

          <Separator />

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Tanggal Mulai</div>
                <div className="text-sm text-muted-foreground">{formatDate(mou.tanggal_mulai)}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Tanggal Berakhir</div>
                <div className="text-sm text-muted-foreground">{formatDate(mou.tanggal_berakhir)}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          {mou.deskripsi && (
            <>
              <Separator />
              <div className="flex items-start gap-3">
                <FileText className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Deskripsi</div>
                  <div className="text-sm text-muted-foreground">{mou.deskripsi}</div>
                </div>
              </div>
            </>
          )}

          {/* Scope */}
          {mou.ruang_lingkup && mou.ruang_lingkup.length > 0 && (
            <>
              <Separator />
              <div className="flex items-start gap-3">
                <Target className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-2">Ruang Lingkup</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {mou.ruang_lingkup.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {/* Contact Information */}
          {(mou.pic_institusi || mou.email_institusi) && (
            <>
              <Separator />
              <div className="flex items-start gap-3">
                <Users className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Kontak Person</div>
                  {mou.pic_institusi && (
                    <div className="text-sm text-muted-foreground mb-1">{mou.pic_institusi}</div>
                  )}
                  {mou.email_institusi && (
                    <a 
                      href={`mailto:${mou.email_institusi}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {mou.email_institusi}
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
