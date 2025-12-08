import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export type ViewMode = 'gallery' | 'magazine' | 'compact';

interface FashionViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const FashionViewSwitcher = ({ currentView, onViewChange }: FashionViewSwitcherProps) => {
  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1">
      <Button
        variant={currentView === 'gallery' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('gallery')}
        className="h-9 px-3"
        title="Gallery View - Крупные карточки"
      >
        <Icon name="LayoutGrid" size={18} />
      </Button>
      
      <Button
        variant={currentView === 'magazine' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('magazine')}
        className="h-9 px-3"
        title="Magazine View - Детальный просмотр"
      >
        <Icon name="Newspaper" size={18} />
      </Button>
      
      <Button
        variant={currentView === 'compact' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('compact')}
        className="h-9 px-3"
        title="Compact Grid - Компактная сетка"
      >
        <Icon name="LayoutList" size={18} />
      </Button>
    </div>
  );
};

export default FashionViewSwitcher;
