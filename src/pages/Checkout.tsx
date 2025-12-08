import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = (location.state?.cart as CartItem[]) || [];
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: totalPrice,
      customer: formData,
      status: 'В обработке',
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));

    toast.success('Заказ успешно оформлен!');
    
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Zap" className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">ЭлектроМаркет</h1>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
              На главную
            </Button>
          </div>
        </header>
        <main className="container py-12">
          <div className="text-center">
            <Icon name="ShoppingCart" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Корзина пуста</h2>
            <p className="text-muted-foreground mb-6">Добавьте товары для оформления заказа</p>
            <Button onClick={() => navigate('/')}>
              Перейти к каталогу
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
            <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Назад
          </Button>
        </div>
      </header>

      <main className="container py-12 relative">
        <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-slide-up">Оформление заказа</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-2xl animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl">Контактные данные</CardTitle>
                <CardDescription className="text-base">Укажите информацию для доставки</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">ФИО *</Label>
                    <Input
                      id="name"
                      placeholder="Иванов Иван Иванович"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@mail.ru"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Textarea
                      id="address"
                      placeholder="Город, улица, дом, квартира"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Комментарий к заказу</Label>
                    <Textarea
                      id="comment"
                      placeholder="Дополнительная информация"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/25 transition-all duration-300 text-lg py-6">
                    <Icon name="CheckCircle" className="h-5 w-5 mr-2" />
                    Оформить заказ на {totalPrice.toLocaleString()} ₽
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24 bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-2xl">Ваш заказ</CardTitle>
                <CardDescription className="text-base">{cart.length} товаров</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="flex-1">
                        {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
                      </span>
                      <span className="font-medium">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span>{totalPrice.toLocaleString()} ₽</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Icon name="Truck" className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Доставка по Москве — 500 ₽</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Clock" className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Доставка в течение 1-3 дней</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CreditCard" className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Оплата при получении</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;