export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  emoji: string;
}

export interface ThemeProduct {
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
  reviews?: Review[];
}

export interface CatalogTheme {
  id: string;
  name: string;
  icon: string;
  categories: string[];
  products: ThemeProduct[];
}

export const catalogThemes: CatalogTheme[] = [
  {
    id: 'electronics',
    name: 'Электротовары',
    icon: '⚡',
    categories: ['Освещение'],
    products: [
      {
        id: 1,
        name: 'Лампа LED E14 шар 9W теплый свет',
        brand: 'Feron',
        category: 'Освещение',
        price: 285,
        power: '9 Вт',
        voltage: '220 В',
        weight: '0.04 кг',
        description: 'LED лампа шарообразная форма 2700K теплый белый свет',
        image: 'https://cdn.poehali.dev/files/2244518ref.jpg',
        inStock: true,
        reviews: [
          {
            id: 1,
            author: 'Алексей Петров',
            avatar: 'https://i.pravatar.cc/150?img=12',
            rating: 5,
            comment: 'Отличная дрель! Мощная, удобная, батарея держит долго. Использую для ремонта дома 🔥',
            date: '2025-11-15',
            emoji: '👍'
          },
          {
            id: 2,
            author: 'Мария Смирнова',
            avatar: 'https://i.pravatar.cc/150?img=5',
            rating: 4,
            comment: 'Хороший инструмент, но немного тяжеловат для женских рук. В целом доволна покупкой',
            date: '2025-11-20',
            emoji: '😊'
          }
        ]
      },
      {
        id: 2,
        name: 'Лампа LED E14 свеча 9W белый свет',
        brand: 'Feron',
        category: 'Освещение',
        price: 320,
        power: '9 Вт',
        voltage: '220 В',
        weight: '0.04 кг',
        description: 'LED лампа форма свеча 4000K белый свет',
        image: 'https://cdn.poehali.dev/files/5256453ref.jpg',
        inStock: true,
        reviews: [
          {
            id: 1,
            author: 'Дмитрий Козлов',
            avatar: 'https://i.pravatar.cc/150?img=33',
            rating: 5,
            comment: 'Зверь-машина! Бетон сверлит как масло. Купил для стройки, не пожалел ни разу 💪',
            date: '2025-11-10',
            emoji: '🔨'
          },
          {
            id: 2,
            author: 'Сергей Волков',
            avatar: 'https://i.pravatar.cc/150?img=15',
            rating: 5,
            comment: 'Лучший перфоратор за свои деньги. Makita как всегда на высоте!',
            date: '2025-11-25',
            emoji: '⚡'
          }
        ]
      },
      {
        id: 3,
        name: 'Светильник встраиваемый LED GX53',
        brand: 'Osram',
        category: 'Освещение',
        price: 890,
        power: '9 Вт',
        voltage: '220 В',
        weight: '0.15 кг',
        description: 'Встраиваемый светильник с лампой GX53',
        image: 'https://cdn.poehali.dev/files/3975833.jpg',
        inStock: true,
        reviews: [
          {
            id: 1,
            author: 'Игорь Романов',
            avatar: 'https://i.pravatar.cc/150?img=8',
            rating: 5,
            comment: 'Отличная болгарка! Мощная, режет металл без проблем. DeWalt радует качеством 🔥',
            date: '2025-11-12',
            emoji: '💪'
          },
          {
            id: 2,
            author: 'Антон Белов',
            avatar: 'https://i.pravatar.cc/150?img=22',
            rating: 5,
            comment: 'Компактная и производительная. Использую каждый день на работе, нареканий нет',
            date: '2025-11-18',
            emoji: '👍'
          }
        ]
      },
      {
        id: 4,
        name: 'Лампа LED E14 шар 7W нейтральный свет',
        brand: 'Osram',
        category: 'Освещение',
        price: 380,
        power: '7 Вт',
        voltage: '220 В',
        weight: '0.05 кг',
        description: 'LED лампа E14 560 люмен нейтральный белый свет',
        image: 'https://cdn.poehali.dev/files/3746304ref.jpg',
        inStock: true,
        reviews: [
          {
            id: 1,
            author: 'Елена Соколова',
            avatar: 'https://i.pravatar.cc/150?img=45',
            rating: 5,
            comment: 'Приятный теплый свет, не мерцает. Брала сразу 10 штук для всей квартиры 💡',
            date: '2025-11-08',
            emoji: '😊'
          },
          {
            id: 2,
            author: 'Вадим Кузнецов',
            avatar: 'https://i.pravatar.cc/150?img=18',
            rating: 4,
            comment: 'Хорошая лампа за свои деньги. Philips всегда на высоте',
            date: '2025-11-22',
            emoji: '👌'
          }
        ]
      },
      {
        id: 5,
        name: 'Светильник точечный MR16 GU5.3',
        brand: 'Osram',
        category: 'Освещение',
        price: 760,
        power: '7 Вт',
        voltage: '12 В',
        weight: '0.08 кг',
        description: 'Точечный светильник с лампой MR16',
        image: 'https://cdn.poehali.dev/files/2275716.jpg',
        inStock: true,
        reviews: [
          {
            id: 1,
            author: 'Михаил Орлов',
            avatar: 'https://i.pravatar.cc/150?img=32',
            rating: 5,
            comment: 'Яркий прожектор, отлично освещает двор. Влагозащита работает, зиму пережил 🌟',
            date: '2025-11-05',
            emoji: '🔦'
          },
          {
            id: 2,
            author: 'Ольга Макарова',
            avatar: 'https://i.pravatar.cc/150?img=47',
            rating: 5,
            comment: 'Установили на даче - очень доволны. Светит ярко, собирается легко',
            date: '2025-11-14',
            emoji: '✨'
          }
        ]
      },

    ],
  },
  {
    id: 'fashion',
    name: 'Одежда',
    icon: '👗',
    categories: ['Платья', 'Костюмы', 'Аксессуары'],
    products: [
      {
        id: 101,
        name: 'Вечернее платье "Аврора"',
        brand: 'Valentino',
        category: 'Платья',
        price: 145000,
        power: 'Размер S-M',
        voltage: 'Длина 120 см',
        weight: '0.4 кг',
        description: 'Элегантное вечернее платье из шелка с вышивкой',
        image: 'https://cdn.poehali.dev/files/gettyimages-1847199028-1024x1024.jpg',
        inStock: true,
      },
      {
        id: 102,
        name: 'Деловой костюм "Милан"',
        brand: 'Armani',
        category: 'Костюмы',
        price: 89000,
        power: 'Размер 48-50',
        voltage: 'Шерсть 100%',
        weight: '1.2 кг',
        description: 'Классический мужской костюм из шерсти Super 120s',
        image: 'https://cdn.poehali.dev/files/gettyimages-1462655622-1024x1024.jpg',
        inStock: true,
      },
      {
        id: 103,
        name: 'Кожаная сумка "Престиж"',
        brand: 'Prada',
        category: 'Аксессуары',
        price: 125000,
        power: '35x28x15 см',
        voltage: 'Кожа телёнка',
        weight: '0.9 кг',
        description: 'Дизайнерская сумка из натуральной телячьей кожи',
        image: 'https://cdn.poehali.dev/files/gettyimages-1347455404-1024x1024.jpg',
        inStock: true,
      },
      {
        id: 107,
        name: 'Брючный костюм "Париж"',
        brand: 'Chanel',
        category: 'Костюмы',
        price: 195000,
        power: 'Размер 42-44',
        voltage: 'Твид букле',
        weight: '0.8 кг',
        description: 'Женский костюм в стиле Коко Шанель',
        image: 'https://cdn.poehali.dev/files/gettyimages-2155004323-1024x1024.jpg',
        inStock: true,
      },
      {
        id: 110,
        name: 'Коктейльное платье "Грация"',
        brand: 'Dolce & Gabbana',
        category: 'Платья',
        price: 128000,
        power: 'Размер XS-S',
        voltage: 'Длина 95 см',
        weight: '0.5 кг',
        description: 'Платье-футляр с кружевной отделкой',
        image: 'https://cdn.poehali.dev/files/gettyimages-495960336-1024x1024.jpg',
        inStock: true,
      },
    ],
  },
];