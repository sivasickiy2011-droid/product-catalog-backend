import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from '@/data/ProductData';

interface FashionProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isInFavorites: boolean;
}

const FashionProductModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isInFavorites,
}: FashionProductModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[calc(100vw-2rem)] max-w-[95vw] h-auto max-h-[95vh] overflow-y-auto p-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-none">
        <DialogClose className="absolute right-2 top-2 md:right-4 md:top-4 z-50 rounded-full bg-white/80 dark:bg-black/80 p-1.5 md:p-2 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-all">
          <Icon name="X" className="h-5 w-5 md:h-6 md:w-6" />
        </DialogClose>

        <div className="grid md:grid-cols-2 gap-3 md:gap-8 p-3 md:p-8">
          <div className="relative aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden shadow-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.inStock && (
              <Badge variant="destructive" className="absolute top-2 right-2 md:top-4 md:right-4 shadow-lg text-xs md:text-base px-2 py-1 md:px-4 md:py-2">
                Нет в наличии
              </Badge>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-4 md:space-y-8 pr-0 md:pr-8">
            <div>
              <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                <div className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase">
                  {product.brand}
                </div>
                <Badge variant="outline" className="text-[10px] md:text-xs">
                  {product.category}
                </Badge>
              </div>
              
              <h2 className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-3 md:mb-6">
                {product.name}
              </h2>
              
              <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-3 md:space-y-4 py-4 md:py-8 border-y border-gray-200 dark:border-gray-700">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
                Характеристики
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
                  <Icon name="Ruler" className="h-5 w-5 text-primary" />
                  <span className="font-medium">{product.power}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
                  <Icon name="Package" className="h-5 w-5 text-primary" />
                  <span className="font-medium">{product.voltage}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
                  <Icon name="Shirt" className="h-5 w-5 text-primary" />
                  <span className="font-medium">{product.weight}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-green-600 dark:text-green-400">
                  <Icon name="Check" className="h-5 w-5" />
                  <span className="font-medium">Premium качество</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-baseline gap-2 md:gap-4">
                <span className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  {product.price.toLocaleString()} ₽
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Окончательная цена
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={!product.inStock}
                  size="lg"
                  className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 py-4 md:py-6 text-sm md:text-base font-semibold uppercase tracking-wider"
                >
                  <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
                  Добавить в корзину
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onToggleFavorite(product)}
                  className={`px-4 md:px-6 py-4 md:py-6 ${
                    isInFavorites 
                      ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon 
                    name="Heart" 
                    className={`h-5 w-5 ${isInFavorites ? 'fill-white' : ''}`} 
                  />
                </Button>
              </div>

              <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2 md:gap-3">
                  <Icon name="Truck" className="h-5 w-5" />
                  <span>Бесплатная доставка по Москве</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Icon name="RotateCcw" className="h-5 w-5" />
                  <span>Возврат в течение 14 дней</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Icon name="Shield" className="h-5 w-5" />
                  <span>Гарантия подлинности</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FashionProductModal;