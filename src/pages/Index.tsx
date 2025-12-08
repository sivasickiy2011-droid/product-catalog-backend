import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
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

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Дрель-шуруповерт аккумуляторная',
    brand: 'Bosch',
    category: 'Электроинструменты',
    price: 12990,
    power: '1800 Вт',
    voltage: '18 В',
    weight: '1.5 кг',
    description: 'Профессиональный инструмент для сверления и завинчивания',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 2,
    name: 'Перфоратор SDS-Plus',
    brand: 'Makita',
    category: 'Электроинструменты',
    price: 18500,
    power: '2500 Вт',
    voltage: '220 В',
    weight: '3.2 кг',
    description: 'Мощный перфоратор для бетона и камня',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 3,
    name: 'Болгарка угловая шлифмашина',
    brand: 'DeWalt',
    category: 'Электроинструменты',
    price: 8990,
    power: '2000 Вт',
    voltage: '220 В',
    weight: '2.1 кг',
    description: 'Компактная УШМ для резки и шлифовки',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 4,
    name: 'Светодиодная лампа E27 15W',
    brand: 'Philips',
    category: 'Освещение',
    price: 450,
    power: '15 Вт',
    voltage: '220 В',
    weight: '0.05 кг',
    description: 'Энергосберегающая LED лампа теплый белый',
    image: 'https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 5,
    name: 'Прожектор светодиодный 50W',
    brand: 'Osram',
    category: 'Освещение',
    price: 2490,
    power: '50 Вт',
    voltage: '220 В',
    weight: '1.2 кг',
    description: 'Уличный IP65 светодиодный прожектор',
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 6,
    name: 'Люстра потолочная 3 плафона',
    brand: 'Лючия',
    category: 'Освещение',
    price: 5990,
    power: '60 Вт',
    voltage: '220 В',
    weight: '2.5 кг',
    description: 'Современная потолочная люстра для гостиной',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop',
    inStock: false,
  },
  {
    id: 7,
    name: 'Кабель ВВГ 3x2.5 мм² (100м)',
    brand: 'Камкабель',
    category: 'Кабели',
    price: 3200,
    power: '—',
    voltage: '220 В',
    weight: '15 кг',
    description: 'Силовой кабель для скрытой проводки',
    image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 8,
    name: 'Удлинитель 5 розеток 3м',
    brand: 'Эра',
    category: 'Кабели',
    price: 890,
    power: '3500 Вт',
    voltage: '220 В',
    weight: '0.6 кг',
    description: 'Сетевой фильтр с защитой от перегрузки',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    inStock: true,
  },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 20000]);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && brandMatch && priceMatch;
    });
  }, [selectedCategory, selectedBrand, priceRange]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success('Товар добавлен в корзину');
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.info('Товар удален из корзины');
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        toast.error('Максимум 3 товара для сравнения');
        return prev;
      }
      toast.success('Товар добавлен к сравнению');
      return [...prev, product];
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">ЭлектроМаркет</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => setShowCompare(true)}
              disabled={compareList.length === 0}
            >
              <Icon name="GitCompare" className="h-4 w-4 mr-2" />
              Сравнить
              {compareList.length > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {compareList.length}
                </Badge>
              )}
            </Button>

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
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="ml-auto"
                                onClick={() => removeFromCart(item.id)}
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
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Каталог электротоваров</h2>
            <p className="text-muted-foreground">Широкий выбор качественного оборудования и материалов</p>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="SlidersHorizontal" className="h-5 w-5" />
              Фильтры
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Категория</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.filter(c => c !== 'all').map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Бренд</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все бренды</SelectItem>
                    {brands.filter(b => b !== 'all').map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Цена: {priceRange[0]} - {priceRange[1]} ₽
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={20000}
                  step={100}
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card key={product.id} className="flex flex-col animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <CardHeader className="p-0">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {!product.inStock && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      Нет в наличии
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <Badge variant="outline" className="mb-2">{product.brand}</Badge>
                <CardTitle className="text-base mb-2 line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="text-xs mb-3 line-clamp-2">{product.description}</CardDescription>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Мощность:</span>
                    <span className="font-medium">{product.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Напряжение:</span>
                    <span className="font-medium">{product.voltage}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex-col gap-2">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</span>
                </div>
                <div className="flex gap-2 w-full">
                  <Button
                    className="flex-1"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                    В корзину
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleCompare(product)}
                    className={compareList.find(p => p.id === product.id) ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <Icon name="GitCompare" className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры фильтров</p>
          </div>
        )}
      </main>

      <Dialog open={showCompare} onOpenChange={setShowCompare}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="GitCompare" className="h-5 w-5" />
              Сравнение товаров
            </DialogTitle>
            <DialogDescription>
              Сравните характеристики выбранных товаров
            </DialogDescription>
          </DialogHeader>
          {compareList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Характеристика</th>
                    {compareList.map(product => (
                      <th key={product.id} className="p-4">
                        <div className="space-y-2">
                          <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded" />
                          <p className="text-sm font-medium text-left">{product.name}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCompare(product)}
                            className="w-full"
                          >
                            <Icon name="X" className="h-4 w-4 mr-1" />
                            Убрать
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Бренд</td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-4 text-center">{product.brand}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium">Цена</td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-4 text-center font-bold text-primary">
                        {product.price.toLocaleString()} ₽
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Мощность</td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-4 text-center">{product.power}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium">Напряжение</td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-4 text-center">{product.voltage}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Вес</td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-4 text-center">{product.weight}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium">Наличие</td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        {product.inStock ? (
                          <Badge variant="default">В наличии</Badge>
                        ) : (
                          <Badge variant="destructive">Нет</Badge>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Действие</td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-4">
                        <Button
                          className="w-full"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          В корзину
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="GitCompare" className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Выберите товары для сравнения</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
