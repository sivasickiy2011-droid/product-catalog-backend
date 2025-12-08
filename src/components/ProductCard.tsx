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
  isInCompare: boolean;
  onProductClick: (product: Product) => void;
}

const ProductCard = ({ product, index, onAddToCart, onToggleCompare, isInCompare, onProductClick }: ProductCardProps) => {
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
    <Card className="group flex flex-col animate-fade-in hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden bg-gradient-to-br from-card to-card/50 border-white/10 cursor-pointer" style={{ animationDelay: `${index * 0.05}s` }}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLDivElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div 
            className="w-full h-56 hidden items-center justify-center text-7xl transition-all duration-500 group-hover:scale-110 relative"
            style={{ 
              background: `linear-gradient(135deg, ${getCategoryColor()}dd, ${getCategoryColor()}55)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <span className="relative z-10 drop-shadow-2xl">{getCategoryIcon()}</span>
          </div>
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Нет в наличии
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-5" onClick={() => onProductClick(product)}>
        <Badge variant="outline" className="mb-3 bg-white/5 border-white/10 backdrop-blur-sm">{product.brand}</Badge>
        <CardTitle className="text-lg mb-2 line-clamp-2 font-semibold">{product.name}</CardTitle>
        <CardDescription className="text-sm mb-4 line-clamp-2 opacity-70">{product.description}</CardDescription>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Мощность:</span>
            <span className="font-medium">{product.power}</span>
          </div>
          <div className="flex justify-between">
            <span>Напряжение:</span>
            <span className="font-medium">{product.voltage}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex-col gap-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between w-full mb-2">
          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">{product.price.toLocaleString()} ₽</span>
        </div>
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/25 transition-all duration-300"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
            В корзину
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onToggleCompare(product)}
            className={`border-white/10 transition-all duration-300 ${isInCompare ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50' : 'hover:bg-white/10'}`}
          >
            <Icon name="GitCompare" className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;