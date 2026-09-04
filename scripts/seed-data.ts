// Transcribed from the client's photographed menu boards (4 pages: drinks/cocktails,
// kitchen food, sushi/"Vasaras ēdienkarte"). This is the source of truth loaded into
// Nhost by db-setup.mjs. Rows with a `verify` note have some ambiguity in the source
// photo (illegible print, inferred name/ABV/pack size) and are worth a human check
// against the physical menu before going live.

export type MenuCategory = "sushi" | "food" | "drinks";

export type SeedItem = {
  category: MenuCategory;
  subcategory_lv: string;
  subcategory_en: string;
  name_lv: string;
  name_en: string;
  description_lv: string | null;
  description_en: string | null;
  unit_lv: string | null;
  unit_en: string | null;
  price: number;
  sort_order: number;
  verify?: string;
};

type Row = {
  lv: string;
  en: string;
  price: number;
  unitLv?: string;
  unitEn?: string;
  descLv?: string;
  descEn?: string;
  verify?: string;
};

const counters: Record<MenuCategory, number> = { sushi: 0, food: 0, drinks: 0 };

function section(category: MenuCategory, subLv: string, subEn: string, rows: Row[]): SeedItem[] {
  return rows.map((r) => {
    counters[category] += 10;
    return {
      category,
      subcategory_lv: subLv,
      subcategory_en: subEn,
      name_lv: r.lv,
      name_en: r.en,
      description_lv: r.descLv ?? null,
      description_en: r.descEn ?? null,
      unit_lv: r.unitLv ?? null,
      unit_en: r.unitEn ?? null,
      price: r.price,
      sort_order: counters[category],
      verify: r.verify,
    };
  });
}

// ============================= SUSHI =============================

const sushiMiniMaki = section("sushi", "Mini maki", "Mini maki", [
  { lv: "Avocado", en: "Avocado", price: 4.3, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "avokado", descEn: "avocado" },
  { lv: "Avocado cheese", en: "Avocado cheese", price: 4.5, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "avokado, krēmsiers", descEn: "avocado, cream cheese" },
  { lv: "Kappa", en: "Kappa", price: 4.0, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "gurķis", descEn: "cucumber" },
  { lv: "Suri cheese", en: "Suri cheese", price: 4.3, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "surimi, krēmsiers", descEn: "surimi, cream cheese" },
  { lv: "Sake", en: "Sake", price: 4.8, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "lasis", descEn: "salmon" },
]);

const sushiSets = section("sushi", "Komplekti", "Sets", [
  {
    lv: "Small set", en: "Small set", price: 26.0, unitLv: "29 gab.", unitEn: "29 pcs",
    descLv: "Roļi pēc Jūsu izvēles no ēdienkartes: 3 Nigiri, 1 ura maki, 1 hotto ura maki, 1 tempura maki",
    descEn: "Rolls of your choice from the menu: 3 nigiri, 1 ura maki, 1 hot ura maki, 1 tempura maki",
  },
  {
    lv: "Medium set", en: "Medium set", price: 43.5, unitLv: "55 gab.", unitEn: "55 pcs",
    descLv: "Roļi pēc Jūsu izvēles no ēdienkartes: 3 Nigiri, 2 ura maki, 2 hot ura maki, 2 tempura maki",
    descEn: "Rolls of your choice from the menu: 3 nigiri, 2 ura maki, 2 hot ura maki, 2 tempura maki",
  },
  {
    lv: "Love is... set", en: "Love is... set", price: 26.0, unitLv: "26 gab.", unitEn: "26 pcs",
    descLv: "Philadelphia sesam, Ebisino, Masago, Sake hotto, Igai hotto, Sake nigiri",
    descEn: "Philadelphia sesame, Ebisino, Masago, Sake hotto, Igai hotto, Sake nigiri",
  },
  {
    lv: "New Love set", en: "New Love set", price: 39.0, unitLv: "40 gab.", unitEn: "40 pcs",
    descLv: "Philadelphia sesame, Massago, Philadelphia avokado, Sake mini, Ebisino, Philadelphia, Philadelphia Burn",
    descEn: "Philadelphia sesame, Massago, Philadelphia avocado, Sake mini, Ebisino, Philadelphia, Philadelphia Burn",
  },
  {
    lv: "DeLux set", en: "DeLux set", price: 46.0, unitLv: "46 gab.", unitEn: "46 pcs",
    descLv: "Sakura, Creamy Sakura, Mango Massago, Sake shrimp, Cheesy Sake Shrimp, Tiger, Sake mini",
    descEn: "Sakura, Creamy Sakura, Mango Massago, Sake shrimp, Cheesy Sake Shrimp, Tiger, Sake mini",
  },
]);

const sushiNigiri = section("sushi", "Nigiri", "Nigiri", [
  { lv: "Lasis", en: "Salmon", price: 2.0, unitLv: "1 gab.", unitEn: "1 pc" },
  { lv: "Dedzināts lasis", en: "Seared salmon", price: 2.0, unitLv: "1 gab.", unitEn: "1 pc" },
  { lv: "Tīģergarnele", en: "Tiger shrimp", price: 2.0, unitLv: "1 gab.", unitEn: "1 pc" },
]);

const sushiFutomaki = section("sushi", "Futomaki", "Futomaki", [
  { lv: "Wakame", en: "Wakame", price: 7.0, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "jūraszāles, paprika, sezams", descEn: "seaweed, bell pepper, sesame" },
  { lv: "Vegetarian", en: "Vegetarian", price: 7.0, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "gurķis, tomāts, paprika, avokado, krēmsiers", descEn: "cucumber, tomato, bell pepper, avocado, cream cheese" },
  { lv: "Tiger", en: "Tiger", price: 8.5, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "tīģergarnele, gurķis, avokado, krēmsiers, masago ikri", descEn: "tiger shrimp, cucumber, avocado, cream cheese, masago roe" },
  { lv: "Surimi", en: "Surimi", price: 8.1, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "surimi, tomāts, paprika, krēmsiers", descEn: "surimi, tomato, bell pepper, cream cheese" },
  { lv: "Sake-shrimp", en: "Sake-shrimp", price: 8.5, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "lasis, garnele, avokado, gurķis, krēmsiers", descEn: "salmon, shrimp, avocado, cucumber, cream cheese" },
]);

