import { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from './utils';
import { buttonVariants } from './button';
import { Badge } from './badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';
import { Checkbox } from './checkbox';
import { ScrollArea } from './scroll-area';

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  maxDisplayed?: number;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Pilih...',
  className,
  maxDisplayed = 2,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const renderTriggerLabel = () => {
    if (value.length === 0) {
      return <span>{placeholder}</span>;
    }

    if (value.length <= maxDisplayed) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((v) => (
            <Badge
              key={v}
              variant="secondary"
              className="text-xs px-1.5 py-0 max-w-[100px] truncate"
            >
              {v}
            </Badge>
          ))}
        </div>
      );
    }

    return (
      <span className="text-sm">
        {value.length} dipilih
      </span>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
                "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className
        )}
        aria-expanded={open}
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          {renderTriggerLabel()}
        </div>
        <div className="flex items-center gap-1 ml-2 shrink-0">
          {value.length > 0 && (
            <span
              role="button"
              tabIndex={0}
              onClick={clearAll}
              onKeyDown={(e) => e.key === 'Enter' && clearAll(e as any)}
              className="text-muted-foreground hover:text-foreground rounded-sm p-0.5 cursor-pointer"
            >
              <X className="size-3" />
            </span>
          )}
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[220px]" align="start">
        <div className="p-2 space-y-0.5 max-h-[300px] overflow-y-auto">
          <div className="p-2 space-y-0.5">
            {/* Select All / Clear */}
            <div
              className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted/60 select-none"
              onClick={() =>
                value.length === options.length ? onChange([]) : onChange([...options])
              }
            >
              <Checkbox
                checked={
                  value.length === options.length && options.length > 0
                    ? true
                    : value.length > 0
                    ? 'indeterminate'
                    : false
                }
                onCheckedChange={() =>
                  value.length === options.length ? onChange([]) : onChange([...options])
                }
                className="pointer-events-none"
              />
              <span className="text-sm font-medium">Pilih Semua</span>
            </div>

            <div className="h-px bg-border my-1" />

            {options.map((option) => {
              const isSelected = value.includes(option);
              return (
                <div
                  key={option}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted/60 select-none"
                  onClick={() => toggleOption(option)}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleOption(option)}
                    className="pointer-events-none"
                  />
                  <span className="text-sm truncate" title={option}>
                    {option}
                  </span>
                  {isSelected && (
                    <Check className="size-3.5 ml-auto text-primary shrink-0" />
                  )}
                </div>
              );
            })}

            {options.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Tidak ada pilihan
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}