import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
}

const ShoppingCart = ({ cart, totalItems, totalPrice, onUpdateQuantity, onRemoveFromCart }: ShoppingCartProps) => {
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    switch (category) {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
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

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" size="sm" className="relative bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/25 transition-all duration-300">
          <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
          Корзина
          {totalItems > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-white/20 border-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-card/95 backdrop-blur-xl border-white/10">
        <SheetHeader>
          <SheetTitle className="text-2xl bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Корзина покупок</SheetTitle>
          <SheetDescription className="text-base">
            {totalItems > 0 ? `${totalItems} товаров на сумму ${totalPrice.toLocaleString()} ₽` : 'Корзина пуста'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cart.map((item, idx) => (
            <Card key={item.id} className="animate-fade-in bg-gradient-to-br from-card to-card/50 border-white/10" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div 
                    className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${getCategoryColor(item.category)}dd, ${getCategoryColor(item.category)}55)` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <span className="relative z-10">{getCategoryIcon(item.category)}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 hover:bg-white/10"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Icon name="Minus" className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 hover:bg-white/10"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Icon name="Plus" className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-auto"
                        onClick={() => onRemoveFromCart(item.id)}
                      >
                        <Icon name="Trash2" className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Итого:</span>
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">{totalPrice.toLocaleString()} ₽</span>
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/25 transition-all duration-300" size="lg" onClick={handleCheckout}>
              Оформить заказ
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;