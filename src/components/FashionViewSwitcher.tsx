import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export type ViewMode = 'gallery' | 'magazine' | 'compact';

interface FashionViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const FashionViewSwitcher = ({ currentView, onViewChange }: FashionViewSwitcherProps) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-0.5 sm:p-1">
      <Button
        variant={currentView === 'gallery' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('gallery')}
        className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 p-0 sm:p-2"
        title="Gallery View - Крупные карточки"
      >
        <Icon name="LayoutGrid" size={16} className="sm:w-[18px] sm:h-[18px]" />
      </Button>
      
      <Button
        variant={currentView === 'magazine' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('magazine')}
        className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 p-0 sm:p-2"
        title="Magazine View - Детальный просмотр"
      >
        <Icon name="Newspaper" size={16} className="sm:w-[18px] sm:h-[18px]" />
      </Button>
      
      <Button
        variant={currentView === 'compact' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('compact')}
        className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 p-0 sm:p-2"
        title="Compact Grid - Компактная сетка"
      >
        <Icon name="LayoutList" size={16} className="sm:w-[18px] sm:h-[18px]" />
      </Button>
    </div>
  );
};

export default FashionViewSwitcher;