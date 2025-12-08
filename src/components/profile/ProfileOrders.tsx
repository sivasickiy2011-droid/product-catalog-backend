import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Order {
  id: number;
  date: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: string;
}

interface ProfileOrdersProps {
  orders: Order[];
  getStatusColor: (status: string) => 'default' | 'secondary' | 'destructive' | 'outline';
  formatDate: (dateString: string) => string;
}

const ProfileOrders = ({ orders, getStatusColor, formatDate }: ProfileOrdersProps) => {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <Icon name="Package" className="h-20 w-20 text-primary/50 relative" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Заказов пока нет</h3>
          <p className="text-muted-foreground mb-8 text-center max-w-md">
            Начните делать покупки в нашем каталоге электротоваров
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-primary to-purple-500 shadow-lg shadow-primary/25"
          >
            <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
            Перейти к покупкам
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {orders.map((order, idx) => (
        <Card
          key={order.id}
          className="animate-fade-in bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
          style={{ animationDelay: `${idx * 0.1}s` }}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-xl">
                  Заказ №{order.id}
                  <Badge variant={getStatusColor(order.status)} className="px-3 py-1">
                    {order.status}
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-1">{formatDate(order.date)}</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  {order.total.toLocaleString()} ₽
                </div>
                <div className="text-sm text-muted-foreground">{order.items.length} товаров</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="Package" className="h-4 w-4" />
                  Состав заказа
                </h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span>
                        {item.name}{' '}
                        <span className="text-muted-foreground">× {item.quantity}</span>
                      </span>
                      <span className="font-medium">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 border-white/10">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="MapPin" className="h-4 w-4" />
                  Информация о доставке
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="User" className="h-4 w-4 text-muted-foreground" />
                    <span>{order.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" className="h-4 w-4 text-muted-foreground" />
                    <span>{order.customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" className="h-4 w-4 text-muted-foreground" />
                    <span>{order.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Home" className="h-4 w-4 text-muted-foreground" />
                    <span>{order.customer.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ProfileOrders;
