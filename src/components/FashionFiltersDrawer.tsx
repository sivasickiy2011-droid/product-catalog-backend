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
          className="lg:hidden border-white/10 hover:bg-white/10"
        >
          <Icon name="SlidersHorizontal" className="mr-2 h-4 w-4" />
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
