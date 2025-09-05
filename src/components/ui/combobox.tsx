import { ArrowSwapVertical, Check } from "iconsax-react";
import { type Dispatch, type SetStateAction, useState } from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ComboboxProps {
  data: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  width?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export function Combobox({ data, width, value, setValue, placeholder }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const labelToValueMap = Object.fromEntries(data.map((item) => [item.label, item.value]));

  const selectedItem = data.find((item) => item.value === value);
  const displayText = selectedItem ? selectedItem.label : placeholder;
  const isPlaceholder = !selectedItem;

  const textClass = isPlaceholder ? "text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-100";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("justify-between", width)}>
          <span className={cn("truncate", textClass)}>{displayText}</span>
          <ArrowSwapVertical size={20} color="#000000" className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", width)}>
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={(selectedLabel) => {
                    const selectedValue = labelToValueMap[selectedLabel];
                    setValue(selectedValue === value ? "" : selectedValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    size={20}
                    color="#000000"
                    className={cn("ml-auto", value === item.value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
