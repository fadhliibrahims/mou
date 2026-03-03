import { Search, Filter, X } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { MultiSelect } from "./ui/multi-select";
import { Button } from "./ui/button";

interface MouFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedPartnerType: string[];
  onPartnerTypeChange: (value: string[]) => void;
  selectedMitraAsal: string;
  onMitraAsalChange: (value: string) => void;
  selectedTahun: string[];
  onTahunChange: (value: string[]) => void;
  partnerTypes: string[];
  mitraAsal: string[];
  tahun: string[];
  totalResults: number;
  onClearAll: () => void;
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
  onClearAll,
}: MouFiltersProps) {
  const activeFiltersCount =
    selectedPartnerType.length +
    [selectedStatus, selectedMitraAsal].filter((f) => f !== "all").length +
    selectedTahun.length;

  const hasActiveFilters = activeFiltersCount > 0 || searchTerm.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari nama mitra, jenis mitra, bidang kerjasama atau nomor MoU..."
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

        {/* <MultiSelect
          options={["Aktif", "Berakhir"]}
          value={selectedStatus}
          onChange={onStatusChange}
          placeholder="Status"
          className="w-auto"
        /> */}

        {/* PartnerType Filter */}
        {/* <Select value={selectedPartnerType} onValueChange={onPartnerTypeChange}>
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
        </Select> */}

        <MultiSelect
          options={partnerTypes}
          value={selectedPartnerType}
          onChange={onPartnerTypeChange}
          placeholder="Jenis Mitra"
          className="w-[200px]"
        />

        {/* Type Filter */}
        <Select value={selectedMitraAsal} onValueChange={onMitraAsalChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Jenis Kerjasama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Wilayah</SelectItem>
            {mitraAsal.map((asal) => (
              <SelectItem key={asal} value={asal}>
                {asal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <MultiSelect
          options={tahun}
          value={selectedTahun}
          onChange={onTahunChange}
          placeholder="Tahun"
          className="w-[200px]"
        />

        {/* Year Filter */}
        {/* <Select value={selectedTahun} onValueChange={onTahunChange}>
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
        </Select>*/}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground gap-1.5"
          >
            <X className="size-3.5" />
            Hapus Semua Filter
          </Button>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {/* {selectedStatus.map((s) => (
            <Badge
              key={`status-${s}`}
              variant="secondary"
              className="gap-1 pr-1"
            >
              <span className="text-xs text-muted-foreground">Status:</span>
              {s}
              <button
                onClick={() =>
                  onStatusChange(selectedStatus.filter((s) => s !== s))
                }
                className="ml-1 hover:text-destructive"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))} */}
          {selectedPartnerType.map((partnerType) => (
            <Badge
              key={`status-${partnerType}`}
              variant="secondary"
              className="gap-1 pr-1"
            >
              <span className="text-xs text-muted-foreground">Status:</span>
              {partnerType}
              <button
                onClick={() =>
                  onPartnerTypeChange(
                    selectedPartnerType.filter(
                      (partnerType) => partnerType !== partnerType,
                    ),
                  )
                }
                className="ml-1 hover:text-destructive"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
          {selectedTahun.map((t) => (
            <Badge
              key={`status-${t}`}
              variant="secondary"
              className="gap-1 pr-1"
            >
              <span className="text-xs text-muted-foreground">Status:</span>
              {t}
              <button
                onClick={() =>
                  onTahunChange(selectedTahun.filter((t) => t !== t))
                }
                className="ml-1 hover:text-destructive"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

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
