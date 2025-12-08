import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
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
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onResetFilters,
  onAddToCart,
  onToggleCompare,
  onToggleFavorite,
}: CatalogContentProps) => {
  const navigate = useNavigate();

  return (
    <main className="container py-6 md:py-12 relative px-4 md:px-6">
      <div className="mb-6 md:mb-8 animate-slide-up">
        <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
          Каталог товаров
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground">
          Найдено {filteredProducts.length} товаров
        </p>
      </div>

      <div className="mb-6 md:mb-8 sticky top-16 md:top-20 z-40">
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
        ))}
      </div>
    </main>
  );
};

export default CatalogContent;