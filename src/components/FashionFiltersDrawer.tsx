import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import FashionFilters from '@/components/FashionFilters';

interface FashionFiltersDrawerProps {
  brands: string[];
  categories: string[];
  selectedBrand: string;
  selectedCategory: string;
  priceRange: number[];
  selectedSizes: string[];
  selectedColors: string[];
  onBrandChange: (brand: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: number[]) => void;
  onSizeToggle: (size: string) => void;
  onColorToggle: (color: string) => void;
  onResetFilters: () => void;
}

const FashionFiltersDrawer = (props: FashionFiltersDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="lg:hidden border-white/10 hover:bg-white/10 h-8 px-3 text-xs flex-1 sm:flex-none"
        >
          <Icon name="SlidersHorizontal" className="mr-1.5 h-3.5 w-3.5" />
          Фильтры
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Фильтры</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FashionFilters {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FashionFiltersDrawer;