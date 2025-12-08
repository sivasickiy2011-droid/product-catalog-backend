import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import ShoppingCart from '@/components/ShoppingCart';
import CompareDialog from '@/components/CompareDialog';

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
    image: 'https://placehold.co/400x300/0EA5E9/ffffff?text=Дрель',
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
    image: 'https://placehold.co/400x300/0EA5E9/ffffff?text=Перфоратор',
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
    image: 'https://placehold.co/400x300/0EA5E9/ffffff?text=Болгарка',
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
    image: 'https://placehold.co/400x300/FCD34D/1A1F2C?text=Лампа',
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
    image: 'https://placehold.co/400x300/FCD34D/1A1F2C?text=Прожектор',
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
    image: 'https://placehold.co/400x300/FCD34D/1A1F2C?text=Люстра',
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
    image: 'https://placehold.co/400x300/8B5CF6/ffffff?text=Кабель',
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
    image: 'https://placehold.co/400x300/8B5CF6/ffffff?text=Удлинитель',
    inStock: true,
  },
];

const Index = () => {
  const navigate = useNavigate();
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
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-card/40 backdrop-blur-xl supports-[backdrop-filter]:bg-card/40">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Icon name="Zap" className="h-8 w-8 text-primary relative" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">ЭлектроМаркет</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-white/10 transition-all"
              onClick={() => navigate('/profile')}
            >
              <Icon name="User" className="h-4 w-4 mr-2" />
              Профиль
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="relative hover:bg-white/10 border-white/10 transition-all"
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

            <ShoppingCart
              cart={cart}
              totalItems={totalItems}
              totalPrice={totalPrice}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
            />
          </div>
        </div>
      </header>

      <main className="container py-12 relative">
        <div className="mb-12 space-y-8 animate-slide-up">
          <div>
            <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">Каталог электротоваров</h2>
            <p className="text-lg text-muted-foreground">Широкий выбор качественного оборудования и материалов</p>
          </div>

          <ProductFilters
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            priceRange={priceRange}
            categories={categories}
            brands={brands}
            onCategoryChange={setSelectedCategory}
            onBrandChange={setSelectedBrand}
            onPriceRangeChange={setPriceRange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={addToCart}
              onToggleCompare={toggleCompare}
              isInCompare={!!compareList.find(p => p.id === product.id)}
            />
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

      <CompareDialog
        open={showCompare}
        compareList={compareList}
        onOpenChange={setShowCompare}
        onToggleCompare={toggleCompare}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default Index;