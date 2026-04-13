export type MenuCategory = "Starters" | "Mains" | "Desserts" | "Drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  badge?: string;
  spicy?: boolean;
  popular?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: "s1",
    name: "Crispy Calamari",
    description: "Lightly battered squid rings with smoked paprika aioli and lemon wedge",
    price: 12.99,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
    popular: true,
  },
  {
    id: "s2",
    name: "Burrata & Heirloom Tomatoes",
    description: "Creamy burrata with heirloom tomatoes, basil oil and aged balsamic",
    price: 14.99,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80",
  },
  {
    id: "s3",
    name: "Spiced Lamb Kofta",
    description: "Grilled lamb kofta skewers with harissa yogurt and warm flatbread",
    price: 13.99,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80",
    spicy: true,
  },
  {
    id: "s4",
    name: "Truffle Arancini",
    description: "Crispy risotto balls with black truffle, mozzarella and marinara sauce",
    price: 11.99,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&q=80",
    badge: "Chef's Pick",
  },
  // Mains
  {
    id: "m1",
    name: "Ember-Grilled Ribeye",
    description: "12oz dry-aged ribeye over open flame, chimichurri, roasted bone marrow butter",
    price: 48.99,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
    popular: true,
    badge: "Signature",
  },
  {
    id: "m2",
    name: "Pan-Seared Sea Bass",
    description: "Scottish sea bass, saffron beurre blanc, samphire, charred baby leeks",
    price: 36.99,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
  },
  {
    id: "m3",
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, porcini, chanterelle, parmesan crisp, truffle oil",
    price: 22.99,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
    badge: "Vegetarian",
  },
  {
    id: "m4",
    name: "Slow-Braised Short Rib",
    description: "48-hour braised beef short rib, celeriac purée, red wine jus, pickled shallots",
    price: 42.99,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    popular: true,
  },
  {
    id: "m5",
    name: "Harissa Spatchcock Chicken",
    description: "Free-range spatchcock chicken, chermoula, roasted cauliflower, pomegranate",
    price: 28.99,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=600&q=80",
    spicy: true,
  },
  {
    id: "m6",
    name: "Lobster Linguine",
    description: "Half Boston lobster, linguine, cherry tomatoes, white wine, tarragon butter",
    price: 54.99,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80",
    badge: "Premium",
  },
  // Desserts
  {
    id: "d1",
    name: "Valrhona Chocolate Fondant",
    description: "Warm dark chocolate fondant, Tahitian vanilla ice cream, caramel soil",
    price: 11.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80",
    popular: true,
  },
  {
    id: "d2",
    name: "Passionfruit Panna Cotta",
    description: "Italian panna cotta, fresh passionfruit coulis, mango sorbet, tuile",
    price: 9.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
  },
  {
    id: "d3",
    name: "Salted Caramel Tart",
    description: "Buttery shortcrust, salted caramel cream, candied hazelnuts, gold leaf",
    price: 10.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80",
    badge: "Chef's Pick",
  },
  // Drinks
  {
    id: "dr1",
    name: "Smoked Old Fashioned",
    description: "Buffalo Trace bourbon, cherrywood smoke, Angostura bitters, orange peel",
    price: 16.99,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
    popular: true,
  },
  {
    id: "dr2",
    name: "Elderflower Spritz",
    description: "St-Germain elderflower liqueur, prosecco, cucumber, fresh mint",
    price: 13.99,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80",
  },
  {
    id: "dr3",
    name: "Ember Espresso Martini",
    description: "Kahlúa, fresh espresso, vanilla vodka, coffee foam",
    price: 15.99,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=600&q=80",
    badge: "House Special",
  },
  {
    id: "dr4",
    name: "Virgin Garden Fizz",
    description: "Fresh cucumber, mint, lime, elderflower cordial, sparkling water",
    price: 7.99,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
    badge: "Non-Alcoholic",
  },
];

export const CATEGORIES: MenuCategory[] = ["Starters", "Mains", "Desserts", "Drinks"];
