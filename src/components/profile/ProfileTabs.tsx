import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import ProfileOrders from './ProfileOrders';

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

interface ProfileTabsProps {
  orders: Order[];
  userData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  onUserDataChange: (data: any) => void;
  onNotificationsChange: (notifications: any) => void;
  onSaveProfile: () => void;
  getStatusColor: (status: string) => 'default' | 'secondary' | 'destructive' | 'outline';
  formatDate: (dateString: string) => string;
}

const ProfileTabs = ({
  orders,
  userData,
  notifications,
  onUserDataChange,
  onNotificationsChange,
  onSaveProfile,
  getStatusColor,
  formatDate,
}: ProfileTabsProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="animate-slide-up">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
          Личный кабинет
        </h2>
        <p className="text-muted-foreground">Управление профилем и заказами</p>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="bg-card/50 border border-white/10 backdrop-blur-xl p-1 w-full grid grid-cols-5">
          <TabsTrigger
            value="orders"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Icon name="Package" className="h-4 w-4" />
            <span className="hidden sm:inline">Заказы</span>
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Icon name="User" className="h-4 w-4" />
            <span className="hidden sm:inline">Профиль</span>
          </TabsTrigger>
          <TabsTrigger
            value="promo"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Icon name="Tag" className="h-4 w-4" />
            <span className="hidden sm:inline">Промокоды</span>
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Icon name="Heart" className="h-4 w-4" />
            <span className="hidden sm:inline">Избранное</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Icon name="Settings" className="h-4 w-4" />
            <span className="hidden sm:inline">Настройки</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <ProfileOrders orders={orders} getStatusColor={getStatusColor} formatDate={formatDate} />
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
                  <Badge className="bg-green-500/30 text-green-200 border-green-500/50">
                    Активен
                  </Badge>
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
                  <Badge className="bg-purple-500/30 text-purple-200 border-purple-500/50">
                    Активен
                  </Badge>
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
                  <Badge className="bg-orange-500/30 text-orange-200 border-orange-500/50">
                    Активен
                  </Badge>
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
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Добавьте товары в корзину</p>
                  <p className="text-sm text-muted-foreground">
                    Выберите нужные товары из каталога
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Откройте корзину</p>
                  <p className="text-sm text-muted-foreground">
                    Нажмите на иконку корзины в шапке сайта
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Введите промокод</p>
                  <p className="text-sm text-muted-foreground">
                    Вставьте код в специальное поле и нажмите "Применить"
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium">Получите скидку!</p>
                  <p className="text-sm text-muted-foreground">
                    Скидка автоматически применится к вашему заказу
                  </p>
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
                    onChange={(e) => onUserDataChange({ ...userData, name: e.target.value })}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => onUserDataChange({ ...userData, phone: e.target.value })}
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
                  onChange={(e) => onUserDataChange({ ...userData, email: e.target.value })}
                  className="bg-background/50 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес доставки</Label>
                <Input
                  id="address"
                  value={userData.address}
                  onChange={(e) => onUserDataChange({ ...userData, address: e.target.value })}
                  className="bg-background/50 border-white/10"
                />
              </div>
              <Button
                onClick={onSaveProfile}
                className="w-full bg-gradient-to-r from-primary to-purple-500"
              >
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
              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-primary to-purple-500 shadow-lg shadow-primary/25"
              >
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
                  onCheckedChange={(checked) =>
                    onNotificationsChange({ ...notifications, email: checked })
                  }
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
                  onCheckedChange={(checked) =>
                    onNotificationsChange({ ...notifications, sms: checked })
                  }
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
                  onCheckedChange={(checked) =>
                    onNotificationsChange({ ...notifications, push: checked })
                  }
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
              <Button
                variant="outline"
                className="w-full justify-start border-white/10 hover:bg-white/10"
              >
                <Icon name="Lock" className="h-4 w-4 mr-2" />
                Изменить пароль
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-white/10 hover:bg-white/10"
              >
                <Icon name="Smartphone" className="h-4 w-4 mr-2" />
                Двухфакторная аутентификация
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-white/10 hover:bg-white/10"
              >
                <Icon name="History" className="h-4 w-4 mr-2" />
                История входов
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
