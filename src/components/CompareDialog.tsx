import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

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

interface CompareDialogProps {
  open: boolean;
  products: Product[];
  onOpenChange: (open: boolean) => void;
  onRemoveProduct: (id: number) => void;
}

const CompareDialog = ({ open, products, onOpenChange, onRemoveProduct }: CompareDialogProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-auto bg-card/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon name="GitCompare" className="h-6 w-6 text-primary" />
            </div>
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Сравнение товаров</span>
          </DialogTitle>
          <DialogDescription className="text-base">
            Сравните характеристики выбранных товаров
          </DialogDescription>
        </DialogHeader>
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-6 font-semibold text-lg bg-card/50">Характеристика</th>
                  {products.map(product => (
                    <th key={product.id} className="p-4 bg-card/50">
                      <div className="space-y-3">
                        <div 
                          className="w-full h-36 rounded-xl flex items-center justify-center text-5xl relative overflow-hidden"
                          style={{ background: `linear-gradient(135deg, ${getCategoryColor(product.category)}dd, ${getCategoryColor(product.category)}55)` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          <span className="relative z-10 drop-shadow-2xl">{getCategoryIcon(product.category)}</span>
                        </div>
                        <p className="text-base font-semibold text-left">{product.name}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveProduct(product.id)}
                          className="w-full hover:bg-destructive/10 hover:text-destructive transition-all"
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
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-5 font-medium">Бренд</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 text-center">{product.brand}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                  <td className="p-5 font-medium">Цена</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 text-center font-bold text-lg bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                      {product.price.toLocaleString()} ₽
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-5 font-medium">Мощность</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 text-center">{product.power}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                  <td className="p-5 font-medium">Напряжение</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 text-center">{product.voltage}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-5 font-medium">Вес</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 text-center">{product.weight}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                  <td className="p-5 font-medium">Наличие</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 text-center">
                      {product.inStock ? (
                        <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">В наличии</Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">Нет</Badge>
                      )}
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
  );
};

export default CompareDialog;