const sushiUraMaki = section("sushi", "Ura maki", "Ura maki", [
  { lv: "Ebisino", en: "Ebisino", price: 8.5, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "lasis, tīģergarnele, krēmsiers", descEn: "salmon, tiger shrimp, cream cheese" },
  { lv: "Philadelphia avokado", en: "Philadelphia avocado", price: 7.8, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "avokado, lasis, krēmsiers, sezams", descEn: "avocado, salmon, cream cheese, sesame" },
  { lv: "California", en: "California", price: 7.8, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "gurķis, surimi, avokado, masago ikri, krēmsiers", descEn: "cucumber, surimi, avocado, masago roe, cream cheese" },
  { lv: "Philadelphia sesame", en: "Philadelphia sesame", price: 7.8, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "gurķis, lasis, krēmsiers, sezams", descEn: "cucumber, salmon, cream cheese, sesame" },
  { lv: "Philadelphia", en: "Philadelphia", price: 8.5, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "lasis, gurķis, krēmsiers", descEn: "salmon, cucumber, cream cheese" },
  { lv: "Masago", en: "Masago", price: 7.8, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "garneles, krēmsiers, masago ikri", descEn: "shrimp, cream cheese, masago roe" },
]);

const sushiTempuraMaki = section("sushi", "Tempura maki", "Tempura maki", [
  { lv: "Suri", en: "Suri", price: 8.5, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "surimi, tomāts, paprika, krēmsiers, mērce, tempura", descEn: "surimi, tomato, bell pepper, cream cheese, sauce, tempura" },
  { lv: "Vege", en: "Vege", price: 8.5, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "gurķis, tomāts, paprika, avokado, krēmsiers, mērce, tempura", descEn: "cucumber, tomato, bell pepper, avocado, cream cheese, sauce, tempura" },
  { lv: "Kolorado", en: "Kolorado", price: 8.8, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "lasis, garnele, avokado, gurķis, mērce, tempura", descEn: "salmon, shrimp, avocado, cucumber, sauce, tempura" },
  { lv: "Sakura", en: "Sakura", price: 8.8, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "tīģergarnele, gurķis, avokado, masago ikri, mērce, tempura", descEn: "tiger shrimp, cucumber, avocado, masago roe, sauce, tempura" },
]);

const sushiHotFutomaki = section("sushi", "Karstie futomaki", "Hot futomaki", [
  { lv: "Cheesy Tiger", en: "Cheesy Tiger", price: 10.8, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "tīģergarnele, gurķis, avokado, krēmsiers, masago ikri, mērce, siera cepurīte", descEn: "tiger shrimp, cucumber, avocado, cream cheese, masago roe, sauce, cheese topping" },
  { lv: "Cheesy Sake Shrimp", en: "Cheesy Sake Shrimp", price: 10.8, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "lasis, garnele, avokado, gurķis, krēmsiers, mērce, siera cepurīte", descEn: "salmon, shrimp, avocado, cucumber, cream cheese, sauce, cheese topping" },
]);

const sushiHotUraMaki = section("sushi", "Karstie ura maki", "Hot ura maki", [
  { lv: "Ebisino hotto", en: "Ebisino hotto", price: 7.9, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "garneļu cepurīte, paprika, avokado, masago ikri, japāņu majonēze", descEn: "shrimp topping, bell pepper, avocado, masago roe, Japanese mayo" },
  { lv: "Igai hotto", en: "Igai hotto", price: 7.9, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "midiju cepurīte, paprika, avokado, kimči mērce", descEn: "mussel topping, bell pepper, avocado, kimchi sauce" },
  { lv: "Sake hotto", en: "Sake hotto", price: 7.9, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "laša cepurīte, paprika, avokado, loki", descEn: "salmon topping, bell pepper, avocado, spring onion", verify: "Source read as \"locini\" — transcribed as loki/spring onion, worth confirming." },
  { lv: "Mendori hotto", en: "Mendori hotto", price: 7.9, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "vistas fileja, siera cepurīte, paprika, avokado, unagi mērce", descEn: "chicken fillet, cheese topping, bell pepper, avocado, unagi sauce" },
  { lv: "Mendori hotto lux", en: "Mendori hotto lux", price: 7.9, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "vistas fileja, siera cepurīte, ananass, unagi mērce", descEn: "chicken fillet, cheese topping, pineapple, unagi sauce" },
  { lv: "Ebisino Burn", en: "Ebisino Burn", price: 9.5, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "lasis, tīģergarnele, krēmsiers, mērce, sīpolu kraukšķi", descEn: "salmon, tiger shrimp, cream cheese, sauce, crispy onion", verify: "Pack size assumed to match the other hot ura maki (8 pcs) — not explicit in source." },
  { lv: "Philadelphia Burn", en: "Philadelphia Burn", price: 9.5, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "lasis, gurķis, krēmsiers, loki", descEn: "salmon, cucumber, cream cheese, spring onion", verify: "Pack size assumed to match the other hot ura maki (8 pcs) — not explicit in source." },
]);

const sushiCreamyHotMaki = section("sushi", "Krēmveida karstie maki", "Creamy hot maki", [
  { lv: "Sesame sake", en: "Sesame sake", price: 10.8, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "avokado, sezama sēkliņas, lasis, krēmsiers", descEn: "avocado, sesame seeds, salmon, cream cheese" },
  { lv: "Ebi Masago", en: "Ebi Masago", price: 10.8, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "avokado, masago ikri, Z-garneles, majonēze, krēmsiers", descEn: "avocado, masago roe, Z-shrimp, mayo, cream cheese" },
  { lv: "Masago Mango", en: "Masago Mango", price: 10.8, unitLv: "8 gab.", unitEn: "8 pcs", descLv: "mango, krēmsiers, Z-garneles, masago ikri", descEn: "mango, cream cheese, Z-shrimp, masago roe" },
  { lv: "Creamy Sakura", en: "Creamy Sakura", price: 12.5, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "tīģergarnele, gurķis, avokado, masago ikri, krēmsiers, mērce, Z-garneles, tempura", descEn: "tiger shrimp, cucumber, avocado, masago roe, cream cheese, sauce, Z-shrimp, tempura" },
  { lv: "Creamy Kolorado", en: "Creamy Kolorado", price: 12.5, unitLv: "10 gab.", unitEn: "10 pcs", descLv: "lasis, Z-garneles, avokado, gurķis, krēmsiers, mērce, tempura", descEn: "salmon, Z-shrimp, avocado, cucumber, cream cheese, sauce, tempura" },
]);

// ============================= FOOD =============================

const foodDesserts = section("food", "Deserti", "Desserts", [
  { lv: "Mochi saldējumi", en: "Mochi ice cream", price: 5.9, unitLv: "3 gab., garšas var dažādas", unitEn: "3 pcs, flavors vary", descLv: "grauzdētu pistāciju, sāļās karameles, Beļģu šokolādes, mango, aveņu", descEn: "roasted pistachio, salted caramel, Belgian chocolate, mango, raspberry" },
  { lv: "Daim kūkas gabaliņš", en: "Daim cake slice", price: 3.5 },
  { lv: "Mandeļu kūkas gabaliņš", en: "Almond cake slice", price: 3.5 },
  { lv: "Churros", en: "Churros", price: 5.9, descLv: "ar šokolādes vai zemeņu mērci", descEn: "with chocolate or strawberry sauce" },
  { lv: "Grilēts ananāss", en: "Grilled pineapple", price: 5.9, verify: "Name inferred from a photo with no printed label — confirm exact naming." },
  { lv: "Grilēts citrons", en: "Grilled lemon", price: 4.9, verify: "Name inferred from a photo with no printed label — confirm exact naming." },
  { lv: "Grilēts kokosrieksts", en: "Grilled coconut", price: 4.9, verify: "Name inferred from a photo with no printed label — confirm exact naming." },
]);

const foodSalads = section("food", "Salāti", "Salads", [
  { lv: "Kraukšķīgā puķkāposta salāti", en: "Crispy cauliflower salad", price: 7.9, descLv: "puķkāposts, salātu mix, cherry tomāts, cietais siers, Cēzara mērce", descEn: "cauliflower, salad mix, cherry tomato, hard cheese, caesar dressing" },
  { lv: "Garneļu salāti", en: "Shrimp salad", price: 8.0, descLv: "garneles, ledus salāti, romiešu salāti, siers, tomāts, grauzdiņi, Cēzara mērce", descEn: "shrimp, iceberg lettuce, romaine, cheese, tomato, croutons, caesar dressing" },
  { lv: "Laša salāti", en: "Salmon salad", price: 8.0, descLv: "lasis, ledus salāti, romiešu salāti, siers, tomāts, grauzdiņi, Cēzara mērce", descEn: "salmon, iceberg lettuce, romaine, cheese, tomato, croutons, caesar dressing" },
  { lv: "Kebaba salāti", en: "Kebab salad", price: 9.5, descLv: "fri kartupeļi, vistas kebaba gaļa, iceberg, svaigs gurķis, marinēts gurķis, cherry tomāts, jalapeno pēc izvēles", descEn: "fries, chicken kebab meat, iceberg, fresh cucumber, pickled cucumber, cherry tomato, jalapeno on request" },
  { lv: "Kraukšķīgā vista saldskābā mērcē", en: "Crispy chicken in sweet-sour sauce", price: 9.5, descLv: "ar vistas fileju", descEn: "with chicken fillet" },
  { lv: "Kraukšķīgā vegānā \"vista\" saldskābā mērcē", en: "Crispy vegan \"chicken\" in sweet-sour sauce", price: 9.5, descLv: "ar vegāno \"vistas\" gaļu", descEn: "with vegan \"chicken\"" },
]);

const foodSoups = section("food", "Zupas", "Soups", [
  { lv: "Tom Kha", en: "Tom Kha", price: 7.5, descLv: "izvēlies rīsu vai olu nūdeles; izvēlies garneles vai lasi", descEn: "choice of rice or egg noodles; choice of shrimp or salmon" },
  { lv: "Tom Yum", en: "Tom Yum", price: 7.5, descLv: "izvēlies rīsu vai olu nūdeles; izvēlies garneles vai lasi", descEn: "choice of rice or egg noodles; choice of shrimp or salmon" },
]);

const foodBurgers = section("food", "Burgeri", "Burgers", [
  { lv: "Avokado burgers", en: "Avocado burger", price: 9.0 },
  { lv: "Cēzara burgers ar viltoto vistu", en: "Caesar burger with vegan \"chicken\"", price: 9.5 },
  { lv: "Cēzara burgers ar tīģergarneli", en: "Caesar burger with tiger shrimp", price: 9.5 },
  { lv: "Rīsu burgers ar lasi", en: "Rice burger with salmon", price: 9.5 },
  { lv: "Rīsu burgers ar vistu", en: "Rice burger with chicken", price: 9.0 },
  { lv: "Rīsu burgers ar kebaba gaļu", en: "Rice burger with kebab meat", price: 9.0, verify: "Name/price reconstructed from a trailing line in the source photo — confirm against the physical menu." },
]);

