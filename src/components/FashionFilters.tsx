import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface FashionFiltersProps {
  brands: string[];
  categories: string[];
  selectedBrand: string;
  selectedCategory: string;
  priceRange: number[];
  selectedSizes: string[];
  selectedColors: string[];
  isCollapsed: boolean;
  onBrandChange: (brand: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: number[]) => void;
  onSizeToggle: (size: string) => void;
  onColorToggle: (color: string) => void;
  onResetFilters: () => void;
  onToggleCollapse: () => void;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = [
  { name: 'black', hex: '#000000', label: 'Чёрный' },
  { name: 'white', hex: '#FFFFFF', label: 'Белый' },
  { name: 'red', hex: '#DC2626', label: 'Красный' },
  { name: 'blue', hex: '#2563EB', label: 'Синий' },
  { name: 'green', hex: '#059669', label: 'Зелёный' },
  { name: 'beige', hex: '#D4C4A8', label: 'Бежевый' },
  { name: 'gray', hex: '#6B7280', label: 'Серый' },
];

const FashionFilters = ({
  brands,
  categories,
  selectedBrand,
  selectedCategory,
  priceRange,
  selectedSizes,
  selectedColors,
  isCollapsed,
  onBrandChange,
  onCategoryChange,
  onPriceRangeChange,
  onSizeToggle,
  onColorToggle,
  onResetFilters,
  onToggleCollapse,
}: FashionFiltersProps) => {
  const [openSections, setOpenSections] = useState({
    designers: true,
    categories: true,
    sizes: true,
    colors: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters = selectedBrand !== 'Все' || selectedCategory !== 'Все' || 
                          selectedSizes.length > 0 || selectedColors.length > 0 ||
                          priceRange[0] !== 0 || priceRange[1] !== 500000;

  return (
    <aside className={`flex-shrink-0 space-y-2 transition-all duration-500 ease-in-out ${
      isCollapsed ? 'w-12' : 'w-full lg:w-80'
    }`}>
      <div className="flex items-center justify-between mb-4">
        {!isCollapsed && (
          <>
            <h3 className="text-lg font-semibold flex items-center gap-2 animate-fade-in">
              <Icon name="SlidersHorizontal" size={20} />
              Фильтры
            </h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="text-xs hover:bg-white/5 animate-fade-in"
              >
                Сбросить
              </Button>
            )}
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all ml-auto"
          title={isCollapsed ? 'Показать фильтры' : 'Скрыть фильтры'}
        >
          <Icon 
            name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
            size={20} 
            className="transition-transform"
          />
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="animate-fade-in">{/* Wrapper for collapsible content */}

      <Collapsible open={openSections.designers} onOpenChange={() => toggleSection('designers')}>
        <CollapsibleTrigger className="w-full group">
          <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm border border-white/10">
            <span className="font-medium">Дизайнеры</span>
            <Icon 
              name="ChevronDown" 
              size={18} 
              className={`transition-transform ${openSections.designers ? 'rotate-180' : ''}`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-3 px-2 space-y-1">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => onBrandChange(brand)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  selectedBrand === brand
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'hover:bg-white/5 text-muted-foreground'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openSections.categories} onOpenChange={() => toggleSection('categories')}>
        <CollapsibleTrigger className="w-full group">
          <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm border border-white/10">
            <span className="font-medium">Категории</span>
            <Icon 
              name="ChevronDown" 
              size={18} 
              className={`transition-transform ${openSections.categories ? 'rotate-180' : ''}`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-3 px-2 space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'hover:bg-white/5 text-muted-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openSections.sizes} onOpenChange={() => toggleSection('sizes')}>
        <CollapsibleTrigger className="w-full group">
          <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm border border-white/10">
            <span className="font-medium">Размеры</span>
            <Icon 
              name="ChevronDown" 
              size={18} 
              className={`transition-transform ${openSections.sizes ? 'rotate-180' : ''}`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-3 px-2">
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onSizeToggle(size)}
                  className={`py-2 rounded-lg font-medium transition-all ${
                    selectedSizes.includes(size)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/5 hover:bg-white/10 text-muted-foreground'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openSections.colors} onOpenChange={() => toggleSection('colors')}>
        <CollapsibleTrigger className="w-full group">
          <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm border border-white/10">
            <span className="font-medium">Цвета</span>
            <Icon 
              name="ChevronDown" 
              size={18} 
              className={`transition-transform ${openSections.colors ? 'rotate-180' : ''}`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-3 px-2">
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => onColorToggle(color.name)}
                  className={`relative group/color`}
                  title={color.label}
                >
                  <div
                    className={`w-12 h-12 rounded-full transition-all ${
                      selectedColors.includes(color.name)
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: color.hex,
                      border: color.name === 'white' ? '1px solid rgba(255,255,255,0.2)' : 'none'
                    }}
                  >
                    {selectedColors.includes(color.name) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon 
                          name="Check" 
                          size={20} 
                          className={color.name === 'white' || color.name === 'beige' ? 'text-black' : 'text-white'}
                        />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
        <CollapsibleTrigger className="w-full group">
          <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm border border-white/10">
            <span className="font-medium">Цена</span>
            <Icon 
              name="ChevronDown" 
              size={18} 
              className={`transition-transform ${openSections.price ? 'rotate-180' : ''}`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-4 px-4">
            <Slider
              value={priceRange}
              onValueChange={onPriceRangeChange}
              max={500000}
              step={5000}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
              <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      </div>
      )}
    </aside>
  );
};

export default FashionFilters;