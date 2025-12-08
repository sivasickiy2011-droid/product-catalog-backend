import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ShoppingCart from '@/components/ShoppingCart';
import { CartItem } from '@/data/ProductData';

interface CatalogHeaderProps {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  compareListLength: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
  onShowCompare: () => void;
}

const CatalogHeader = ({
  cart,
  totalItems,
  totalPrice,
  compareListLength,
  onUpdateQuantity,
  onRemoveFromCart,
  onShowCompare,
}: CatalogHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-card/40 backdrop-blur-xl supports-[backdrop-filter]:bg-card/40">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <Icon name="Zap" className="h-8 w-8 text-primary relative" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
            ЭлектроМаркет
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white/10 transition-all"
            onClick={() => navigate('/profile')}
          >
            <Icon name="User" className="h-4 w-4 mr-2" />
            Профиль
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="relative hover:bg-white/10 border-white/10 transition-all"
            onClick={onShowCompare}
            disabled={compareListLength === 0}
          >
            <Icon name="GitCompare" className="h-4 w-4 mr-2" />
            Сравнить
            {compareListLength > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {compareListLength}
              </Badge>
            )}
          </Button>

          <ShoppingCart
            cart={cart}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveFromCart={onRemoveFromCart}
          />
        </div>
      </div>
    </header>
  );
};

export default CatalogHeader;
