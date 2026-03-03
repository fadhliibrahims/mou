import { Search, Filter } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";

interface MouFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedPartnerType: string;
  onPartnerTypeChange: (value: string) => void;
  selectedMitraAsal: string;
  onMitraAsalChange: (value: string) => void;
  selectedTahun: string;
  onTahunChange: (value: string) => void;
  partnerTypes: string[];
  mitraAsal: string[];
  tahun: string[];
  totalResults: number;
}

export function MouFilters({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedPartnerType,
  onPartnerTypeChange,
  selectedMitraAsal,
  onMitraAsalChange,
  selectedTahun,
  onTahunChange,
  partnerTypes,
  mitraAsal,
  tahun,
  totalResults,
}: MouFiltersProps) {
  const activeFiltersCount = [
    selectedStatus,
    selectedPartnerType,
    selectedMitraAsal,
    selectedTahun,
  ].filter((f) => f !== "all").length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari institusi, nomor MoU, atau jenis kerjasama..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter:</span>
        </div>

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="aktif">Aktif</SelectItem>
            <SelectItem value="berakhir">Berakhir</SelectItem>
          </SelectContent>
        </Select>

        {/* PartnerType Filter */}
        <Select value={selectedPartnerType} onValueChange={onPartnerTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Jenis Mitra" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Mitra</SelectItem>
            {partnerTypes.map((partnerType) => (
              <SelectItem key={partnerType} value={partnerType}>
                {partnerType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={selectedMitraAsal} onValueChange={onMitraAsalChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Jenis Kerjasama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Jenis</SelectItem>
            {mitraAsal.map((asal) => (
              <SelectItem key={asal} value={asal}>
                {asal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select value={selectedTahun} onValueChange={onTahunChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tahun</SelectItem>
            {tahun.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          Menampilkan{" "}
          <span className="font-semibold text-foreground">{totalResults}</span>{" "}
          hasil
        </span>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFiltersCount} filter aktif
          </Badge>
        )}
      </div>
    </div>
  );
}
