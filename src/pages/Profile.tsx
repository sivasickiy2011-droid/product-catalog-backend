import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const Profile = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Доставлен':
        return 'default';
      case 'В обработке':
        return 'secondary';
      case 'Отменен':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">ЭлектроМаркет</h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="Home" className="h-4 w-4 mr-2" />
            На главную
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Личный кабинет</h2>
          <p className="text-muted-foreground">Управление заказами и профилем</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders" className="gap-2">
              <Icon name="Package" className="h-4 w-4" />
              История заказов
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" className="h-4 w-4" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Icon name="Package" className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Заказов пока нет</h3>
                  <p className="text-muted-foreground mb-6 text-center">
                    Оформите первый заказ в нашем каталоге
                  </p>
                  <Button onClick={() => navigate('/')}>
                    <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                    Перейти к покупкам
                  </Button>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="animate-fade-in">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Заказ №{order.id}
                          <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {formatDate(order.date)}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {order.total.toLocaleString()} ₽
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.items.length} товаров
                        </div>
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
                              className="flex justify-between text-sm bg-muted/30 p-2 rounded"
                            >
                              <span>
                                {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
                              </span>
                              <span className="font-medium">
                                {(item.price * item.quantity).toLocaleString()} ₽
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="MapPin" className="h-4 w-4" />
                          Информация о доставке
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">Получатель:</span>{' '}
                            {order.customer.name}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Телефон:</span>{' '}
                            {order.customer.phone}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Email:</span>{' '}
                            {order.customer.email}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Адрес:</span>{' '}
                            {order.customer.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" className="h-5 w-5" />
                  Информация профиля
                </CardTitle>
                <CardDescription>Данные вашего аккаунта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Гость</h3>
                    <p className="text-muted-foreground">guest@electromarket.ru</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon name="Package" className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{orders.length}</div>
                          <div className="text-sm text-muted-foreground">Заказов</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon name="ShoppingBag" className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()} ₽
                          </div>
                          <div className="text-sm text-muted-foreground">Всего потрачено</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Settings" className="h-4 w-4 mr-2" />
                    Настройки профиля
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Bell" className="h-4 w-4 mr-2" />
                    Уведомления
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive">
                    <Icon name="LogOut" className="h-4 w-4 mr-2" />
                    Выйти
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