const foodWings = section("food", "Vistas spārniņi", "Chicken wings", [
  { lv: "Vistas spārniņi", en: "Chicken wings", price: 6.5, descLv: "asie vai neasie", descEn: "spicy or mild" },
]);

const foodCheeseSnacks = section("food", "Siera uzkodas", "Cheese snacks", [
  { lv: "Camembert uzkoda", en: "Camembert snack", price: 4.7, unitLv: "5 gab.", unitEn: "5 pcs" },
  { lv: "Čedara uzkoda", en: "Cheddar snack", price: 4.7, unitLv: "5 gab.", unitEn: "5 pcs" },
  { lv: "Mocarellas nūdiņas", en: "Mozzarella sticks", price: 4.4, unitLv: "5 gab.", unitEn: "5 pcs" },
  { lv: "Habanero siera uzkoda", en: "Habanero cheese snack", price: 4.4, unitLv: "5 gab.", unitEn: "5 pcs" },
  { lv: "Jalapeno siera uzkoda", en: "Jalapeno cheese snack", price: 4.4, unitLv: "5 gab.", unitEn: "5 pcs" },
]);

const foodMeatSnacks = section("food", "Gaļas uzkodas", "Meat snacks", [
  { lv: "Nageti (vistas fileja)", en: "Chicken nuggets", price: 5.8, unitLv: "5 gab.", unitEn: "5 pcs" },
  { lv: "Nageti (vegāni)", en: "Vegan nuggets", price: 4.8, unitLv: "5 gab.", unitEn: "5 pcs" },
  { lv: "Tīģergarneles", en: "Tiger shrimp", price: 5.5, unitLv: "5 gab.", unitEn: "5 pcs" },
  { lv: "Kalmāra (fileja) gredzeni", en: "Calamari rings", price: 4.0, unitLv: "150 g", unitEn: "150 g" },
]);

const foodFries = section("food", "Fri kartupeļi", "Fries", [
  { lv: "Kartupeļi fri", en: "French fries", price: 3.8, unitLv: "150 g", unitEn: "150 g" },
  { lv: "Saldais kartupelis", en: "Sweet potato fries", price: 4.2, unitLv: "150 g", unitEn: "150 g" },
  { lv: "Kartupeļi fri ar Gouda sieru", en: "Fries with Gouda cheese", price: 6.0, descLv: "ar Sweet Chilly mērci", descEn: "with sweet chilli sauce" },
  { lv: "Kartupeļu laiviņas", en: "Potato wedges", price: 4.8, descLv: "ar salsas mērci", descEn: "with salsa sauce" },
]);

const foodVegSnacks = section("food", "Dārzeņu uzkodas", "Vegetable snacks", [
  { lv: "Spring rolls", en: "Spring rolls", price: 3.8, unitLv: "6 gab.", unitEn: "6 pcs" },
  { lv: "Sīpolu gredzeni", en: "Onion rings", price: 2.8, unitLv: "5 gab.", unitEn: "5 pcs" },
  { lv: "Avokado", en: "Avocado fritters", price: 4.5, unitLv: "100 g", unitEn: "100 g" },
]);

const foodGyoza = section("food", "Gyoza", "Gyoza", [
  { lv: "Gyoza ar tofu un dārzeņiem", en: "Gyoza with tofu and vegetables", price: 6.9 },
  { lv: "Gyoza spinātu miklā ar dārzeņiem", en: "Gyoza in spinach wrap with vegetables", price: 6.9 },
  { lv: "Gyoza ar cūkgaļu un dārzeņiem", en: "Gyoza with pork and vegetables", price: 6.9 },
  { lv: "Gyoza BBQ liellops", en: "Gyoza BBQ beef", price: 6.9 },
  { lv: "Gyoza ar vistu un kimči", en: "Gyoza with chicken and kimchi", price: 6.9 },
  { lv: "Gyoza ar garnelēm un dārzeņiem", en: "Gyoza with shrimp and vegetables", price: 6.9 },
  { lv: "Gyoza ar vistu un dārzeņiem", en: "Gyoza with chicken and vegetables", price: 6.9 },
]);

const foodPlatters = section("food", "Uzkodu plates", "Snack platters", [
  { lv: "Uzkodu plate — Maza", en: "Snack platter — Small", price: 12.5, descLv: "dažādu uzkodu izlase", descEn: "assorted snack selection" },
  { lv: "Uzkodu plate — Vidēja", en: "Snack platter — Medium", price: 17.5, descLv: "dažādu uzkodu izlase", descEn: "assorted snack selection" },
  { lv: "Uzkodu plate — Siera", en: "Snack platter — Cheese", price: 16.5, descLv: "dažādu siera uzkodu izlase", descEn: "assorted cheese snack selection" },
  { lv: "Uzkodu plate — Lielā", en: "Snack platter — Large", price: 24.5, descLv: "dažādu uzkodu izlase", descEn: "assorted snack selection" },
]);

const foodSauces = section("food", "Mērces", "Sauces", [
  { lv: "Papildu mērce", en: "Extra sauce", price: 0.5, descLv: "\"Go To\" mērce, majonēze, kečups, Sweet Chilli, gurķu mērce, ķiploku mērce, BBQ", descEn: "\"Go To\" sauce, mayo, ketchup, sweet chilli, cucumber sauce, garlic sauce, BBQ" },
]);

const foodEdamame = section("food", "Edamame", "Edamame", [
  { lv: "Edamame pupiņas", en: "Edamame beans", price: 5.0 },
]);

