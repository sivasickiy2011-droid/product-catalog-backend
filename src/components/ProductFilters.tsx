import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface ProductFiltersProps {
  selectedCategory: string;
  selectedBrand: string;
  priceRange: number[];
  categories: string[];
  brands: string[];
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onPriceRangeChange: (value: number[]) => void;
}

const ProductFilters = ({
  selectedCategory,
  selectedBrand,
  priceRange,
  categories,
  brands,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange
}: ProductFiltersProps) => {
  return (
    <Card className="p-6 bg-card/30 border-white/10 backdrop-blur-2xl shadow-lg">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Icon name="SlidersHorizontal" className="h-5 w-5 text-primary" />
          <span className="font-semibold">Фильтры:</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-card/50 border-white/10">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
              <SelectItem value="all">Все категории</SelectItem>
              {categories.filter(c => c !== 'all').map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <Select value={selectedBrand} onValueChange={onBrandChange}>
            <SelectTrigger className="bg-card/50 border-white/10">
              <SelectValue placeholder="Бренд" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
              <SelectItem value="all">Все бренды</SelectItem>
              {brands.filter(b => b !== 'all').map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[250px]">
          <div className="text-sm mb-2 font-medium">
            Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
          </div>
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            max={40000000}
            step={1000}
            className="mt-1"
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductFilters;