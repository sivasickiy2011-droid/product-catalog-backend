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
    <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-xl">
      <h3 className="font-semibold mb-6 flex items-center gap-3 text-lg">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon name="SlidersHorizontal" className="h-5 w-5 text-primary" />
        </div>
        Фильтры
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <label className="text-sm font-medium mb-2 block">Категория</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.filter(c => c !== 'all').map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Бренд</label>
          <Select value={selectedBrand} onValueChange={onBrandChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все бренды</SelectItem>
              {brands.filter(b => b !== 'all').map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Цена: {priceRange[0]} - {priceRange[1]} ₽
          </label>
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            max={20000}
            step={100}
            className="mt-2"
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductFilters;