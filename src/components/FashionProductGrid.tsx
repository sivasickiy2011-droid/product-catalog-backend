import { useState } from 'react';
import { Product } from '@/data/ProductData';
import FashionProductCard from '@/components/FashionProductCard';
import FashionProductModal from '@/components/FashionProductModal';
import { ViewMode } from '@/components/FashionViewSwitcher';

interface FashionProductGridProps {
  products: Product[];
  viewMode: ViewMode;
  compareList: Product[];
  favoritesList: Product[];
  onAddToCart: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
}

const FashionProductGrid = ({
  products,
  viewMode,
  compareList,
  favoritesList,
  onAddToCart,
  onToggleCompare,
  onToggleFavorite,
}: FashionProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getGridClasses = () => {
    switch (viewMode) {
      case 'magazine':
        return 'grid grid-cols-1 gap-8';
      case 'compact':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
      case 'gallery':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <>
      <div className={getGridClasses()}>
        {products.map((product, index) => (
          <FashionProductCard
            key={product.id}
            product={product}
            index={index}
            viewMode={viewMode}
            onAddToCart={onAddToCart}
            onToggleCompare={onToggleCompare}
            onToggleFavorite={onToggleFavorite}
            isInCompare={compareList.some((p) => p.id === product.id)}
            isInFavorites={favoritesList.some((p) => p.id === product.id)}
            onProductClick={(product) => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <FashionProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isInFavorites={favoritesList.some((p) => p.id === selectedProduct.id)}
        />
      )}
    </>
  );
};

export default FashionProductGrid;
