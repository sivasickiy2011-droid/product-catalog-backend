import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import CompareDialog from '@/components/CompareDialog';
import CatalogHeader from '@/components/CatalogHeader';
import CatalogContent from '@/components/CatalogContent';
import { Product, CartItem, products } from '@/data/ProductData';
import { catalogThemes } from '@/data/CatalogThemes';

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [currentTheme, setCurrentTheme] = useState<string>('electronics');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const activeThemeData = catalogThemes.find(t => t.id === currentTheme);
  const currentProducts = activeThemeData?.products || products;

  const categories = ['all', ...Array.from(new Set(currentProducts.map(p => p.category)))];
  const brands = ['all', ...Array.from(new Set(currentProducts.map(p => p.brand)))];

  const filteredProducts = useMemo(() => {
    return currentProducts.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && brandMatch && priceMatch;
    });
  }, [currentProducts, selectedCategory, selectedBrand, priceRange]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 20000]);
    setCompareList([]);
    toast.success(`Переключено на: ${catalogThemes.find(t => t.id === themeId)?.name}`);
  };

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
      
      <CatalogHeader
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        compareListLength={compareList.length}
        currentTheme={currentTheme}
        isDarkMode={isDarkMode}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onShowCompare={() => setShowCompare(true)}
        onThemeChange={handleThemeChange}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <CatalogContent
        filteredProducts={filteredProducts}
        compareList={compareList}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        priceRange={priceRange}
        categories={categories}
        brands={brands}
        onCategoryChange={setSelectedCategory}
        onBrandChange={setSelectedBrand}
        onPriceRangeChange={setPriceRange}
        onResetFilters={() => {
          setSelectedCategory('all');
          setSelectedBrand('all');
          setPriceRange([0, 20000]);
        }}
        onAddToCart={addToCart}
        onToggleCompare={toggleCompare}
      />

      <CompareDialog
        products={compareList}
        open={showCompare}
        onOpenChange={setShowCompare}
        onRemoveProduct={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
      />
    </div>
  );
};

export default Index;