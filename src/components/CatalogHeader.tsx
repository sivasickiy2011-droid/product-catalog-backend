import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ShoppingCart from '@/components/ShoppingCart';
import { CartItem } from '@/data/ProductData';
import { catalogThemes } from '@/data/CatalogThemes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CatalogHeaderProps {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  compareListLength: number;
  currentTheme: string;
  isDarkMode: boolean;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
  onShowCompare: () => void;
  onThemeChange: (themeId: string) => void;
  onToggleDarkMode: () => void;
}

const CatalogHeader = ({
  cart,
  totalItems,
  totalPrice,
  compareListLength,
  currentTheme,
  isDarkMode,
  onUpdateQuantity,
  onRemoveFromCart,
  onShowCompare,
  onThemeChange,
  onToggleDarkMode,
}: CatalogHeaderProps) => {
  const navigate = useNavigate();
  const activeTheme = catalogThemes.find(t => t.id === currentTheme);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-card/40 backdrop-blur-xl supports-[backdrop-filter]:bg-card/40">
      <div className="container flex h-auto min-h-[64px] md:h-20 items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-0">
        <div className="flex items-center gap-2 md:gap-6 flex-wrap md:flex-nowrap">
          <button 
            onClick={() => navigate(currentTheme === 'fashion' ? '/fashion' : '/')}
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="text-2xl md:text-3xl">{activeTheme?.icon || '⚡'}</div>
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
              {activeTheme?.name || 'Каталог'}
            </h1>
          </button>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hover:bg-white/10 border-white/10 h-8 md:h-9">
                  <Icon name="Layers" className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                  <span className="hidden md:inline">Каталог</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card/95 backdrop-blur-xl border-white/10">
                {catalogThemes.map(theme => (
                  <DropdownMenuItem
                    key={theme.id}
                    onClick={() => {
                      if (theme.id === 'fashion') {
                        navigate('/fashion');
                      } else {
                        navigate('/');
                      }
                      onThemeChange(theme.id);
                    }}
                    className="cursor-pointer"
                  >
                    <span className="mr-2 text-lg">{theme.icon}</span>
                    {theme.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              onClick={onToggleDarkMode}
              className="hover:bg-white/10 border-white/10 h-8 md:h-9 w-8 md:w-9 p-0"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white/10 transition-all h-8 md:h-9 hidden sm:flex"
            onClick={() => navigate('/profile')}
          >
            <Icon name="User" className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden md:inline">Профиль</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="relative hover:bg-white/10 border-white/10 transition-all h-8 md:h-9"
            onClick={onShowCompare}
            disabled={compareListLength === 0}
          >
            <Icon name="GitCompare" className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden md:inline">Сравнить</span>
            {compareListLength > 0 && (
              <Badge className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {compareListLength}
              </Badge>
            )}
          </Button>

          <ShoppingCart
            cart={cart}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveFromCart={onRemoveFromCart}
          />
        </div>
      </div>
    </header>
  );
};

export default CatalogHeader;