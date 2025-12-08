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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" size="sm" className="relative">
          <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
          Корзина
          {totalItems > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Корзина покупок</SheetTitle>
          <SheetDescription>
            {totalItems > 0 ? `${totalItems} товаров на сумму ${totalPrice.toLocaleString()} ₽` : 'Корзина пуста'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cart.map(item => (
            <Card key={item.id} className="animate-fade-in">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Icon name="Minus" className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
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
            <div className="flex justify-between text-lg font-bold">
              <span>Итого:</span>
              <span>{totalPrice.toLocaleString()} ₽</span>
            </div>
            <Button className="w-full" size="lg">
              Оформить заказ
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
