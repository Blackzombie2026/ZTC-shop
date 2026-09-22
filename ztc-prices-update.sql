-- ============================================================
-- ZTC-SHOP — Mise à jour prix € + nouveau Battle.net
-- Supabase (projet ztc) > SQL Editor > New query > coller > Run
-- ============================================================

-- LoL : cartes €
update public.products set subtitle = 'Cartes € • Europe',
variants = '[{"id":"lol-eu10","label":"Carte 10€","price":38},{"id":"lol-eu15","label":"Carte 15€","price":59},{"id":"lol-eu20","label":"Carte 20€","price":78},{"id":"lol-eu25","label":"Carte 25€","price":96},{"id":"lol-eu35","label":"Carte 35€","price":135},{"id":"lol-eu50","label":"Carte 50€","price":195},{"id":"lol-eu100","label":"Carte 100€","price":380}]'::jsonb
where id = 'lol-1';

-- Steam : wallet €
update public.products set
variants = '[{"id":"stm-eu10","label":"Carte 10€","price":45},{"id":"stm-eu15","label":"Carte 15€","price":60},{"id":"stm-eu20","label":"Carte 20€","price":84},{"id":"stm-eu25","label":"Carte 25€","price":105},{"id":"stm-eu35","label":"Carte 35€","price":145},{"id":"stm-eu50","label":"Carte 50€","price":220},{"id":"stm-eu100","label":"Carte 100€","price":430}]'::jsonb
where id = 'steam-1';

-- Roblox
update public.products set
variants = '[{"id":"rbx-eu10","label":"Roblox 10€","price":40},{"id":"rbx-eu20","label":"Roblox 20€","price":78}]'::jsonb
where id = 'roblox-1';

-- PlayStation
update public.products set
variants = '[{"id":"psn-eu10","label":"Carte 10€","price":42},{"id":"psn-eu20","label":"Carte 20€","price":82},{"id":"psn-eu25","label":"Carte 25€","price":105},{"id":"psn-eu50","label":"Carte 50€","price":202},{"id":"psn-eu100","label":"Carte 100€","price":398}]'::jsonb
where id = 'psn-1';

-- Xbox
update public.products set
variants = '[{"id":"xbx-eu10","label":"Carte 10€","price":39},{"id":"xbx-eu15","label":"Carte 15€","price":58},{"id":"xbx-eu20","label":"Carte 20€","price":75},{"id":"xbx-eu25","label":"Carte 25€","price":95},{"id":"xbx-eu30","label":"Carte 30€","price":115},{"id":"xbx-eu50","label":"Carte 50€","price":190},{"id":"xbx-eu100","label":"Carte 100€","price":380}]'::jsonb
where id = 'xbox-1';

-- Battle.net (NOUVEAU — image à compléter)
insert into public.products (id, category, name, subtitle, image, badge, description, variants, stock, rating) values
('bnet-1','battlenet','Battle.net Gift Card','Cartes € • Europe',null,'NEW','Cartes Battle.net Europe pour jeux Blizzard et solde Battle.net.',
'[{"id":"bnet-eu20","label":"Carte 20€","price":80},{"id":"bnet-eu50","label":"Carte 50€","price":200}]',50,4.8)
on conflict (id) do update set category=excluded.category, name=excluded.name, subtitle=excluded.subtitle, description=excluded.description, variants=excluded.variants, stock=excluded.stock;

-- vérif :
-- select id, category, jsonb_array_length(variants) as nb from public.products where id in ('lol-1','steam-1','roblox-1','psn-1','xbox-1','bnet-1');