const foodWok = section("food", "Wok", "Wok", [
  { lv: "Wok ar vistu", en: "Wok with chicken", price: 13.0 },
  { lv: "Wok ar tofu", en: "Wok with tofu", price: 13.0 },
]);

const foodPoke = section("food", "Poke bļodas", "Poke bowls", [
  { lv: "Poke ar kraukšķīgu vistas fileju", en: "Poke with crispy chicken fillet", price: 9.5, descLv: "katra bļoda ietver rīsus", descEn: "each bowl includes rice" },
  { lv: "Poke ar Ziemeļu garnelēm", en: "Poke with cold-water shrimp", price: 9.5, descLv: "katra bļoda ietver rīsus", descEn: "each bowl includes rice" },
  { lv: "Poke ar Wakame salātiem", en: "Poke with wakame salad", price: 9.0, descLv: "katra bļoda ietver rīsus", descEn: "each bowl includes rice" },
  { lv: "Poke ar viltoto vistu", en: "Poke with vegan \"chicken\"", price: 9.5, descLv: "katra bļoda ietver rīsus", descEn: "each bowl includes rice" },
  { lv: "Poke ar tīģergarnelēm", en: "Poke with tiger shrimp", price: 9.5, descLv: "katra bļoda ietver rīsus", descEn: "each bowl includes rice" },
  { lv: "Poke ar lasi", en: "Poke with salmon", price: 9.5, descLv: "katra bļoda ietver rīsus", descEn: "each bowl includes rice" },
]);

// ============================= DRINKS =============================

const drinksWater = section("drinks", "Ūdens", "Water", [
  { lv: "Ūdens", en: "Water", price: 1.8, unitLv: "300 ml, negāzēts / gāzēts", unitEn: "300 ml, still / sparkling" },
  { lv: "Karafe", en: "Carafe", price: 3.5, unitLv: "1 l" },
]);

const drinksCoffee = section("drinks", "Kafija", "Coffee", [
  { lv: "Melna kafija", en: "Black coffee", price: 3.0 },
  { lv: "Balta kafija", en: "White coffee", price: 3.5 },
  { lv: "Latte", en: "Latte", price: 3.5 },
  { lv: "Aukstā latte", en: "Cold latte", price: 5.0 },
  { lv: "Cappuccino", en: "Cappuccino", price: 3.5 },
  { lv: "Espresso", en: "Espresso", price: 3.0 },
]);

const drinksCacao = section("drinks", "Kakao", "Cacao", [{ lv: "Kakao", en: "Cacao", price: 3.5 }]);

const drinksTea = section("drinks", "Tēja", "Tea", [
  { lv: "Tēja, krūze", en: "Tea, cup", price: 2.5 },
  {
    lv: "Tēja, kanniņa", en: "Tea, teapot", price: 4.5,
    descLv: "Assam, kumelīšu, klasiskā zaļā, Copa Cabana, Earl Grey, Green Angel, jasmīnu, Lemon Sky, kalnu garšaugu, piparmētru, sarkano ogu, rooibos vaniļas, mežrozīšu, sudraba liepziedu, saldā ingvera",
    descEn: "Assam, camomile, classic green, Copa Cabana, Earl Grey, Green Angel, jasmine, Lemon Sky, mountain herbs, peppermint, red berries, rooibos vanilla, rose hip, silver lime blossom, sweet ginger",
  },
]);

const drinksIceTea = section("drinks", "Ledus tēja", "Iced tea", [{ lv: "Ledus tēja", en: "Iced tea", price: 4.5 }]);

const drinksFreshJuice = section("drinks", "Svaigi spiesta sula", "Fresh juice", [
  { lv: "Apelsīnu", en: "Orange", price: 5.0, unitLv: "300 ml" },
  { lv: "Greipfrūtu", en: "Grapefruit", price: 5.0, unitLv: "300 ml" },
]);

const drinksJuiceDrink = section("drinks", "Sulas dzēriens", "Juice drink", [
  { lv: "Ličija", en: "Lychee", price: 3.5, unitLv: "330 ml" },
  { lv: "Mangostīna", en: "Mangosteen", price: 3.5, unitLv: "330 ml" },
  { lv: "Rozā guava", en: "Pink guava", price: 3.5, unitLv: "330 ml" },
]);

const drinksKvass = section("drinks", "Kvass", "Kvass", [
  { lv: "Kvass, Ulmaņlaiku", en: "Kvass, Ulmaņlaiku", price: 4.0, unitLv: "500 ml" },
]);

const drinksHoney = section("drinks", "Medus", "Honey", [{ lv: "Medus", en: "Honey", price: 0.5 }]);

const drinksSoft = section("drinks", "Atspirdzinošie dzērieni", "Soft drinks", [
  { lv: "Coca-Cola / Coca-Cola Zero", en: "Coca-Cola / Coca-Cola Zero", price: 2.0 },
  { lv: "Sprite / Fanta", en: "Sprite / Fanta", price: 2.0, unitLv: "330 ml" },
  { lv: "Rožu limonāde", en: "Rose lemonade", price: 2.0 },
  { lv: "Indian Tonic", en: "Indian Tonic", price: 2.0, unitLv: "330 ml" },
  { lv: "Thomas Henry rozā greipfrūtu limonāde", en: "Thomas Henry pink grapefruit lemonade", price: 2.8, unitLv: "200 ml" },
  { lv: "Thomas Henry ingvera eils", en: "Thomas Henry ginger ale", price: 2.8, unitLv: "200 ml" },
]);

const drinksJapaneseSoda = section("drinks", "Japāņu limonāde Hatakosen", "Japanese soft drink (Hatakosen)", [
  { lv: "Hatakosen limonāde", en: "Hatakosen soft drink", price: 3.5, unitLv: "200 ml", descLv: "ananasu, mellenu, matčas vai zemeņu", descEn: "pineapple, blueberry, matcha, or strawberry" },
]);

