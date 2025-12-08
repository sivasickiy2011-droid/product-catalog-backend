import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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
  const [userData, setUserData] = useState({
    name: 'Александр Петров',
    email: 'alex.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'Москва, ул. Ленина, д. 10, кв. 25',
    avatar: 'https://cdn.poehali.dev/files/memoji.png'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter(o => o.status === 'Доставлен').length;

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

  const handleSaveProfile = () => {
    toast.success('Профиль успешно обновлен!');
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
          <Button variant="outline" onClick={() => navigate('/')} className="hover:bg-white/10 border-white/10">
            <Icon name="Home" className="h-4 w-4 mr-2" />
            На главную
          </Button>
        </div>
      </header>

      <main className="container py-12 relative">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <aside className="space-y-6">
            <Card className="bg-gradient-to-br from-card via-card/80 to-card/50 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-primary via-purple-500 to-primary" />
              <CardContent className="pt-0 -mt-12 pb-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full" />
                    <img 
                      src={userData.avatar} 
                      alt="Avatar" 
                      className="relative w-24 h-24 rounded-full border-4 border-background object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-background rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-center">{userData.name}</h3>
                  <p className="text-sm text-muted-foreground text-center">{userData.email}</p>
                  
                  <div className="w-full mt-6 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Icon name="Package" className="h-4 w-4 text-primary" />
                        <span className="text-sm">Заказов</span>
                      </div>
                      <span className="font-bold">{orders.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2">
                        <Icon name="CheckCircle" className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Завершено</span>
                      </div>
                      <span className="font-bold">{completedOrders}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2">
                        <Icon name="Wallet" className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Потрачено</span>
                      </div>
                      <span className="font-bold text-sm">{totalSpent.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Icon name="Award" className="h-4 w-4 text-primary" />
                  Статус клиента
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Уровень</span>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">⭐ VIP</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>До следующего уровня</span>
                      <span className="text-muted-foreground">75%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-purple-500 w-[75%] rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">Личный кабинет</h2>
              <p className="text-muted-foreground">Управление профилем и заказами</p>
            </div>

            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="bg-card/50 border border-white/10 backdrop-blur-xl p-1 w-full grid grid-cols-5">
                <TabsTrigger value="orders" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Package" className="h-4 w-4" />
                  <span className="hidden sm:inline">Заказы</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="User" className="h-4 w-4" />
                  <span className="hidden sm:inline">Профиль</span>
                </TabsTrigger>
                <TabsTrigger value="promo" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Tag" className="h-4 w-4" />
                  <span className="hidden sm:inline">Промокоды</span>
                </TabsTrigger>
                <TabsTrigger value="favorites" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Heart" className="h-4 w-4" />
                  <span className="hidden sm:inline">Избранное</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Settings" className="h-4 w-4" />
                  <span className="hidden sm:inline">Настройки</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                {orders.length === 0 ? (
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
                      <Button size="lg" onClick={() => navigate('/')} className="bg-gradient-to-r from-primary to-purple-500 shadow-lg shadow-primary/25">
                        <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
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
                                  className="flex justify-between text-sm bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors"
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
                  ))
                )}
              </TabsContent>

              <TabsContent value="promo" className="space-y-4">
                <Card className="bg-gradient-to-br from-primary/10 via-purple-500/5 to-card/50 border-primary/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Tag" className="h-5 w-5 text-primary" />
                      Активные промокоды
                    </CardTitle>
                    <CardDescription>Используйте промокоды для получения скидок</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-2xl font-bold text-green-400 mb-1">ELECTRO2025</div>
                          <p className="text-sm text-green-300">Скидка 15% на весь заказ</p>
                        </div>
                        <Badge className="bg-green-500/30 text-green-200 border-green-500/50">Активен</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-green-300 mt-3">
                        <Icon name="Clock" className="h-3 w-3" />
                        <span>Действует до 31.12.2025</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-2xl font-bold text-blue-400 mb-1">NEWCLIENT</div>
                          <p className="text-sm text-blue-300">Скидка 500₽ для новых клиентов</p>
                        </div>
                        <Badge className="bg-blue-500/30 text-blue-200 border-blue-500/50">Активен</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-blue-300 mt-3">
                        <Icon name="Clock" className="h-3 w-3" />
                        <span>Действует до 15.01.2026</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-2xl font-bold text-purple-400 mb-1">VIP10</div>
                          <p className="text-sm text-purple-300">VIP скидка 10%</p>
                        </div>
                        <Badge className="bg-purple-500/30 text-purple-200 border-purple-500/50">Активен</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-purple-300 mt-3">
                        <Icon name="Award" className="h-3 w-3" />
                        <span>Постоянная скидка для VIP клиентов</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-2xl font-bold text-orange-400 mb-1">MEGA20</div>
                          <p className="text-sm text-orange-300">Мегаскидка 20%</p>
                        </div>
                        <Badge className="bg-orange-500/30 text-orange-200 border-orange-500/50">Активен</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-orange-300 mt-3">
                        <Icon name="Zap" className="h-3 w-3" />
                        <span>Специальное предложение</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Gift" className="h-5 w-5 text-primary" />
                      Как использовать промокод?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="font-medium">Добавьте товары в корзину</p>
                        <p className="text-sm text-muted-foreground">Выберите нужные товары из каталога</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="font-medium">Откройте корзину</p>
                        <p className="text-sm text-muted-foreground">Нажмите на иконку корзины в шапке сайта</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">3</div>
                      <div>
                        <p className="font-medium">Введите промокод</p>
                        <p className="text-sm text-muted-foreground">Вставьте код в специальное поле и нажмите "Применить"</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">4</div>
                      <div>
                        <p className="font-medium">Получите скидку!</p>
                        <p className="text-sm text-muted-foreground">Скидка автоматически применится к вашему заказу</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Icon name="Info" className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2 text-yellow-200">Важная информация</h4>
                        <ul className="space-y-1 text-sm text-yellow-100/80">
                          <li>• Можно использовать только один промокод за заказ</li>
                          <li>• Промокоды не суммируются с другими акциями</li>
                          <li>• Проверяйте срок действия промокода перед использованием</li>
                          <li>• VIP промокоды доступны только для постоянных клиентов</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-4">
                <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="User" className="h-5 w-5" />
                      Личные данные
                    </CardTitle>
                    <CardDescription>Управление вашей личной информацией</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Полное имя</Label>
                        <Input 
                          id="name" 
                          value={userData.name} 
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="bg-background/50 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input 
                          id="phone" 
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className="bg-background/50 border-white/10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="bg-background/50 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес доставки</Label>
                      <Input 
                        id="address" 
                        value={userData.address}
                        onChange={(e) => setUserData({...userData, address: e.target.value})}
                        className="bg-background/50 border-white/10"
                      />
                    </div>
                    <Button onClick={handleSaveProfile} className="w-full bg-gradient-to-r from-primary to-purple-500">
                      <Icon name="Save" className="h-4 w-4 mr-2" />
                      Сохранить изменения
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites">
                <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
                      <Icon name="Heart" className="h-20 w-20 text-red-500/50 relative" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Избранных товаров нет</h3>
                    <p className="text-muted-foreground mb-8 text-center max-w-md">
                      Добавляйте товары в избранное, чтобы быстро находить их
                    </p>
                    <Button size="lg" onClick={() => navigate('/')} className="bg-gradient-to-r from-primary to-purple-500 shadow-lg shadow-primary/25">
                      <Icon name="Search" className="h-5 w-5 mr-2" />
                      Найти товары
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Bell" className="h-5 w-5" />
                      Уведомления
                    </CardTitle>
                    <CardDescription>Настройте способы получения уведомлений</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <Icon name="Mail" className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Email уведомления</div>
                          <div className="text-sm text-muted-foreground">О статусе заказа и акциях</div>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <Icon name="Smartphone" className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">SMS уведомления</div>
                          <div className="text-sm text-muted-foreground">Важные обновления по SMS</div>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <Icon name="BellRing" className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Push-уведомления</div>
                          <div className="text-sm text-muted-foreground">В браузере и приложении</div>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Shield" className="h-5 w-5" />
                      Безопасность
                    </CardTitle>
                    <CardDescription>Управление паролем и безопасностью аккаунта</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/10">
                      <Icon name="Lock" className="h-4 w-4 mr-2" />
                      Изменить пароль
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/10">
                      <Icon name="Smartphone" className="h-4 w-4 mr-2" />
                      Двухфакторная аутентификация
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/10">
                      <Icon name="History" className="h-4 w-4 mr-2" />
                      История входов
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;