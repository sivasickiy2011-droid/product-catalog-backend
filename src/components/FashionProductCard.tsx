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
      className="group relative flex flex-col animate-fade-in overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer" 
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onProductClick(product)}
    >
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Brand Logo in Corner */}
        <div className="absolute top-4 right-4 bg-white dark:bg-black px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xs font-bold tracking-wider text-gray-900 dark:text-white uppercase">
            {product.brand}
          </span>
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className={`absolute top-4 left-4 z-20 backdrop-blur-md transition-all duration-300 hover:scale-110 h-10 w-10 rounded-full ${
            isInFavorites 
              ? 'bg-red-500/90 text-white hover:bg-red-600' 
              : 'bg-white/80 dark:bg-black/60 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-black/80'
          }`}
        >
          <Icon name="Heart" className={`h-5 w-5 ${isInFavorites ? 'fill-white' : ''}`} />
        </Button>

        {/* Stock Badge */}
        {!product.inStock && (
          <Badge variant="destructive" className="absolute bottom-4 right-4 z-20 shadow-lg">
            Нет в наличии
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4 bg-white dark:bg-gray-900">
        {/* Category & Name */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            {product.category}
          </p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Product Features */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Icon name="Ruler" className="h-4 w-4" />
            <span>{product.power}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Icon name="Package" className="h-4 w-4" />
            <span>{product.voltage}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Icon name="Shirt" className="h-4 w-4" />
            <span>{product.weight}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Цена</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {product.price.toLocaleString()} ₽
            </span>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.inStock}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 px-6 py-6 text-sm font-semibold uppercase tracking-wider"
          >
            Купить
          </Button>
        </div>

        {/* Quality Badge */}
        <div className="flex items-center gap-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <Icon name="Check" className="h-3.5 w-3.5 text-green-600" />
            <span>Premium качество</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionProductCard;
