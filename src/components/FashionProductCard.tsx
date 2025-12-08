import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  power: string;
  voltage: string;
  weight: string;
  description: string;
  image: string;
  inStock: boolean;
}

interface FashionProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isInCompare: boolean;
  isInFavorites: boolean;
  onProductClick: (product: Product) => void;
}

const FashionProductCard = ({ 
  product, 
  index, 
  onAddToCart, 
  onToggleFavorite, 
  isInFavorites, 
  onProductClick 
}: FashionProductCardProps) => {
  return (
    <div 
      className="group relative flex flex-col animate-fade-in overflow-hidden bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 cursor-pointer" 
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onProductClick(product)}
    >
      {/* Image Section - Square aspect ratio */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className={`absolute top-3 right-3 z-20 h-8 w-8 rounded-full backdrop-blur-sm transition-all ${
            isInFavorites 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/70 dark:bg-black/40 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-black/60'
          }`}
        >
          <Icon name="Heart" className={`h-4 w-4 ${isInFavorites ? 'fill-white' : ''}`} />
        </Button>

        {/* Stock Badge */}
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-3 left-3 z-20">
            Нет в наличии
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
        {/* Brand */}
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {product.brand}
        </div>

        {/* Name */}
        <h3 className="text-sm font-medium text-gray-900 dark:text-white leading-tight line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        {/* Category */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {product.category}
        </div>

        {/* Price & Action */}
        <div className="pt-2 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {product.price.toLocaleString()} ₽
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.inStock}
            size="sm"
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 text-xs uppercase tracking-wider"
          >
            Заказать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FashionProductCard;