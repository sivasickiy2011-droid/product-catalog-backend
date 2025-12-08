import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import CompareDialog from '@/components/CompareDialog';
import CatalogHeader from '@/components/CatalogHeader';
import CatalogContent from '@/components/CatalogContent';
import FashionFilters from '@/components/FashionFilters';
import FashionFiltersDrawer from '@/components/FashionFiltersDrawer';
import FashionViewSwitcher, { ViewMode } from '@/components/FashionViewSwitcher';
import FashionProductGrid from '@/components/FashionProductGrid';
import { Product, CartItem, products } from '@/data/ProductData';
import { catalogThemes } from '@/data/CatalogThemes';

const Index = () => {
  const location = useLocation();
  const initialTheme = location.pathname === '/fashion' ? 'fashion' : 'electronics';
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [favoritesList, setFavoritesList] = useState<Product[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedBrand, setSelectedBrand] = useState<string>('Все');
  const [priceRange, setPriceRange] = useState(initialTheme === 'fashion' ? [0, 500000] : [0, 40000000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [currentTheme, setCurrentTheme] = useState<string>(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'fashion');

  const activeThemeData = catalogThemes.find(t => t.id === currentTheme);
  const currentProducts = activeThemeData?.products || products;

  const categories = ['Все', ...Array.from(new Set(currentProducts.map(p => p.category)))];
  const brands = ['Все', ...Array.from(new Set(currentProducts.map(p => p.brand)))];

  const filteredProducts = useMemo(() => {
    return currentProducts.filter(product => {
      const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
      const brandMatch = selectedBrand === 'Все' || product.brand === selectedBrand;
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
    setSelectedCategory('Все');
    setSelectedBrand('Все');
    setSelectedSizes([]);
    setSelectedColors([]);
    if (themeId === 'fashion') {
      setPriceRange([0, 500000]);
    } else {
      setPriceRange([0, 40000000]);
    }
    setCompareList([]);
    toast.success(`Переключено на: ${catalogThemes.find(t => t.id === themeId)?.name}`);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
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

  const toggleFavorite = (product: Product) => {
    setFavoritesList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        toast.info('Товар удален из избранного');
        return prev.filter(p => p.id !== product.id);
      }
      toast.success('Товар добавлен в избранное ❤️');
      return [...prev, product];
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isFashionTheme = currentTheme === 'fashion';

  const handleResetFilters = () => {
    setSelectedCategory('Все');
    setSelectedBrand('Все');
    setSelectedSizes([]);
    setSelectedColors([]);
    if (isFashionTheme) {
      setPriceRange([0, 500000]);
    } else {
      setPriceRange([0, 40000000]);
    }
  };

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

      {isFashionTheme ? (
        <main className="container py-6 md:py-12 px-4 md:px-6">
          <div className="mb-6 md:mb-8 animate-slide-up flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                Дизайнерская одежда
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground">
                Найдено {filteredProducts.length} товаров
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FashionFiltersDrawer
                brands={brands}
                categories={categories}
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                selectedSizes={selectedSizes}
                selectedColors={selectedColors}
                onBrandChange={setSelectedBrand}
                onCategoryChange={setSelectedCategory}
                onPriceRangeChange={setPriceRange}
                onSizeToggle={toggleSize}
                onColorToggle={toggleColor}
                onResetFilters={handleResetFilters}
              />
              <FashionViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block">
              <FashionFilters
                brands={brands}
                categories={categories}
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                selectedSizes={selectedSizes}
                selectedColors={selectedColors}
                onBrandChange={setSelectedBrand}
                onCategoryChange={setSelectedCategory}
                onPriceRangeChange={setPriceRange}
                onSizeToggle={toggleSize}
                onColorToggle={toggleColor}
                onResetFilters={handleResetFilters}
              />
            </div>

            <div className="flex-1">
              <FashionProductGrid
                products={filteredProducts}
                viewMode={viewMode}
                compareList={compareList}
                favoritesList={favoritesList}
                onAddToCart={addToCart}
                onToggleCompare={toggleCompare}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </div>
        </main>
      ) : (
        <CatalogContent
          filteredProducts={filteredProducts}
          compareList={compareList}
          favoritesList={favoritesList}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          priceRange={priceRange}
          categories={categories}
          brands={brands}
          currentTheme={currentTheme}
          onCategoryChange={setSelectedCategory}
          onBrandChange={setSelectedBrand}
          onPriceRangeChange={setPriceRange}
          onResetFilters={handleResetFilters}
          onAddToCart={addToCart}
          onToggleCompare={toggleCompare}
          onToggleFavorite={toggleFavorite}
        />
      )}

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