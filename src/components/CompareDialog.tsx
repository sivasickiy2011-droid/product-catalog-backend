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
  compareList: Product[];
  onOpenChange: (open: boolean) => void;
  onToggleCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const CompareDialog = ({ open, compareList, onOpenChange, onToggleCompare, onAddToCart }: CompareDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                          onClick={() => onToggleCompare(product)}
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
                        onClick={() => onAddToCart(product)}
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
  );
};

export default CompareDialog;
