export const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'valorant', label: 'Valorant' },
  { id: 'lol', label: 'League of Legends' },
  { id: 'fc26', label: 'FC 26 Coins' },
  { id: 'fc27', label: 'FC 27' },
  { id: 'pubg', label: 'PUBG' },
  { id: 'warzone', label: 'Warzone' },
  { id: 'r6', label: 'Rainbow Six' },
  { id: 'roblox', label: 'Roblox' },
  { id: 'freefire', label: 'Free Fire' },
  { id: 'netflix', label: 'Netflix' },
  { id: 'battlenet', label: 'Battle.net' },
  { id: 'other', label: 'Autres' },
]

export const initialProducts = [
  {
    id: 'val-1', category: 'valorant', name: 'Valorant Points', subtitle: 'VP • Livraison instantanée',
    image: 'https://images.g2a.com/300x400/1x1x1/valorant-gift-card-10-usd-riot-key-latam-i10000206410010/6a355b9399534a69b7985242',
    badge: 'HOT', description: 'Recharge ton compte Valorant en quelques secondes. Code officiel Riot. Carte EU.',
    variants: [
      { id: 'val-eu10', label: 'Carte 10€', price: 38.00 },
      { id: 'val-eu15', label: 'Carte 15€', price: 60.00 },
      { id: 'val-eu20', label: 'Carte 20€', price: 77.00 },
      { id: 'val-eu25', label: 'Carte 25€', price: 96.00 },
      { id: 'val-eu35', label: 'Carte 35€', price: 135.00 },
      { id: 'val-eu50', label: 'Carte 50€', price: 197.00 },
    ],
    stock: 124, rating: 4.9
  },
  {
    id: 'lol-1', category: 'lol', name: 'League of Legends RP', subtitle: 'Cartes € • Europe',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNztnpwTexsNw2a58jD4GD3VukhzYqPHAouBNgep7nzA&s=10',
    badge: 'BEST SELLER', description: 'Débloque skins, champions et chromas. Code valable Europe.',
    variants: [
      { id: 'lol-eu10', label: 'Carte 10€', price: 38.00 },
      { id: 'lol-eu15', label: 'Carte 15€', price: 59.00 },
      { id: 'lol-eu20', label: 'Carte 20€', price: 78.00 },
      { id: 'lol-eu25', label: 'Carte 25€', price: 96.00 },
      { id: 'lol-eu35', label: 'Carte 35€', price: 135.00 },
      { id: 'lol-eu50', label: 'Carte 50€', price: 195.00 },
      { id: 'lol-eu100', label: 'Carte 100€', price: 380.00 },
    ],
    stock: 89, rating: 4.8
  },
  {
    id: 'fc26-1', category: 'fc26', name: 'FC 26 Coins Ultimate Team', subtitle: 'Livraison 5-15 min • PS / Xbox / PC',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPfUeZMBSqKcCZINmj7HGMN4nDmh3OVPLURigP-u5bg&s=10',
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
    id: 'fc27-pc', category: 'fc27', name: 'FC 27 PC – Steam Full Access', subtitle: 'Compte complet • Version PC',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhc6Hl7O2D2ZMM5mGE1Ou40bK_4_xPxWdJW8VsQ7faUHqHInv68ByFjCMH&s=10',
    badge: 'NEW', description: 'Compte Steam FC 27 version PC en plein accès : email et mot de passe modifiables, jeu à vie. Livraison 5-30 min avec identifiants + guide d’activation.',
    variants: [
      { id: 'fc27-pc-std', label: 'Standard Edition – Full Access', price: 140.00 },
      { id: 'fc27-pc-ult', label: 'Ultimate Edition – Full Access', price: 220.00 },
    ],
    stock: 25, rating: 5.0
  },
  {
    id: 'fc27-ps5', category: 'fc27', name: 'FC 27 PS5 – PSN', subtitle: 'Compte complet • Version PS5',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHFwBgEcKi_xb22H3SlkrPBNlUjsOwHxCey-epDjbKyQ&s=10',
    badge: 'NEW', description: 'FC 27 version PS5 (compte PSN) : Standard ou Ultimate, accès complet. Livraison 5-30 min avec identifiants + guide d’activation.',
    variants: [
      { id: 'fc27-ps5-std', label: 'Standard Edition – PSN', price: 240.00 },
      { id: 'fc27-ps5-ult', label: 'Ultimate Edition – PSN', price: 340.00 },
    ],
    stock: 20, rating: 5.0
  },
  {
    id: 'pubg-1', category: 'pubg', name: 'PUBG Mobile UC', subtitle: 'Unknown Cash',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2k0Xlx3K5dZvgyfn4R20bh_OFVCv93xOJkyMmx-g-Zg&s=10',
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
    id: 'wz-1', category: 'warzone', name: 'Warzone COD Points', subtitle: 'CP • Toutes plateformes',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyqv8ihFLqe-huGX1idY3forMuHcN39UzhSDqVNCQ4g&s=10',
    badge: 'HOT', description: 'COD Points pour Warzone / Modern Warfare. Débloque Battle Pass, skins et bundles. Livraison instantanée.',
    variants: [
      { id: 'wz-500', label: '500 CP', price: 19.00 },
      { id: 'wz-1100', label: '1100 CP', price: 38.00 },
      { id: 'wz-2400', label: '2400 CP', price: 75.00 },
      { id: 'wz-5000', label: '5000 CP', price: 145.00 },
    ],
    stock: 78, rating: 4.8
  },
  {
    id: 'r6-1', category: 'r6', name: 'Rainbow Six Credits', subtitle: 'R6 Credits • Ubisoft',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBN2ACWqqVPyzbeCQUHPa9BmoN5rgkkccXtbNxOohIYg&s',
    badge: 'NEW', description: 'Crédits R6 pour Rainbow Six Siege. Opérateurs élite, skins et Battle Pass. Code Ubisoft.',
    variants: [
      { id: 'r6-600', label: '600 Credits', price: 18.00 },
      { id: 'r6-1200', label: '1200 Credits', price: 35.00 },
      { id: 'r6-2670', label: '2670 Credits', price: 72.00 },
      { id: 'r6-4920', label: '4920 Credits', price: 125.00 },
    ],
    stock: 54, rating: 4.7
  },
  {
    id: 'roblox-1', category: 'roblox', name: 'Roblox Gift Card', subtitle: 'Robux & Premium',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyCcKCRn3kSwAHeU7aumRfEv7QvfvG639Rn5HkcsNUiA&s=10',
    badge: null, description: 'Carte Roblox officielle. Échangeable en Robux ou abonnement Premium.',
    variants: [
      { id: 'rbx-eu10', label: 'Roblox 10€', price: 40.00 },
      { id: 'rbx-eu20', label: 'Roblox 20€', price: 78.00 },
    ],
    stock: 67, rating: 4.9
  },
  {
    id: 'ff-1', category: 'freefire', name: 'Free Fire Diamonds', subtitle: 'Garena • Instantané',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5HuED_JGEoLag7MWcOoH5IXb-RT85bqifrp5p71oBQ&s=10',
    badge: 'PROMO', description: 'Diamants Free Fire. Livraison par ID ou code.',
    variants: [
      { id: 'ff-100', label: '100 Diamonds', price: 5.00 },
      { id: 'ff-210', label: '210 Diamonds', price: 10.00 },
      { id: 'ff-520', label: '520 Diamonds', price: 21.00 },
      { id: 'ff-1080', label: '1080 Diamonds', price: 42.00 },
      { id: 'ff-2200', label: '2200 Diamonds', price: 80.00 },
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
      { id: 'psn-eu10', label: 'Carte 10€', price: 42.00 },
      { id: 'psn-eu20', label: 'Carte 20€', price: 82.00 },
      { id: 'psn-eu25', label: 'Carte 25€', price: 105.00 },
      { id: 'psn-eu50', label: 'Carte 50€', price: 202.00 },
      { id: 'psn-eu100', label: 'Carte 100€', price: 398.00 },
    ],
    stock: 55, rating: 4.9
  },
  {
    id: 'xbox-1', category: 'other', name: 'Xbox Gift Card', subtitle: 'Microsoft Store',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUTxVzAMksOUL5_nc1gzb-P20RB_y8e27POgEpdp2LQ&s',
    badge: null, description: 'Pour Game Pass, jeux et contenus Xbox & PC.',
    variants: [
      { id: 'xbx-eu10', label: 'Carte 10€', price: 39.00 },
      { id: 'xbx-eu15', label: 'Carte 15€', price: 58.00 },
      { id: 'xbx-eu20', label: 'Carte 20€', price: 75.00 },
      { id: 'xbx-eu25', label: 'Carte 25€', price: 95.00 },
      { id: 'xbx-eu30', label: 'Carte 30€', price: 115.00 },
      { id: 'xbx-eu50', label: 'Carte 50€', price: 190.00 },
      { id: 'xbx-eu100', label: 'Carte 100€', price: 380.00 },
    ],
    stock: 40, rating: 4.7
  },
  {
    id: 'steam-1', category: 'other', name: 'Steam Wallet Code', subtitle: 'EUR',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&q=80&auto=format&fit=crop',
    badge: null, description: 'Code Steam Wallet à activer sur votre compte Steam.',
    variants: [
      { id: 'stm-eu10', label: 'Carte 10€', price: 45.00 },
      { id: 'stm-eu15', label: 'Carte 15€', price: 60.00 },
      { id: 'stm-eu20', label: 'Carte 20€', price: 84.00 },
      { id: 'stm-eu25', label: 'Carte 25€', price: 105.00 },
      { id: 'stm-eu35', label: 'Carte 35€', price: 145.00 },
      { id: 'stm-eu50', label: 'Carte 50€', price: 220.00 },
      { id: 'stm-eu100', label: 'Carte 100€', price: 430.00 },
    ],
    stock: 71, rating: 4.9
  },
  {
    id: 'bnet-1', category: 'battlenet', name: 'Battle.net Gift Card', subtitle: 'Cartes € • Europe',
    image: '',
    badge: 'NEW', description: 'Cartes Battle.net Europe pour jeux Blizzard et solde Battle.net.',
    variants: [
      { id: 'bnet-eu20', label: 'Carte 20€', price: 80.00 },
      { id: 'bnet-eu50', label: 'Carte 50€', price: 200.00 },
    ],
    stock: 50, rating: 4.8
  },
]
