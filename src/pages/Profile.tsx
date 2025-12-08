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
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-card/40 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Icon name="Zap" className="h-8 w-8 text-primary relative" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">ЭлектроМаркет</h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="Home" className="h-4 w-4 mr-2" />
            На главную
          </Button>
        </div>
      </header>

      <main className="container py-12 relative">
        <div className="mb-12 animate-slide-up">
          <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">Личный кабинет</h2>
          <p className="text-lg text-muted-foreground">Управление заказами и профилем</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-8">
          <TabsList className="bg-card/50 border border-white/10 backdrop-blur-xl p-1">
            <TabsTrigger value="orders" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <Icon name="Package" className="h-4 w-4" />
              История заказов
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
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
              orders.map((order, idx) => (
                <Card key={order.id} className="animate-fade-in bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3 text-xl">
                          Заказ №{order.id}
                          <Badge variant={getStatusColor(order.status)} className="px-3 py-1">{order.status}</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {formatDate(order.date)}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
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
            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-2xl animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" className="h-5 w-5" />
                  Информация профиля
                </CardTitle>
                <CardDescription>Данные вашего аккаунта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full" />
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center relative shadow-lg shadow-primary/50">
                      <Icon name="User" className="h-12 w-12 text-white" />
                    </div>
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