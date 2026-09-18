export const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'valorant', label: 'Valorant' },
  { id: 'lol', label: 'League of Legends' },
  { id: 'fc26', label: 'FC 26 Coins' },
  { id: 'pubg', label: 'PUBG' },
  { id: 'roblox', label: 'Roblox' },
  { id: 'freefire', label: 'Free Fire' },
  { id: 'netflix', label: 'Netflix' },
  { id: 'other', label: 'Autres' },
]

export const initialProducts = [
  {
    id: 'val-1', category: 'valorant', name: 'Valorant Points', subtitle: 'VP • Livraison instantanée',
    image: '/https://s.pacn.ws/1/p/166/valorant-gift-card-eur-25--europe-account-759335.3.jpg?v=srnoyc&width=800', // image fournie: Reyna + logo V rouge
    badge: 'HOT', description: 'Recharge ton compte Valorant en quelques secondes. Code officiel Riot. Carte EU.',
    variants: [
      { id: 'val-1000', label: '1000 VP', price: 38.00 },
      { id: 'val-2050', label: '2050 VP', price: 76.00 },
      { id: 'val-2450', label: '2450 VP', price: 92.00 },
    ],
    stock: 124, rating: 4.9
  },
  {
    id: 'lol-1', category: 'lol', name: 'League of Legends RP', subtitle: 'Riot Points EUW / EUNE',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80&auto=format&fit=crop', // LoL - arena
    badge: 'BEST SELLER', description: 'Débloque skins, champions et chromas. Code valable Europe.',
    variants: [
      { id: 'lol-650', label: '650 RP', price: 5.00 },
      { id: 'lol-1380', label: '1380 RP', price: 10.00 },
      { id: 'lol-2800', label: '2800 RP', price: 20.00 },
      { id: 'lol-5800', label: '5800 RP', price: 40.00 },
    ],
    stock: 89, rating: 4.8
  },
  {
    id: 'fc26-1', category: 'fc26', name: 'FC 26 Coins Ultimate Team', subtitle: 'Livraison 5-15 min • PS / Xbox / PC',
    image: '/fc26-coins.jpg', // image fournie: UT coins dorés
    badge: 'NEW', description: 'Coins pour FC 26 UT. Méthode sécurisée Player Auction, garantie anti-ban.',
    variants: [
      { id: 'fc-50k', label: '50K Coins', price: 9.99 },
      { id: 'fc-100k', label: '100K Coins', price: 18.99 },
      { id: 'fc-300k', label: '300K Coins', price: 49.99 },
      { id: 'fc-700k', label: '700K Coins', price: 104.99 },
      { id: 'fc-1m', label: '1M Coins', price: 139.99 },
    ],
    stock: 42, rating: 4.7
  },
  {
    id: 'pubg-1', category: 'pubg', name: 'PUBG Mobile UC', subtitle: 'Unknown Cash',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80&auto=format&fit=crop', // PUBG - combat
    badge: null, description: 'UC pour PUBG Mobile. Compatible Global. ID joueur requis à la livraison pour méthode directe, ou code.',
    variants: [
      { id: 'pubg-60', label: '60 UC', price: 0.99 },
      { id: 'pubg-325', label: '325 UC', price: 4.99 },
      { id: 'pubg-660', label: '660 UC', price: 9.99 },
      { id: 'pubg-1800', label: '1800 UC', price: 24.99 },
      { id: 'pubg-3850', label: '3850 UC', price: 49.99 },
    ],
    stock: 210, rating: 4.8
  },
  {
    id: 'roblox-1', category: 'roblox', name: 'Roblox Gift Card', subtitle: 'Robux & Premium',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80&auto=format&fit=crop',
    badge: null, description: 'Carte Roblox officielle. Échangeable en Robux ou abonnement Premium.',
    variants: [
      { id: 'rbx-10', label: '10 TND (≈800 Robux)', price: 10.00 },
      { id: 'rbx-20', label: '20 TND (≈1700 Robux)', price: 20.00 },
      { id: 'rbx-50', label: '50 TND (≈4500 Robux)', price: 50.00 },
    ],
    stock: 67, rating: 4.9
  },
  {
    id: 'ff-1', category: 'freefire', name: 'Free Fire Diamonds', subtitle: 'Garena • Instantané',
    image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&q=80&auto=format&fit=crop',
    badge: 'PROMO', description: 'Diamants Free Fire. Livraison par ID ou code.',
    variants: [
      { id: 'ff-100', label: '100 Diamonds', price: 1.29 },
      { id: 'ff-520', label: '520 Diamonds', price: 5.99 },
      { id: 'ff-1060', label: '1060 Diamonds', price: 11.99 },
      { id: 'ff-2180', label: '2180 Diamonds', price: 22.99 },
    ],
    stock: 150, rating: 4.6
  },
  {
    id: 'netflix-1', category: 'netflix', name: 'Netflix E-Card', subtitle: 'Abonnement Prépayé',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80&auto=format&fit=crop',
    badge: null, description: 'Carte Netflix France. Compatible Essentiel, Standard et Premium. Durée selon formule.',
    variants: [
      { id: 'nfx-25', label: '25 TND', price: 25.00 },
      { id: 'nfx-50', label: '50 TND', price: 50.00 },
      { id: 'nfx-100', label: '100 TND', price: 100.00 },
    ],
    stock: 33, rating: 4.8
  },
  {
    id: 'psn-1', category: 'other', name: 'PlayStation Store Card', subtitle: 'PSN Wallet FR',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80&auto=format&fit=crop',
    badge: null, description: 'Recharge portefeuille PSN. Jeux, add-ons, PS Plus.',
    variants: [
      { id: 'psn-20', label: '20 TND', price: 20.00 },
      { id: 'psn-50', label: '50 TND', price: 50.00 },
      { id: 'psn-100', label: '100 TND', price: 100.00 },
    ],
    stock: 55, rating: 4.9
  },
  {
    id: 'xbox-1', category: 'other', name: 'Xbox Gift Card', subtitle: 'Microsoft Store',
    image: 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=600&q=80&auto=format&fit=crop',
    badge: null, description: 'Pour Game Pass, jeux et contenus Xbox & PC.',
    variants: [
      { id: 'xbx-15', label: '15 TND', price: 15.00 },
      { id: 'xbx-25', label: '25 TND', price: 25.00 },
      { id: 'xbx-50', label: '50 TND', price: 50.00 },
    ],
    stock: 40, rating: 4.7
  },
  {
    id: 'steam-1', category: 'other', name: 'Steam Wallet Code', subtitle: 'EUR',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&q=80&auto=format&fit=crop',
    badge: null, description: 'Code Steam Wallet à activer sur votre compte Steam.',
    variants: [
      { id: 'stm-20', label: '20 TND', price: 20.00 },
      { id: 'stm-50', label: '50 TND', price: 50.00 },
      { id: 'stm-100', label: '100 TND', price: 100.00 },
    ],
    stock: 71, rating: 4.9
  },
]
