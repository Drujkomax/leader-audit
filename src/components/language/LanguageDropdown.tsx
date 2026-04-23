import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage, type Language } from "@/contexts/language-context";

type LanguageOption = {
  code: Language;
  flag: string;
  label: string;
};

const options: LanguageOption[] = [
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "uz", flag: "🇺🇿", label: "UZ" },
  { code: "en", flag: "🇬🇧", label: "EN" },
];

type LanguageDropdownProps = {
  isScrolled: boolean;
};

const LanguageDropdown = ({ isScrolled }: LanguageDropdownProps) => {
  const { language, setLanguage, t } = useLanguage();

  const activeOption = options.find((option) => option.code === language) ?? options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-9 px-2.5 text-xs sm:text-sm font-semibold",
            isScrolled
              ? "text-foreground hover:bg-accent"
              : "text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground",
          )}
          aria-label={t.header.language}
        >
          <span>{activeOption.flag}</span>
          <span>{activeOption.label}</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => setLanguage(option.code)}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>{option.flag}</span>
              <span>{option.label}</span>
            </span>
            {option.code === language ? <Check className="h-4 w-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
