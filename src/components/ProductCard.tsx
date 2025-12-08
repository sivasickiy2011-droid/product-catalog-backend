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
}

const ProductCard = ({ product, index, onAddToCart, onToggleCompare, isInCompare }: ProductCardProps) => {
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
    <Card className="flex flex-col animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
      <CardHeader className="p-0">
        <div className="relative">
          <div 
            className="w-full h-48 rounded-t-lg flex items-center justify-center text-6xl"
            style={{ backgroundColor: getCategoryColor() }}
          >
            {getCategoryIcon()}
          </div>
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Нет в наличии
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Badge variant="outline" className="mb-2">{product.brand}</Badge>
        <CardTitle className="text-base mb-2 line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="text-xs mb-3 line-clamp-2">{product.description}</CardDescription>
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
      <CardFooter className="p-4 pt-0 flex-col gap-2">
        <div className="flex items-center justify-between w-full mb-2">
          <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</span>
        </div>
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1"
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
            className={isInCompare ? 'bg-primary text-primary-foreground' : ''}
          >
            <Icon name="GitCompare" className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;