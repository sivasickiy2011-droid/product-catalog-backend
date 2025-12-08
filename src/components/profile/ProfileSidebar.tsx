import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ProfileSidebarProps {
  userData: {
    name: string;
    email: string;
    avatar: string;
  };
  ordersCount: number;
  completedOrders: number;
  totalSpent: number;
}

const ProfileSidebar = ({
  userData,
  ordersCount,
  completedOrders,
  totalSpent,
}: ProfileSidebarProps) => {
  return (
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
                <span className="font-bold">{ordersCount}</span>
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
  );
};

export default ProfileSidebar;
