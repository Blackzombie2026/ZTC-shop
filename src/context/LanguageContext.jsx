import { createContext, useContext, useEffect, useState } from 'react'

const LangCtx = createContext()

export const LANGS = [
  { id: 'fr', label: 'Français' },
  { id: 'en', label: 'English' },
  { id: 'ar', label: 'العربية' },
]

const dict = {
fr: {
  catalog: 'Catalogue', cart: 'Panier', orders: 'Commandes', login: 'Connexion', logout: 'Déconnexion',
  home_badge: 'ZTC Shop • Livraison instantanée 24/7 • Codes officiels',
  home_sub: 'Valorant, LoL, FC 26 Coins, PUBG, Roblox, Free Fire, Netflix et plus. Choisis ton montant, paye par carte ou à la livraison, reçois ton code instantanément.',
  browse: 'Parcourir le catalogue', view_vp: 'Voir les VP Valorant', popular: 'Produits populaires', see_all: 'Voir tout →',
  secure: 'Paiement sécurisé', cod_short: 'Payer à la livraison', fast: 'Envoi < 2 min',
  trust1t: 'Codes officiels & vérifiés', trust1d: 'Stock réel, chaque code testé. Remboursement si invalide.',
  trust2t: 'Paiement flexible', trust2d: 'Carte bancaire sécurisée ou paiement à la livraison (Cash).',
  trust3t: 'Historique & révélation', trust3d: 'Connecte-toi, retrouve tes codes à tout moment.',
  search_ph: 'Rechercher Valorant, 5000 VP, Netflix...', all: 'Tout',
  sort_pop: 'Populaire', sort_asc: 'Prix croissant', sort_desc: 'Prix décroissant', sort_name: 'Nom A-Z',
  from: 'dès', amounts: 'montants', in_stock: 'codes en stock', see: 'Voir →', no_result: 'Aucun produit trouvé.',
  choose_amount: 'Choisis un montant', selected: 'Sélectionné', total: 'Total', add_cart: 'Ajouter au panier',
  cart_empty_t: 'Ton panier est vide', cart_empty_d: 'Parcours le catalogue et ajoute tes cartes cadeaux.', subtotal: 'Sous-total',
  fees: 'Frais', free: 'Gratuit', checkout_btn: 'Passer au paiement', continue: 'Continuer mes achats',
  cod_note: 'Paiement par carte ou à la livraison disponible à l’étape suivante.',
  payment: 'Paiement', info: 'Informations', name_ph: 'Nom complet', email_ph: 'Email (envoi des codes)',
  addr_ph: 'Adresse (si livraison)', pay_method: 'Mode de paiement', card: 'Carte bancaire', card_d: 'Visa / Mastercard • Sécurisé',
  cod: 'Payer à la livraison', cod_d: 'Cash • Confirmation immédiate', pay: 'Payer', confirm_cod: 'Confirmer commande •',
  at_delivery: 'à la livraison', order: 'Commande', login_required: 'Connexion requise',
  login_required_d: 'Connecte-toi avec ton email, Discord ou Facebook pour commander et retrouver tes codes.',
  my_orders: 'Mes commandes', no_orders: 'Aucune commande', no_orders_d: 'Tes achats apparaîtront ici avec les codes à révéler.',
  go_catalog: 'Aller au catalogue', your_codes: 'Tes codes', click_reveal: 'clique pour révéler',
  back: '← Retour', login_title: 'Connexion ZTC Shop', login_sub: 'Email, Discord ou Facebook — tes commandes et codes te suivent.',
  signin: 'Se connecter', signup: 'Créer un compte', pseudo_ph: 'Pseudo', pass_ph: 'Mot de passe',
  create_account: 'Créer mon compte', login_email: "Se connecter avec email", or_with: 'ou continuer avec',
  admin: 'Console d’administration', products_stock: 'Produits & Stock', orders_tab: 'Commandes',
  pending_title: 'En attente de confirmation admin', codes_locked: 'Codes verrouillés',
  pending_desc: "Ta commande est bien reçue ! L'admin va la vérifier puis tes codes seront révélés ici. Reviens dans quelques minutes.",
  confirmed_hint: 'Commande confirmée par l’admin — clique pour révéler tes codes.',
},
en: {
  catalog: 'Catalog', cart: 'Cart', orders: 'Orders', login: 'Login', logout: 'Logout',
  home_badge: 'ZTC Shop • Instant delivery 24/7 • Official codes',
  home_sub: 'Valorant, LoL, FC 26 Coins, PUBG, Roblox, Free Fire, Netflix and more. Pick an amount, pay by card or on delivery, get your code instantly.',
  browse: 'Browse catalog', view_vp: 'See Valorant VP', popular: 'Popular products', see_all: 'See all →',
  secure: 'Secure payment', cod_short: 'Cash on delivery', fast: 'Delivery < 2 min',
  trust1t: 'Official & verified codes', trust1d: 'Real stock, each code tested. Refund if invalid.',
  trust2t: 'Flexible payment', trust2d: 'Secure card or cash on delivery.',
  trust3t: 'History & reveal', trust3d: 'Log in, find your codes anytime.',
  search_ph: 'Search Valorant, 5000 VP, Netflix...', all: 'All',
  sort_pop: 'Popular', sort_asc: 'Price low-high', sort_desc: 'Price high-low', sort_name: 'Name A-Z',
  from: 'from', amounts: 'amounts', in_stock: 'codes in stock', see: 'View →', no_result: 'No products found.',
  choose_amount: 'Choose an amount', selected: 'Selected', total: 'Total', add_cart: 'Add to cart',
  cart_empty_t: 'Your cart is empty', cart_empty_d: 'Browse the catalog and add your gift cards.', subtotal: 'Subtotal',
  fees: 'Fees', free: 'Free', checkout_btn: 'Checkout', continue: 'Continue shopping',
  cod_note: 'Card or cash on delivery available at next step.',
  payment: 'Payment', info: 'Information', name_ph: 'Full name', email_ph: 'Email (code delivery)',
  addr_ph: 'Address (if delivery)', pay_method: 'Payment method', card: 'Bank card', card_d: 'Visa / Mastercard • Secure',
  cod: 'Cash on delivery', cod_d: 'Cash • Instant confirmation', pay: 'Pay', confirm_cod: 'Confirm order •',
  at_delivery: 'on delivery', order: 'Order', login_required: 'Login required',
  login_required_d: 'Log in with email, Discord or Facebook to order and find your codes.',
  my_orders: 'My orders', no_orders: 'No orders', no_orders_d: 'Your purchases will appear here with codes to reveal.',
  go_catalog: 'Go to catalog', your_codes: 'Your codes', click_reveal: 'click to reveal',
  back: '← Back', login_title: 'ZTC Shop Login', login_sub: 'Email, Discord or Facebook — your orders follow you.',
  signin: 'Log in', signup: 'Sign up', pseudo_ph: 'Nickname', pass_ph: 'Password',
  create_account: 'Create my account', login_email: 'Log in with email', or_with: 'or continue with',
  admin: 'Admin console', products_stock: 'Products & Stock', orders_tab: 'Orders',
  pending_title: 'Waiting for admin confirmation', codes_locked: 'Locked codes',
  pending_desc: 'Order received! The admin will verify it, then your codes will be revealed here. Check back in a few minutes.',
  confirmed_hint: 'Order confirmed by admin — click to reveal your codes.',
},
ar: {
  catalog: 'المتجر', cart: 'السلة', orders: 'طلباتي', login: 'تسجيل الدخول', logout: 'تسجيل الخروج',
  home_badge: 'ZTC Shop • توصيل فوري 24/7 • أكواد رسمية',
  home_sub: 'فالورانت، LoL، كوينز FC 26، ببجي، روبلوكس، فري فاير، نتفليكس والمزيد. اختر المبلغ، ادفع بالبطاقة أو عند الاستلام، واستلم الكود فوراً.',
  browse: 'تصفح المتجر', view_vp: 'شاهد نقاط فالورانت', popular: 'المنتجات الشائعة', see_all: 'شاهد الكل ←',
  secure: 'دفع آمن', cod_short: 'الدفع عند الاستلام', fast: 'إرسال < دقيقتين',
  trust1t: 'أكواد رسمية وموثوقة', trust1d: 'مخزون حقيقي، كل كود مختبر. استرداد إذا كان غير صالح.',
  trust2t: 'دفع مرن', trust2d: 'بطاقة بنكية آمنة أو الدفع نقداً عند الاستلام.',
  trust3t: 'السجل وكشف الأكواد', trust3d: 'سجل الدخول وجد أكوادك في أي وقت.',
  search_ph: 'ابحث عن فالورانت، 5000 VP، نتفليكس...', all: 'الكل',
  sort_pop: 'الأشهر', sort_asc: 'السعر تصاعدي', sort_desc: 'السعر تنازلي', sort_name: 'الاسم A-Z',
  from: 'ابتداءً من', amounts: 'فئات', in_stock: 'كود متوفر', see: 'عرض ←', no_result: 'لا توجد منتجات.',
  choose_amount: 'اختر المبلغ', selected: 'محدد', total: 'المجموع', add_cart: 'أضف إلى السلة',
  cart_empty_t: 'سلتك فارغة', cart_empty_d: 'تصفح المتجر وأضف بطاقاتك.', subtotal: 'المجموع الفرعي',
  fees: 'رسوم', free: 'مجاني', checkout_btn: 'إتمام الدفع', continue: 'مواصلة التسوق',
  cod_note: 'الدفع بالبطاقة أو عند الاستلام متاح في الخطوة التالية.',
  payment: 'الدفع', info: 'المعلومات', name_ph: 'الاسم الكامل', email_ph: 'البريد (لإرسال الأكواد)',
  addr_ph: 'العنوان (عند التوصيل)', pay_method: 'طريقة الدفع', card: 'بطاقة بنكية', card_d: 'Visa / Mastercard • آمن',
  cod: 'الدفع عند الاستلام', cod_d: 'نقداً • تأكيد فوري', pay: 'ادفع', confirm_cod: 'تأكيد الطلب •',
  at_delivery: 'عند الاستلام', order: 'الطلب', login_required: 'تسجيل الدخول مطلوب',
  login_required_d: 'سجل الدخول بالإيميل أو ديسكورد أو فيسبوك للطلب واسترجاع أكوادك.',
  my_orders: 'طلباتي', no_orders: 'لا توجد طلبات', no_orders_d: 'ستظهر مشترياتك هنا مع الأكواد.',
  go_catalog: 'اذهب للمتجر', your_codes: 'أكوادك', click_reveal: 'اضغط للكشف',
  back: '→ رجوع', login_title: 'تسجيل الدخول ZTC Shop', login_sub: 'إيميل أو ديسكورد أو فيسبوك — طلباتك تتبعك.',
  signin: 'دخول', signup: 'حساب جديد', pseudo_ph: 'الاسم المستعار', pass_ph: 'كلمة المرور',
  create_account: 'إنشاء حسابي', login_email: 'الدخول بالإيميل', or_with: 'أو تابع مع',
  admin: 'لوحة الإدارة', products_stock: 'المنتجات والمخزون', orders_tab: 'الطلبات',
  pending_title: 'بانتظار تأكيد الإدارة', codes_locked: 'أكواد مقفلة',
  pending_desc: 'تم استلام طلبك! ستتحقق الإدارة منه ثم ستظهر أكوادك هنا. عد بعد بضع دقائق.',
  confirmed_hint: 'تم تأكيد الطلب من الإدارة — اضغط لكشف أكوادك.',
}
}

export function LanguageProvider({ children }){
  const [lang, setLang] = useState(()=> { try{ return localStorage.getItem('ztc_lang')||'fr' }catch{return 'fr'} })
  useEffect(()=>{
    localStorage.setItem('ztc_lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr'
  }, [lang])
  const t = (k)=> (dict[lang]&&dict[lang][k]) || dict.fr[k] || k
  return <LangCtx.Provider value={{lang, setLang, t}}>{children}</LangCtx.Provider>
}
export const useLang = ()=> useContext(LangCtx)