const drinksEnergy = section("drinks", "Enerģijas dzēriens", "Energy drink", [
  { lv: "Lucky Punch Wild Berry / Original", en: "Lucky Punch Wild Berry / Original", price: 3.5 },
  { lv: "Red Bull", en: "Red Bull", price: 3.5, unitLv: "250 ml" },
]);

const drinksJuices = section("drinks", "Sulas", "Juices", [
  { lv: "Ananasu", en: "Pineapple", price: 2.0, unitLv: "300 ml" },
  { lv: "Apelsīnu", en: "Orange", price: 2.0, unitLv: "300 ml" },
  { lv: "Ābolu", en: "Apple", price: 2.0, unitLv: "300 ml" },
  { lv: "Dzērveņu", en: "Cranberry", price: 2.0, unitLv: "300 ml" },
  { lv: "Multivitamīnu", en: "Multivitamin", price: 2.0, unitLv: "300 ml" },
  { lv: "Tomātu", en: "Tomato", price: 2.0, unitLv: "300 ml" },
  { lv: "Upeņu", en: "Black currant", price: 2.0, unitLv: "300 ml" },
  { lv: "Vīnogu", en: "Grape", price: 2.0, unitLv: "300 ml" },
]);

const drinksKidsJuice = section("drinks", "Bērnu suliņas", "Children's juice", [
  { lv: "Ābolu-Ķiršu", en: "Apple-cherry", price: 1.8, unitLv: "250 ml" },
  { lv: "Multiaugļu", en: "Multifruit", price: 1.8, unitLv: "250 ml" },
  { lv: "Zemeņu", en: "Strawberry", price: 1.8, unitLv: "250 ml" },
]);

const drinksWine = section("drinks", "Vīns", "Wine", [
  { lv: "Biorebe Pinot Grigio Bio Vegan", en: "Biorebe Pinot Grigio Bio Vegan", price: 6.0, unitLv: "250 ml", descLv: "sausais baltvīns", descEn: "dry white wine" },
  { lv: "Kafer Chardonnay Vino Bianco", en: "Kafer Chardonnay Vino Bianco", price: 6.0, unitLv: "250 ml", descLv: "sausais baltvīns", descEn: "dry white wine" },
  { lv: "Contessa Carola Primitivo", en: "Contessa Carola Primitivo", price: 5.0, unitLv: "150 ml", descLv: "sarkanvīns", descEn: "red wine", verify: "Serving size and wine style inferred from surrounding rows — not explicit in source." },
  { lv: "Malvasia Nera", en: "Malvasia Nera", price: 4.5, unitLv: "150 ml, 15%", descLv: "pussaldais sarkanvīns", descEn: "semi-sweet red wine" },
  { lv: "P.Mertes Gold Edit. Riesling", en: "P.Mertes Gold Edit. Riesling", price: 5.0, unitLv: "150 ml", descLv: "saldais baltvīns", descEn: "sweet white wine" },
  { lv: "Alazani Valley Red", en: "Alazani Valley Red", price: 4.5, unitLv: "150 ml", descLv: "pussaldais sarkanvīns", descEn: "semi-sweet red wine" },
  { lv: "Kafer Merlot Vino Rosso Vegan", en: "Kafer Merlot Vino Rosso Vegan", price: 6.0, unitLv: "250 ml", descLv: "sausais sarkanvīns", descEn: "dry red wine" },
  { lv: "Sake - Choya", en: "Sake - Choya", price: 4.5, unitLv: "150 ml", descLv: "japāņu vīns", descEn: "Japanese wine" },
  { lv: "Vīns - Choya Silver", en: "Choya Silver wine", price: 4.0, unitLv: "125 ml", descLv: "japāņu vīns", descEn: "Japanese wine" },
  { lv: "Vīns - Choya Silver Red", en: "Choya Silver Red wine", price: 4.0, unitLv: "125 ml", descLv: "japāņu vīns", descEn: "Japanese wine" },
  { lv: "Whistling Track Sauvignon Blanc", en: "Whistling Track Sauvignon Blanc", price: 5.0, unitLv: "150 ml, 12.5%", descLv: "sausais baltvīns", descEn: "dry white wine" },
]);

const drinksBeer = section("drinks", "Alus", "Beer", [
  { lv: "Piebalgas gaišais", en: "Piebalgas gaišais", price: 4.5, unitLv: "0.5 l, 5.6%" },
  { lv: "Piebalgas Lux tumšais", en: "Piebalgas Lux tumšais (dark)", price: 4.5, unitLv: "0.5 l, 5.8%" },
  { lv: "Valmiermuiža", en: "Valmiermuiža", price: 4.5, unitLv: "0.5 l, 5.2%" },
  { lv: "Leffe", en: "Leffe", price: 4.0, unitLv: "0.33 l, 6.6%" },
  { lv: "Leffe brune", en: "Leffe Brune", price: 4.0, unitLv: "0.33 l", verify: "ABV printed as 0% in the source, which is unusual for Leffe Brune — worth confirming (may be a misprint for ~6%)." },
  { lv: "Corona Extra", en: "Corona Extra", price: 4.0, unitLv: "0.33 l, 4.5%" },
  { lv: "Corona extra cero", en: "Corona Cero (0.0%)", price: 4.0, unitLv: "0.33 l, 0%" },
  { lv: "Celmlauzis", en: "Celmlauzis (0.0%)", price: 3.5, unitLv: "0.33 l, 0%" },
]);

