import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isInCompare: boolean;
  isInFavorites: boolean;
  onProductClick: (product: Product) => void;
}

const ProductCard = ({ product, index, onAddToCart, onToggleCompare, onToggleFavorite, isInCompare, isInFavorites, onProductClick }: ProductCardProps) => {
  const getCategoryColor = () => {
    switch (product.category) {
      case 'Электроинструменты':
        return '#0EA5E9';
      case 'Освещение':
        return '#FCD34D';
      case 'Кабели':
        return '#8B5CF6';
      default:
        return '#9CA3AF';
    }
  };

  const getCategoryIcon = () => {
    switch (product.category) {
      case 'Электроинструменты':
        return '🔧';
      case 'Освещение':
        return '💡';
      case 'Кабели':
        return '🔌';
      default:
        return '📦';
    }
  };

  return (
    <Card 
      className="group relative flex flex-col animate-fade-in overflow-hidden bg-card/60 backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.3)]" 
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden aspect-square">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-2">
            <div className="bg-black/40 backdrop-blur-sm px-3 py-2 md:px-6 md:py-3 rounded-lg border-2 border-white/30 rotate-[-15deg] shadow-2xl">
              <p className="text-white font-bold text-xs md:text-lg tracking-wider whitespace-nowrap">ПРИМЕР ТОВАРА</p>
            </div>
          </div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLDivElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div 
            className="w-full h-full hidden items-center justify-center text-8xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 relative"
            style={{ 
              background: `linear-gradient(135deg, ${getCategoryColor()}dd, ${getCategoryColor()}55)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <span className="relative z-10 drop-shadow-2xl">{getCategoryIcon()}</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product);
            }}
            className={`absolute top-2 right-2 md:top-3 md:right-3 z-20 backdrop-blur-md transition-all duration-500 hover:scale-110 h-8 w-8 md:h-10 md:w-10 ${
              isInFavorites 
                ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-lg shadow-red-500/30' 
                : 'bg-black/60 hover:bg-black/80 border-white/20'
            }`}
          >
            <Icon name="Heart" className={`h-3 w-3 md:h-4 md:w-4 ${isInFavorites ? 'fill-red-400' : ''}`} />
          </Button>
          
          {!product.inStock && (
            <Badge variant="destructive" className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-20 shadow-lg text-xs">
              Нет в наличии
            </Badge>
          )}
          
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-20">
            <Badge className="bg-black/60 backdrop-blur-md border-white/20 text-white hover:bg-black/80 transition-all text-xs">
              {product.brand}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-3 md:p-5 relative z-10" onClick={() => onProductClick(product)}>
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <CardTitle className="text-base md:text-lg leading-tight line-clamp-2 font-semibold pr-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </CardTitle>
        </div>
        
        <CardDescription className="text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 opacity-80 leading-relaxed">
          {product.description}
        </CardDescription>
        
        <div className="flex gap-1.5 md:gap-2 mb-3 md:mb-4 flex-wrap">
          <Badge variant="secondary" className="bg-white/5 border-white/10 backdrop-blur-sm text-[10px] md:text-xs px-1.5 md:px-2">
            <Icon name="Zap" className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1" />
            {product.power}
          </Badge>
          <Badge variant="secondary" className="bg-white/5 border-white/10 backdrop-blur-sm text-[10px] md:text-xs px-1.5 md:px-2">
            <Icon name="Battery" className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1" />
            {product.voltage}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-3 md:p-5 pt-0 flex-col gap-2 md:gap-3 relative z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-baseline justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-700">
              {product.price.toLocaleString()} ₽
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-lg shadow-primary/25 transition-all duration-500 hover:shadow-primary/40 hover:shadow-xl border border-white/10 h-9 md:h-10 text-xs md:text-sm"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            <Icon name="ShoppingCart" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">В корзину</span>
            <span className="sm:hidden">Купить</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onToggleCompare(product)}
            className={`border-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-110 h-9 w-9 md:h-10 md:w-10 ${
              isInCompare 
                ? 'bg-primary/20 text-primary border-primary/50 shadow-lg shadow-primary/30' 
                : 'hover:bg-white/10 hover:border-white/30'
            }`}
          >
            <Icon name="GitCompare" className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;