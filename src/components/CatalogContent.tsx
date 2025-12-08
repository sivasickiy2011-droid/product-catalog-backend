import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import FashionProductCard from '@/components/FashionProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Product } from '@/data/ProductData';

interface CatalogContentProps {
  filteredProducts: Product[];
  compareList: Product[];
  favoritesList: Product[];
  selectedCategory: string;
  selectedBrand: string;
  priceRange: number[];
  categories: string[];
  brands: string[];
  currentTheme?: string;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (range: number[]) => void;
  onResetFilters: () => void;
  onAddToCart: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
}

const CatalogContent = ({
  filteredProducts,
  compareList,
  favoritesList,
  selectedCategory,
  selectedBrand,
  priceRange,
  categories,
  brands,
  currentTheme = 'electronics',
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onResetFilters,
  onAddToCart,
  onToggleCompare,
  onToggleFavorite,
}: CatalogContentProps) => {
  const navigate = useNavigate();
  const isFashionTheme = currentTheme === 'fashion';
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsFilterVisible(false);
        } else {
          setIsFilterVisible(true);
        }
      } else {
        setIsFilterVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <main className="container py-6 md:py-12 relative px-4 md:px-6">
      <div className="mb-6 md:mb-8 animate-slide-up">
        <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
          Каталог товаров
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground">
          Найдено {filteredProducts.length} товаров
        </p>
      </div>

      <div className={`mb-6 md:mb-8 sticky top-16 md:top-20 z-40 transition-all duration-300 ${
        isFilterVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <ProductFilters
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          priceRange={priceRange}
          categories={categories}
          brands={brands}
          onCategoryChange={onCategoryChange}
          onBrandChange={onBrandChange}
          onPriceRangeChange={onPriceRangeChange}
          onResetFilters={onResetFilters}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProducts.map((product, index) => (
          isFashionTheme ? (
            <FashionProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
              onToggleCompare={onToggleCompare}
              onToggleFavorite={onToggleFavorite}
              isInCompare={compareList.some((p) => p.id === product.id)}
              isInFavorites={favoritesList.some((p) => p.id === product.id)}
              onProductClick={(product) => navigate(`/product/${product.id}`)}
            />
          ) : (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
              onToggleCompare={onToggleCompare}
              onToggleFavorite={onToggleFavorite}
              isInCompare={compareList.some((p) => p.id === product.id)}
              isInFavorites={favoritesList.some((p) => p.id === product.id)}
              onProductClick={(product) => navigate(`/product/${product.id}`)}
            />
          )
        ))}
      </div>
    </main>
  );
};

export default CatalogContent;