const drinksCider = section("drinks", "Sidrs", "Cider", [
  { lv: "Dārza sidrs, Bārbele", en: "Dārza sidrs, barberry", price: 4.5, unitLv: "0.5 l, 5.5%" },
  { lv: "Dārza sidrs, Jāņoga", en: "Dārza sidrs, red currant", price: 4.5, unitLv: "0.5 l, 5.5%" },
  { lv: "Somersby, Bumbieru", en: "Somersby, pear", price: 4.0, unitLv: "0.33 l, 4.5%" },
]);

const drinksCocktailsNoAlco = section("drinks", "Kokteiļi (bezalkoholiskie)", "Cocktails (non-alcoholic)", [
  { lv: "Aperol spritz", en: "Aperol spritz", price: 6.5 },
  { lv: "Ice Tea kokteilis", en: "Ice tea cocktail", price: 4.5 },
  { lv: "Saldējuma kokteilis", en: "Ice cream cocktail", price: 5.5 },
  { lv: "Pink Rose", en: "Pink Rose", price: 6.5 },
  { lv: "Malibu sunset", en: "Malibu sunset", price: 6.5 },
  { lv: "Marakujas spritz", en: "Passion fruit spritz", price: 6.5 },
  { lv: "Mohito", en: "Mojito", price: 6.5 },
  { lv: "Green lagoon", en: "Green lagoon", price: 6.5 },
]);

const drinksCocktailsAlco = section("drinks", "Kokteiļi (18+)", "Cocktails (18+)", [
  { lv: "Aperol spritz", en: "Aperol spritz", price: 6.5 },
  { lv: "Go Aperol spritz", en: "Go Aperol spritz", price: 6.5 },
  { lv: "Limoncello spritz", en: "Limoncello spritz", price: 7.0 },
  { lv: "Passion spritz", en: "Passion spritz", price: 7.5 },
  { lv: "Apple pie", en: "Apple pie", price: 3.5, verify: "Price is notably lower than every other cocktail in this list — confirm it isn't meant to be a shot-sized pour." },
  { lv: "Blue lagoon", en: "Blue lagoon", price: 6.5 },
  { lv: "Elderflower Bols", en: "Elderflower Bols", price: 6.5, descLv: "plūškoka liķiera kokteilis", descEn: "elderflower liqueur cocktail" },
  { lv: "Malibu & pineapple", en: "Malibu & pineapple", price: 6.5 },
  { lv: "Malibu & cranberry", en: "Malibu & cranberry", price: 6.5 },
  { lv: "Malibu sunset", en: "Malibu sunset", price: 6.5 },
  { lv: "Mimosa", en: "Mimosa", price: 6.5 },
  { lv: "Mohito", en: "Mojito", price: 6.5 },
  { lv: "Peach Gin Rose", en: "Peach Gin Rose", price: 7.0 },
  { lv: "Pornstar martini", en: "Pornstar martini", price: 8.0 },
  { lv: "Rasberry Vodka", en: "Raspberry Vodka", price: 6.5 },
]);

const drinksWhiskey = section("drinks", "Viskijs", "Whiskey", [
  { lv: "Bushmills Black Bush", en: "Bushmills Black Bush", price: 5.5, unitLv: "4 cl, 40%" },
  { lv: "Proper Twelve", en: "Proper Twelve", price: 5.5, unitLv: "4 cl, 40%" },
  { lv: "Japan Tenjaku", en: "Japan Tenjaku", price: 4.9, unitLv: "4 cl, 40%" },
  { lv: "Jack Daniels", en: "Jack Daniels", price: 3.9, unitLv: "4 cl, 40%" },
  { lv: "Jack Daniels Honey", en: "Jack Daniels Honey", price: 3.9, unitLv: "4 cl, 35%" },
  { lv: "Chivas Regal 12 YO", en: "Chivas Regal 12 YO", price: 4.9, unitLv: "4 cl, 40%" },
  { lv: "Jameson", en: "Jameson", price: 3.9, unitLv: "4 cl, 40%" },
  { lv: "Four Roses", en: "Four Roses", price: 4.0, unitLv: "4 cl, 40%" },
]);

const drinksBrandy = section("drinks", "Brendijs un konjaks", "Brandy & cognac", [
  { lv: "Martell V.S.O.P.", en: "Martell V.S.O.P.", price: 5.9, unitLv: "4 cl, 40%" },
  { lv: "Martell V.S.", en: "Martell V.S.", price: 4.5, unitLv: "4 cl, 40%" },
  { lv: "Chateau de Montifaud Ariane VS", en: "Chateau de Montifaud Ariane VS", price: 4.5, unitLv: "4 cl, 40%" },
]);

const drinksTequila = section("drinks", "Tekila", "Tequila", [
  { lv: "Olmeca Blanco", en: "Olmeca Blanco", price: 3.9, unitLv: "4 cl, 35%" },
  { lv: "Olmeca Reposado", en: "Olmeca Reposado", price: 3.9, unitLv: "4 cl, 35%" },
]);

const drinksRum = section("drinks", "Rums", "Rum", [
  { lv: "Don Papa", en: "Don Papa", price: 4.9, unitLv: "4 cl, 40%" },
  { lv: "Bumbu Rum", en: "Bumbu Rum", price: 4.9, unitLv: "4 cl, 40%" },
  { lv: "Bush Spiced Mango", en: "Bush Spiced Mango", price: 3.9, unitLv: "4 cl, 37.5%" },
  { lv: "Bush Spiced Original", en: "Bush Spiced Original", price: 3.9, unitLv: "4 cl, 37.5%" },
]);

const drinksSparkling = section("drinks", "Dzirkstošais vīns", "Sparkling wine", [
  { lv: "Martini Asti", en: "Martini Asti", price: 5.5, unitLv: "200 ml" },
  { lv: "Caduto prosecco extra dry", en: "Caduto prosecco extra dry", price: 5.5, unitLv: "150 ml" },
  { lv: "Cornaro Prosecco DOC Extra Dry", en: "Cornaro Prosecco DOC Extra Dry", price: 6.0, unitLv: "200 ml" },
  { lv: "Diamant Loire Brut Cremant Blanc", en: "Diamant Loire Brut Cremant Blanc", price: 24.0, unitLv: "750 ml, 12%" },
]);

