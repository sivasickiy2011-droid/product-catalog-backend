import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product as Product;
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="PackageX" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <Button onClick={() => navigate('/')}>Вернуться к каталогу</Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = () => {
    switch (product.category) {
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

  const getCategoryIcon = () => {
    switch (product.category) {
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

  const handleAddToCart = () => {
    toast.success(`${product.name} (${quantity} шт.) добавлен в корзину`);
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
            <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
            К каталогу
          </Button>
        </div>
      </header>

      <main className="container py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-slide-up">
          <div className="space-y-6">
            <Card className="overflow-hidden bg-gradient-to-br from-card to-card/50 border-white/10 shadow-2xl">
              <CardContent className="p-0">
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLDivElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-full h-[500px] hidden items-center justify-center text-9xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${getCategoryColor()}dd, ${getCategoryColor()}55)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <span className="relative z-10 drop-shadow-2xl">{getCategoryIcon()}</span>
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg px-6 py-2">
                        Нет в наличии
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden bg-gradient-to-br from-card to-card/50 border-white/10 cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all">
                  <CardContent className="p-0">
                    <img
                      src={product.image}
                      alt={`${product.name} ${i}`}
                      className="w-full h-24 object-cover opacity-50 hover:opacity-100 transition-opacity"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4 bg-white/5 border-white/10 backdrop-blur-sm text-base px-4 py-1">
                {product.category}
              </Badge>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className="text-base px-4 py-1">
                  {product.brand}
                </Badge>
                {product.inStock && (
                  <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30 text-base px-4 py-1">
                    ✓ В наличии
                  </Badge>
                )}
              </div>
              <div className="text-6xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-8">
                {product.price.toLocaleString()} ₽
              </div>
            </div>

            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold mb-4">Характеристики</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-white/5">
                    <span className="text-muted-foreground">Мощность</span>
                    <span className="font-semibold">{product.power}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/5">
                    <span className="text-muted-foreground">Напряжение</span>
                    <span className="font-semibold">{product.voltage}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Вес</span>
                    <span className="font-semibold">{product.weight}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-xl">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={!product.inStock}
                      className="h-12 w-12 border-white/10 hover:bg-white/10"
                    >
                      <Icon name="Minus" className="h-5 w-5" />
                    </Button>
                    <span className="text-3xl font-bold w-16 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={!product.inStock}
                      className="h-12 w-12 border-white/10 hover:bg-white/10"
                    >
                      <Icon name="Plus" className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <Button
                      className="w-full h-14 text-lg bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/25 transition-all duration-300"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
                      Добавить в корзину
                    </Button>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Итого: <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">{(product.price * quantity).toLocaleString()} ₽</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-card to-card/50 border-white/10">
                <CardContent className="p-4 text-center">
                  <Icon name="Truck" className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Доставка</p>
                  <p className="text-xs text-muted-foreground">1-3 дня</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-card to-card/50 border-white/10">
                <CardContent className="p-4 text-center">
                  <Icon name="Shield" className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Гарантия</p>
                  <p className="text-xs text-muted-foreground">12 месяцев</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-card to-card/50 border-white/10">
                <CardContent className="p-4 text-center">
                  <Icon name="RefreshCw" className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Возврат</p>
                  <p className="text-xs text-muted-foreground">14 дней</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mt-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <TabsList className="bg-card/50 border border-white/10 backdrop-blur-xl p-1">
            <TabsTrigger value="description" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              Описание
            </TabsTrigger>
            <TabsTrigger value="specs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              Характеристики
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              Отзывы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">О товаре</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-6 space-y-3 text-muted-foreground">
                  <p>• Высокое качество материалов и сборки</p>
                  <p>• Современный дизайн и эргономика</p>
                  <p>• Соответствие международным стандартам</p>
                  <p>• Официальная гарантия производителя</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Технические характеристики</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-4 border-b border-white/5">
                    <span className="text-lg text-muted-foreground">Бренд</span>
                    <span className="text-lg font-semibold">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-white/5">
                    <span className="text-lg text-muted-foreground">Категория</span>
                    <span className="text-lg font-semibold">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-white/5">
                    <span className="text-lg text-muted-foreground">Мощность</span>
                    <span className="text-lg font-semibold">{product.power}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-white/5">
                    <span className="text-lg text-muted-foreground">Напряжение</span>
                    <span className="text-lg font-semibold">{product.voltage}</span>
                  </div>
                  <div className="flex justify-between py-4">
                    <span className="text-lg text-muted-foreground">Вес</span>
                    <span className="text-lg font-semibold">{product.weight}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 backdrop-blur-xl shadow-xl">
              <CardContent className="p-8 text-center">
                <Icon name="MessageSquare" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Отзывов пока нет</h3>
                <p className="text-lg text-muted-foreground">Станьте первым, кто оставит отзыв о товаре</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProductDetail;
