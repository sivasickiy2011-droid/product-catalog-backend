import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileTabs from '@/components/profile/ProfileTabs';

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
    avatar: 'https://cdn.poehali.dev/files/memoji.png',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter((o) => o.status === 'Доставлен').length;

  const getStatusColor = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
              ЭлектроМаркет
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="hover:bg-white/10 border-white/10"
          >
            <Icon name="Home" className="h-4 w-4 mr-2" />
            На главную
          </Button>
        </div>
      </header>

      <main className="container py-12 relative">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <ProfileSidebar
            userData={userData}
            ordersCount={orders.length}
            completedOrders={completedOrders}
            totalSpent={totalSpent}
          />

          <ProfileTabs
            orders={orders}
            userData={userData}
            notifications={notifications}
            onUserDataChange={setUserData}
            onNotificationsChange={setNotifications}
            onSaveProfile={handleSaveProfile}
            getStatusColor={getStatusColor}
            formatDate={formatDate}
          />
        </div>
      </main>
    </div>
  );
};

export default Profile;