const drinksLiqueur = section("drinks", "Liķieris", "Liqueur", [
  { lv: "Baileys", en: "Baileys", price: 4.0, unitLv: "4 cl, 17%" },
  { lv: "Jägermeister", en: "Jägermeister", price: 4.5, unitLv: "4 cl, 35%" },
  { lv: "Luxardo Limoncello", en: "Luxardo Limoncello", price: 4.5, unitLv: "4 cl, 27%" },
]);

const drinksVodka = section("drinks", "Degvīns", "Vodka", [
  { lv: "Absolut", en: "Absolut", price: 3.8, unitLv: "4 cl, 40%" },
  { lv: "Absolut Raspberry", en: "Absolut Raspberry", price: 3.8, unitLv: "4 cl, 40%" },
  { lv: "Absolut Vanilla", en: "Absolut Vanilla", price: 3.8, unitLv: "4 cl, 38%" },
  { lv: "Beluga Noble", en: "Beluga Noble", price: 6.5, unitLv: "4 cl, 40%" },
  { lv: "Tenjaku vodka", en: "Tenjaku vodka", price: 3.8, unitLv: "4 cl, 40%" },
]);

const drinksGin = section("drinks", "Džins", "Gin", [
  { lv: "Tenjaku Craft Gin", en: "Tenjaku Craft Gin", price: 4.0, unitLv: "4 cl, 37.5%" },
  { lv: "Hayman's Peach & Rose", en: "Hayman's Peach & Rose", price: 4.0, unitLv: "4 cl, 25%" },
]);

const drinksLocal = section("drinks", "Vietējais ražojums", "Locally made", [
  { lv: "Uzlējums, 8 ogu", en: "Infusion, 8-berry", price: 4.5, unitLv: "4 cl, 28%" },
  { lv: "Uzlējums, Brūkleņu", en: "Infusion, lingonberry", price: 4.5, unitLv: "4 cl, 28%" },
  { lv: "Uzlējums, Cidoniju", en: "Infusion, quince", price: 4.5, unitLv: "4 cl, 25%" },
  { lv: "Uzlējums, Upeņu", en: "Infusion, black currant", price: 4.5, unitLv: "4 cl, 28%" },
  { lv: "Destilāts, Ābolu", en: "Distillate, apple", price: 5.4, unitLv: "4 cl, 50%" },
  { lv: "Destilāts, Ķirbju", en: "Distillate, pumpkin", price: 5.4, unitLv: "4 cl, 45%" },
  { lv: "Destilāts, Sarkano klinšu ūdens", en: "Distillate, Red Cliff water", price: 5.4, unitLv: "4 cl, 40%" },
]);

const drinksBalsam = section("drinks", "Balzāms", "Balsam", [
  { lv: "Rīgas Melnais balzāms", en: "Rīgas Black Balsam", price: 4.0, unitLv: "4 cl, 45%" },
  { lv: "Rīgas MB Upeņu", en: "Rīgas MB black currant", price: 4.0, unitLv: "4 cl, 30%" },
  { lv: "Rīgas MB Ķiršu", en: "Rīgas MB cherry", price: 4.0, unitLv: "4 cl, 30%" },
]);

const drinksShots = section("drinks", "Šotu pusmetri", "Shot flights", [
  { lv: "Tekilas pusmetrs", en: "Tequila half-meter", price: 19.5 },
  { lv: "\"Iepazīsti Cēsis\" pusmetrs", en: "\"Get to know Cēsis\" half-meter", price: 23.5, descLv: "vietējais ražojums", descEn: "locally made spirits" },
  { lv: "Ābolu pīrāga pusmetrs", en: "Apple pie half-meter", price: 15.5 },
  { lv: "Jäger Bomb pusmetrs", en: "Jäger Bomb half-meter", price: 13.1 },
]);

export const seedData: SeedItem[] = [
  ...sushiMiniMaki,
  ...sushiSets,
  ...sushiNigiri,
  ...sushiFutomaki,
  ...sushiUraMaki,
  ...sushiTempuraMaki,
  ...sushiHotFutomaki,
  ...sushiHotUraMaki,
  ...sushiCreamyHotMaki,
  ...foodDesserts,
  ...foodSalads,
  ...foodSoups,
  ...foodBurgers,
  ...foodWings,
  ...foodCheeseSnacks,
  ...foodMeatSnacks,
  ...foodFries,
  ...foodVegSnacks,
  ...foodGyoza,
  ...foodPlatters,
  ...foodSauces,
  ...foodEdamame,
  ...foodWok,
  ...foodPoke,
  ...drinksWater,
  ...drinksCoffee,
  ...drinksCacao,
  ...drinksTea,
  ...drinksIceTea,
  ...drinksFreshJuice,
  ...drinksJuiceDrink,
  ...drinksKvass,
  ...drinksHoney,
  ...drinksSoft,
  ...drinksJapaneseSoda,
  ...drinksEnergy,
  ...drinksJuices,
  ...drinksKidsJuice,
  ...drinksWine,
  ...drinksBeer,
  ...drinksCider,
  ...drinksCocktailsNoAlco,
  ...drinksCocktailsAlco,
  ...drinksWhiskey,
  ...drinksBrandy,
  ...drinksTequila,
  ...drinksRum,
  ...drinksSparkling,
  ...drinksLiqueur,
  ...drinksVodka,
  ...drinksGin,
  ...drinksLocal,
  ...drinksBalsam,
  ...drinksShots,
];
