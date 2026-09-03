import type { StaticImageData } from "next/image";
import kebabPuiCartofi from "../../meniu/2Kebab pui + cartofi pai.jpeg";
import aripioareChilli from "../../meniu/Aripioare chilli.jpg";
import baconBurger from "../../meniu/Bacon Burger.jpg";
import baconBurgerMeniu from "../../meniu/Bacon burger meniu.jpg";
import bigChickenKebab from "../../meniu/Big Chicken kebab.jpg";
import bigBeefBurgerMeniu from "../../meniu/Big beef burger meniu.jpg";
import bigBeefBurger from "../../meniu/Big beef burger.jpg";
import bigDailyBurger from "../../meniu/Big daily burger.jpg";
import bigPorcKebab from "../../meniu/Big porc kebab.jpg";
import chickenBurgerMeniu from "../../meniu/Chicken Burger meniu.jpg";
import chickenBurger from "../../meniu/Chicken Burger.jpg";
import chickenTray from "../../meniu/Chicken tray.jpg";
import dailySpecialKebab from "../../meniu/Daily special kebab.jpeg";
import specialBurger from "../../meniu/Special burger.png";
import americanBurgerMeniu from "../../meniu/american burger meniu.jpg";
import americanBurger from "../../meniu/american burger.jpg";
import aripioareBbq from "../../meniu/aripioare bbq.jpg";
import aripioareCrocante from "../../meniu/aripioare crocante.jpg";
import baconeroTray from "../../meniu/baconero tray.jpg";
import bbq from "../../meniu/bbq.jpg";
import bigDailyBurgerMeniu from "../../meniu/big daily burger meniu.jpeg";
import bigSpecialBurger from "../../meniu/big special burger.png";
import caesarSalat from "../../meniu/caesar salat.jpg";
import cartofiPai from "../../meniu/cartofi pai.jpg";
import cheddarHotDog from "../../meniu/cheddar hot dog.png";
import cheeseDePui from "../../meniu/cheese de pui.jpeg";
import cheeseSticks from "../../meniu/cheese sticks.jpg";
import cheeseNuggetsKebab from "../../meniu/chesee nuggets kebab.jpeg";
import cheeseDePuiMeniu from "../../meniu/chesse de pui meniu.jpeg";
import cheeseNuggetsMeniu from "../../meniu/chesse nuggets meniu.jpeg";
import comboTreiKebabEfes from "../../meniu/combo 3kebab 3efes.png";
import comboBigBeef from "../../meniu/combo big beef.png";
import comboBigDaily from "../../meniu/combo big daily.png";
import comboCheddarHotDog from "../../meniu/combo cheddar hotdog.jpg";
import comboClassicHotDog from "../../meniu/combo classic hot dog.jpg";
import comboCrispyHotDog from "../../meniu/combo crispy hotdog.jpg";
import comboPorc from "../../meniu/combo de porc.png";
import comboPui from "../../meniu/combo de pui.png";
import crispyHotDog from "../../meniu/crispy hotdog.jpg";
import dailySpecialMeniu from "../../meniu/daily special meniu.jpeg";
import falafelKebabMeniu from "../../meniu/falafel kebab meniu.png";
import falafelKebab from "../../meniu/falafel kebab.png";
import greekSalat from "../../meniu/greek salat.jpg";
import hotDogClassic from "../../meniu/hotdog classic.png";
import ineleCalamar from "../../meniu/inele calamar.jpeg";
import ineleCeapa from "../../meniu/inele de ceapa.jpg";
import kebabPorcMeniu from "../../meniu/kebab porc meniu.jpg";
import kebabPorc from "../../meniu/kebab porc.jpg";
import kebabPuiMeniu from "../../meniu/kebab pui meniu.jpg";
import kebabPui from "../../meniu/kebab pui.jpg";
import kebabVeggieMeniu from "../../meniu/kebab veggie meniu.jpg";
import kebabVeggie from "../../meniu/kebab veggie.jpg";
import ketchup from "../../meniu/ketchuo.jpg";
import maioneza from "../../meniu/maioneza.jpg";
import nuggetsKebabMeniu from "../../meniu/nuggets kebab meniu.jpg";
import nuggetsKebab from "../../meniu/nuggets kebab.jpg";
import nuggetsTray from "../../meniu/nuggets tray.jpg";
import nuggets from "../../meniu/nuggets.jpg";
import platouPorc from "../../meniu/platou de porc.jpg";
import platouPui from "../../meniu/platou de pui.jpg";
import platouMici from "../../meniu/platou mici.jpeg";
import platouNuggets from "../../meniu/platou nuggets.jpg";
import porkBeefBurgerMeniu from "../../meniu/pork beef burger meniu.jpg";
import porkBeefBurger from "../../meniu/pork beef burger.jpg";
import porkTray from "../../meniu/pork tray.jpg";
import promoBigBeef from "../../meniu/promo 2bigbeef plus cartofi.jpeg";
import sosBurger from "../../meniu/sos burger.jpg";
import sosUsturoi from "../../meniu/sos usturoi.jpg";
import specialBurgerMeniu from "../../meniu/special burger meniu.png";

export type Language = "ro" | "ru";
export type CategoryId = "kebab" | "burger" | "kebab-menu" | "burger-menu" | "croki-menu" | "salate" | "bauturi";
export type LocalizedText = Record<Language, string>;

export type MenuProduct = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  image?: StaticImageData;
  tag?: LocalizedText;
  imageFit?: "cover" | "contain";
};

export type MenuCategory = {
  id: CategoryId;
  number: string;
  name: LocalizedText;
  note: LocalizedText;
  items: MenuProduct[];
};

const descriptions = {
  kebab: { ro: "Kebab pregătit proaspăt, la comandă.", ru: "Свежий кебаб, приготовленный на заказ." },
  burger: { ro: "Burger generos, pregătit la comandă.", ru: "Сытный бургер, приготовленный на заказ." },
  kebabMenu: { ro: "Meniu complet pentru o masă consistentă.", ru: "Полноценный сытный набор." },
  burgerMenu: { ro: "Burger în combinație de meniu.", ru: "Бургер в составе комбо-набора." },
  side: { ro: "Gustare crocantă, potrivită de împărțit.", ru: "Хрустящая закуска, которой удобно делиться." },
  tray: { ro: "Platou generos, potrivit de împărțit.", ru: "Большое ассорти, которым удобно делиться." },
  sauce: { ro: "Sos pentru gustul tău preferat.", ru: "Соус к вашему любимому блюду." },
  salad: { ro: "Salată proaspătă, pregătită la comandă.", ru: "Свежий салат, приготовленный на заказ." },
} satisfies Record<string, LocalizedText>;

const tag = (ro: string, ru: string): LocalizedText => ({ ro, ru });
const product = (id: string, ro: string, ru: string, price: number, image: StaticImageData, description: LocalizedText, productTag?: LocalizedText, imageFit: "cover" | "contain" = "cover"): MenuProduct => ({ id, name: { ro, ru }, description, price, image, tag: productTag, imageFit });

const kebabItems: MenuProduct[] = [
  product("daily-kebab", "Daily Kebab 400g", "Daily Kebab 400 г", 100, dailySpecialKebab, { ro: "Lavaș, dublu carne de pui, roșii, ceapă roșie, sos special", ru: "Лаваш, двойная порция куриного мяса, помидоры, красный лук, специальный соус" }, tag("Special", "Особый")),
  { id: "fitness-kebab", name: { ro: "Fitness Kebab 400g", ru: "Fitness Kebab 400 г" }, description: { ro: "Lavaș, nuggets pui, porumb dulce, iceberg, castraveți proaspeți, mozzarella, sos special", ru: "Лаваш, куриные наггетсы, сладкая кукуруза, салат айсберг, свежие огурцы, моцарелла, специальный соус" }, price: 95 },
  product("big-daily-chicken-kebab", "Big Daily Chicken Kebab 800g", "Big Daily Chicken Kebab 800 г", 140, bigChickenKebab, { ro: "Lavaș, carne de pui, cașcaval, cartofi pai, varză, castraveți proaspeți, roșii, sos", ru: "Лаваш, куриное мясо, сыр, картофель фри, капуста, свежие огурцы, помидоры, соус" }, tag("Big", "Большой")),
  product("big-daily-pork-kebab", "Big Daily Pork Kebab 800g", "Big Daily Pork Kebab 800 г", 150, bigPorcKebab, { ro: "Lavaș, carne de porc, cașcaval, cartofi pai, varză, castraveți proaspeți, roșii, sos", ru: "Лаваш, свинина, сыр, картофель фри, капуста, свежие огурцы, помидоры, соус" }, tag("Big", "Большой")),
  product("kebab-pui", "Kebab de Pui 400g", "Кебаб с курицей 400 г", 80, kebabPui, { ro: "Lavaș, carne de pui, cartofi pai, varză, castraveți murați, roșii, sos", ru: "Лаваш, куриное мясо, картофель фри, капуста, маринованные огурцы, помидоры, соус" }, tag("Popular", "Популярное")),
  product("cheese-kebab-pui", "Cheese Kebab Pui 400g", "Сырный кебаб с курицей 400 г", 100, cheeseDePui, { ro: "Lavaș cheese, carne de pui, cașcaval, cartofi pai, varză, castraveți murați, roșii, sos", ru: "Сырный лаваш, куриное мясо, сыр, картофель фри, капуста, маринованные огурцы, помидоры, соус" }),
  product("kebab-porc", "Kebab de Porc 400g", "Кебаб со свининой 400 г", 90, kebabPorc, { ro: "Lavaș, carne de porc, cartofi pai, varză, castraveți murați, roșii, sos", ru: "Лаваш, свинина, картофель фри, капуста, маринованные огурцы, помидоры, соус" }),
  product("nuggets-kebab", "Nuggets Kebab 400g", "Кебаб с наггетсами 400 г", 85, nuggetsKebab, { ro: "Lavaș, carne de pui pane, cartofi pai, varză, castraveți, ardei dulce, roșii, sos", ru: "Лаваш, куриное мясо в панировке, картофель фри, капуста, огурцы, сладкий перец, помидоры, соус" }),
  product("cheese-nuggets-kebab", "Cheese Nuggets Kebab 400g", "Сырный кебаб с наггетсами 400 г", 105, cheeseNuggetsKebab, { ro: "Lavaș cheese, cașcaval, carne de pui pane, cartofi pai, varză, castraveți proaspeți, roșii, sos", ru: "Сырный лаваш, сыр, куриное мясо в панировке, картофель фри, капуста, свежие огурцы, помидоры, соус" }),
  product("chicken-kebab-tray", "Chicken Kebab Tray 450g", "Куриный кебаб на тарелке 450 г", 85, chickenTray, { ro: "carne de pui, cașcaval, cartofi pai, sos la alegere", ru: "Куриное мясо, сыр, картофель фри, соус на выбор" }),
  product("pork-kebab-tray", "Pork Kebab Tray 450g", "Кебаб со свининой на тарелке 450 г", 95, porkTray, { ro: "carne de porc, cașcaval, cartofi pai, sos la alegere", ru: "Свинина, сыр, картофель фри, соус на выбор" }),
  product("crispy-chicken-kebab-tray", "Crispy Chicken Kebab Tray 450g", "Хрустящий куриный кебаб на тарелке 450 г", 90, nuggetsTray, { ro: "carne crocantă de pui, cașcaval, cartofi pai, sos la alegere", ru: "Хрустящее куриное мясо, сыр, картофель фри, соус на выбор" }),
  product("baconero-tray", "Baconero Tray 450g", "Baconero на тарелке 450 г", 90, baconeroTray, { ro: "bacon, ciuperci, cașcaval, cartofi pai, sos la alegere", ru: "Бекон, грибы, сыр, картофель фри, соус на выбор" }),
  product("daily-falafel-kebab", "Daily Falafel Kebab 400g", "Daily Falafel Kebab 400 г", 80, falafelKebab, { ro: "lavaș, falafel, varză, cartofi pai, roșii, castraveți murați, ceapă, ardei, sos de post, ketchup", ru: "Лаваш, фалафель, капуста, картофель фри, помидоры, маринованные огурцы, лук, перец, постный соус, кетчуп" }, tag("Veggie", "Вегетарианский"), "contain"),
  product("daily-kebab-de-post", "Daily Kebab de Post 400g", "Постный Daily Kebab 400 г", 80, kebabVeggie, { ro: "lavaș, ciuperci, ardei dulce, castraveți murați, roșii, cartofi pai, sos de post", ru: "Лаваш, грибы, сладкий перец, маринованные огурцы, помидоры, картофель фри, постный соус" }, tag("De post", "Постный")),
];

const burgerItems: MenuProduct[] = [
  product("special-burger", "Special Burger 290g", "Special Burger 290 г", 100, specialBurger, { ro: "carne porc-vită, sos special, cheddar, bacon", ru: "Мясо из свинины и говядины, специальный соус, чеддер, бекон" }, tag("Special", "Особый"), "contain"),
  product("big-special-burger", "Big Special Burger 360g", "Big Special Burger 360 г", 130, bigSpecialBurger, { ro: "carne porc-vită, sos special, cheddar, bacon", ru: "Мясо из свинины и говядины, специальный соус, чеддер, бекон" }, tag("Big", "Большой"), "contain"),
  product("american-burger", "American Burger 240g", "Американский бургер 240 г", 75, americanBurger, { ro: "pârjoală de porc, roșii, castraveți murați, ceapă, iceberg, sos", ru: "Свиная котлета, помидоры, маринованные огурцы, лук, салат айсберг, соус" }),
  product("big-pork-beef-burger", "Big Pork-Beef Burger 340g", "Большой бургер со свининой и говядиной 340 г", 95, bigBeefBurger, { ro: "dublu carne vită-porc, dublu bacon, roșii, dublu cașcaval, castraveți murați, ceapă, salată lollo, sos", ru: "Двойная порция говядины и свинины, двойной бекон, помидоры, двойной сыр, маринованные огурцы, лук, салат лолло, соус" }, tag("Big", "Большой")),
  product("big-daily-burger", "Big Daily Burger 340g", "Big Daily Burger 340 г", 95, bigDailyBurger, { ro: "dublu carne de porc, dublu bacon, dublu cașcaval, sos BBQ", ru: "Двойная порция свинины, двойной бекон, двойной сыр, соус BBQ" }, tag("Daily", "Daily")),
  product("chicken-burger", "Chicken Burger 300g", "Куриный бургер 300 г", 75, chickenBurger, { ro: "pârjoală crispy de pui, roșii, ceapă, salată lollo, sos", ru: "Хрустящая куриная котлета, помидоры, лук, салат лолло, соус" }),
  product("pork-beef-burger", "Pork-Beef Burger 250g", "Бургер со свининой и говядиной 250 г", 75, porkBeefBurger, { ro: "pârjoală vită-porc, roșii, cașcaval, castraveți murați, ceapă, salată lollo, sos", ru: "Котлета из говядины и свинины, помидоры, сыр, маринованные огурцы, лук, салат лолло, соус" }),
  product("bacon-burger", "Bacon Burger 260g", "Бургер с беконом 260 г", 80, baconBurger, { ro: "pârjoală porc, dublu bacon, roșii, cașcaval, castraveți murați, sos", ru: "Свиная котлета, двойной бекон, помидоры, сыр, маринованные огурцы, соус" }),
];

const kebabMenuItems: MenuProduct[] = [
  product("daily-special-meniu", "Daily Special Meniu", "Меню Daily Special", 150, dailySpecialMeniu, { ro: "Daily Special Kebab, cartofi pai, sos, băutură 0.5l la alegere (Coca-Cola/Fanta/Sprite/Dorna)", ru: "Daily Special Kebab, картофель фри, соус, напиток 0,5 л на выбор (Coca-Cola/Fanta/Sprite/Dorna)" }, tag("Special", "Особый")),
  product("kebab-pui-meniu", "Kebab Pui Menu", "Меню с куриным кебабом", 130, kebabPuiMeniu, { ro: "Kebab Pui, cartofi pai, sos, băutură 0.5l la alegere", ru: "Кебаб с курицей, картофель фри, соус, напиток 0,5 л на выбор" }, tag("Popular", "Популярное")),
  product("cheese-kebab-pui-meniu", "Cheese Kebab Pui Menu", "Меню с сырным куриным кебабом", 150, cheeseDePuiMeniu, { ro: "Cheese Kebab Pui, cartofi pai, sos, băutură 0.5l la alegere", ru: "Сырный кебаб с курицей, картофель фри, соус, напиток 0,5 л на выбор" }),
  product("combo-efes-kebab-pui", "Combo Efes Kebab de Pui", "Комбо Efes с куриным кебабом", 140, comboPui, { ro: "Kebab Pui, cartofi pai, sos, Efes 0.5l la alegere (Efes, Efes Blanche, Efes 0)", ru: "Кебаб с курицей, картофель фри, соус, Efes 0,5 л на выбор (Efes, Efes Blanche, Efes 0)" }, undefined, "contain"),
  product("nuggets-kebab-meniu", "Nuggets Kebab Menu", "Меню с кебабом и наггетсами", 130, nuggetsKebabMeniu, { ro: "Nuggets Kebab, cartofi pai, sos, băutură 0.5l la alegere", ru: "Кебаб с наггетсами, картофель фри, соус, напиток 0,5 л на выбор" }),
  product("cheese-nuggets-kebab-meniu", "Cheese Nuggets Kebab Menu", "Меню с сырным кебабом и наггетсами", 155, cheeseNuggetsMeniu, { ro: "Cheese Nuggets Kebab, cartofi pai, sos, băutură 0.5l la alegere", ru: "Сырный кебаб с наггетсами, картофель фри, соус, напиток 0,5 л на выбор" }),
  product("kebab-porc-meniu", "Kebab de Porc Menu", "Меню с кебабом из свинины", 140, kebabPorcMeniu, { ro: "Kebab Porc, cartofi pai, sos, băutură 0.5l la alegere", ru: "Кебаб со свининой, картофель фри, соус, напиток 0,5 л на выбор" }),
  product("combo-efes-kebab-porc", "Combo Efes Kebab de Porc", "Комбо Efes с кебабом из свинины", 150, comboPorc, { ro: "Kebab Porc, cartofi pai, sos, Efes 0.5l la alegere", ru: "Кебаб со свининой, картофель фри, соус, Efes 0,5 л на выбор" }, undefined, "contain"),
  product("daily-falafel-kebab-meniu", "Daily Falafel Kebab Meniu", "Меню Daily Falafel Kebab", 130, falafelKebabMeniu, { ro: "Daily Falafel Kebab, cartofi pai, sos, băutură 0.5l", ru: "Daily Falafel Kebab, картофель фри, соус, напиток 0,5 л" }, tag("Veggie", "Вегетарианский"), "contain"),
  product("daily-kebab-de-post-meniu", "Daily Kebab de Post Meniu", "Меню с постным Daily Kebab", 130, kebabVeggieMeniu, { ro: "Daily Kebab de post, cartofi pai, sos, băutură 0.5l", ru: "Постный Daily Kebab, картофель фри, соус, напиток 0,5 л" }, tag("De post", "Постный")),
  product("doi-kebab-pui-cartofi", "2 Kebab de Pui + Cartofi Pai", "2 кебаба с курицей + картофель фри", 125, kebabPuiCartofi, descriptions.kebabMenu, tag("Combo", "Комбо")),
  product("combo-trei-kebab-efes", "Combo 3 Kebab + 3 Efes", "Комбо 3 кебаба + 3 Efes", 245, comboTreiKebabEfes, descriptions.kebabMenu, tag("De împărțit", "Для компании"), "contain"),
];

const burgerMenuItems: MenuProduct[] = [
  product("special-burger-meniu", "Special Burger Menu", "Меню Special Burger", 140, specialBurgerMeniu, { ro: "Special Burger, cartofi pai, sos, băutură 0.5l (Coca-Cola/Fanta/Sprite/Dorna)", ru: "Special Burger, картофель фри, соус, напиток 0,5 л (Coca-Cola/Fanta/Sprite/Dorna)" }, tag("Special", "Особый"), "contain"),
  product("chicken-burger-meniu", "Chicken Burger Menu", "Меню с куриным бургером", 115, chickenBurgerMeniu, { ro: "Chicken Burger, cartofi pai, sos, băutură 0.5l (Coca-Cola/Fanta/Sprite/Dorna)", ru: "Куриный бургер, картофель фри, соус, напиток 0,5 л (Coca-Cola/Fanta/Sprite/Dorna)" }),
  product("big-pork-beef-burger-meniu", "Big Pork-Beef Burger Menu", "Меню с большим бургером со свининой и говядиной", 140, bigBeefBurgerMeniu, { ro: "Big Pork-Beef Burger, cartofi pai, sos, băutură 0.5l (Coca-Cola/Fanta/Sprite/Dorna)", ru: "Большой бургер со свининой и говядиной, картофель фри, соус, напиток 0,5 л (Coca-Cola/Fanta/Sprite/Dorna)" }, tag("Big", "Большой")),
  product("combo-efes-big-pork-beef-burger", "Combo Efes Big Pork-Beef Burger", "Комбо Efes с большим бургером со свининой и говядиной", 150, comboBigBeef, { ro: "Big Pork-Beef Burger, cartofi, sos, Efes 0.5l la alegere (Efes, Efes Blanche, Efes 0)", ru: "Большой бургер со свининой и говядиной, картофель, соус, Efes 0,5 л на выбор (Efes, Efes Blanche, Efes 0)" }, undefined, "contain"),
  product("big-daily-burger-meniu", "Big Daily Burger Menu", "Меню Big Daily Burger", 140, bigDailyBurgerMeniu, { ro: "Big Daily Burger, cartofi pai, sos, băutură 0.5l (Coca-Cola/Fanta/Sprite/Dorna)", ru: "Big Daily Burger, картофель фри, соус, напиток 0,5 л (Coca-Cola/Fanta/Sprite/Dorna)" }, tag("Daily", "Daily")),
  product("combo-efes-big-daily-burger", "Combo Efes Big Daily Burger", "Комбо Efes с Big Daily Burger", 150, comboBigDaily, { ro: "Big Daily Burger, cartofi, sos, Efes 0.5l la alegere (Efes, Efes Blanche, Efes 0)", ru: "Big Daily Burger, картофель, соус, Efes 0,5 л на выбор (Efes, Efes Blanche, Efes 0)" }, undefined, "contain"),
  product("bacon-burger-meniu", "Bacon Burger Menu", "Меню с бургером с беконом", 120, baconBurgerMeniu, { ro: "Bacon Burger, cartofi pai, sos, băutură 0.5l (Coca-Cola/Fanta/Sprite/Dorna)", ru: "Бургер с беконом, картофель фри, соус, напиток 0,5 л (Coca-Cola/Fanta/Sprite/Dorna)" }),
  product("american-burger-meniu", "American Burger Menu", "Меню с американским бургером", 115, americanBurgerMeniu, { ro: "American Burger, cartofi pai, sos, băutură 0.5l (Coca-Cola/Fanta/Sprite/Dorna)", ru: "Американский бургер, картофель фри, соус, напиток 0,5 л (Coca-Cola/Fanta/Sprite/Dorna)" }),
  product("pork-beef-burger-meniu", "Pork-Beef Burger Menu", "Меню с бургером со свининой и говядиной", 120, porkBeefBurgerMeniu, { ro: "Pork-Beef Burger, cartofi pai, sos, băutură 0.5l (Coca-Cola/Fanta/Sprite/Dorna)", ru: "Бургер со свининой и говядиной, картофель фри, соус, напиток 0,5 л (Coca-Cola/Fanta/Sprite/Dorna)" }),
  product("promo-doi-big-beef", "Promo 2 Big Beef + Cartofi", "Промо 2 Big Beef + картофель", 165, promoBigBeef, descriptions.burgerMenu, tag("Promo", "Промо")),
];

const crokiItems: MenuProduct[] = [
  product("combo-crispy-hot-dog", "Combo Crispy Hot-Dog", "Комбо с хрустящим хот-догом", 105, comboCrispyHotDog, { ro: "Crispy hotdog, cartofi pai, sos la alegere (BBQ, ketchup, garlic, iute), băutură 0.5l la alegere (Coca-Cola, Fanta, Sprite)", ru: "Хрустящий хот-дог, картофель фри, соус на выбор (BBQ, кетчуп, чесночный, острый), напиток 0,5 л на выбор (Coca-Cola, Fanta, Sprite)" }),
  product("crispy-hot-dog", "Crispy Hot-Dog 260g", "Хрустящий хот-дог 260 г", 65, crispyHotDog, { ro: "Chiflă, crispy nuggets pui, iceberg, sos cheddar, sos garlic", ru: "Булочка, хрустящие куриные наггетсы, салат айсберг, соус чеддер, чесночный соус" }),
  product("combo-hot-dog-classic", "Combo Hot-Dog Classic", "Комбо с классическим хот-догом", 95, comboClassicHotDog, { ro: "Classic hotdog, cartofi pai, sos la alegere (BBQ, ketchup, garlic, iute), băutură 0.5l la alegere (Coca-Cola, Fanta, Sprite)", ru: "Классический хот-дог, картофель фри, соус на выбор (BBQ, кетчуп, чесночный, острый), напиток 0,5 л на выбор (Coca-Cola, Fanta, Sprite)" }),
  product("hot-dog-classic", "Hot-Dog Classic", "Классический хот-дог", 50, hotDogClassic, { ro: "Chiflă, crenvurșcă porc-vită, morcov coreean, sos", ru: "Булочка, сосиска из свинины и говядины, морковь по-корейски, соус" }, undefined, "contain"),
  product("combo-hot-dog-cheddar", "Combo Hot-Dog Cheddar", "Комбо с хот-догом с чеддером", 100, comboCheddarHotDog, { ro: "Cheddar hotdog, cartofi pai, sos la alegere (BBQ, ketchup, garlic, iute), băutură 0.5l la alegere (Coca-Cola, Fanta, Sprite)", ru: "Хот-дог с чеддером, картофель фри, соус на выбор (BBQ, кетчуп, чесночный, острый), напиток 0,5 л на выбор (Coca-Cola, Fanta, Sprite)" }),
  product("hot-dog-cheddar", "Hot-Dog Cheddar", "Хот-дог с чеддером", 60, cheddarHotDog, { ro: "Chiflă, crenvurșcă porc-vită, cheddar, sos, ceapă prăjită", ru: "Булочка, сосиска из свинины и говядины, чеддер, соус, жареный лук" }, undefined, "contain"),
  product("inele-calamar", "Inele de Calamar (8 buc.)", "Кольца кальмара (8 шт.)", 70, ineleCalamar, { ro: "Inele de calamar (8 buc.) + sos", ru: "Кольца кальмара (8 шт.) + соус" }),
  product("nuggets-pui", "Nuggets de Pui 220g", "Куриные наггетсы 220 г", 75, nuggets, { ro: "Nuggets de pui 220g + sos", ru: "Куриные наггетсы 220 г + соус" }),
  product("cheese-sticks", "Cheese Sticks 170g", "Сырные палочки 170 г", 60, cheeseSticks, { ro: "Cheese Sticks 170g + sos", ru: "Сырные палочки 170 г + соус" }),
  product("cartofi-pai", "Cartofi Pai 130g", "Картофель фри 130 г", 35, cartofiPai, { ro: "Cartofi pai 130g + sos", ru: "Картофель фри 130 г + соус" }),
  product("aripioare-crocante", "Aripioare Crocante 220g", "Хрустящие крылышки 220 г", 75, aripioareCrocante, { ro: "Aripioare crocante 220g + sos", ru: "Хрустящие крылышки 220 г + соус" }, tag("Croki", "Croki")),
  product("bbq-wings", "BBQ Wings 220g", "Крылышки BBQ 220 г", 75, aripioareBbq, { ro: "BBQ Wings 220g + sos", ru: "Крылышки BBQ 220 г + соус" }),
  product("chilli-wings", "Chilli Wings 220g", "Крылышки чили 220 г", 75, aripioareChilli, { ro: "Chilli Wings 220g + sos", ru: "Крылышки чили 220 г + соус" }, tag("Picant", "Острое")),
  product("inele-ceapa", "Inele de Ceapă 120g", "Луковые кольца 120 г", 45, ineleCeapa, { ro: "Inele de ceapă 120g + sos", ru: "Луковые кольца 120 г + соус" }),
  product("sos-bbq", "Sos BBQ", "Соус BBQ", 12, bbq, descriptions.sauce),
  product("ketchup", "Ketchup", "Кетчуп", 10, ketchup, descriptions.sauce),
  product("maioneza", "Maioneză", "Майонез", 10, maioneza, descriptions.sauce),
  product("platou-porc", "Platou de Porc", "Сет со свининой", 175, platouPorc, descriptions.tray),
  product("platou-pui", "Platou de Pui", "Куриный сет", 165, platouPui, descriptions.tray),
  product("platou-mici", "Platou cu Mici", "Сет с мититеями", 180, platouMici, descriptions.tray),
  product("platou-nuggets", "Platou Nuggets", "Сет с наггетсами", 150, platouNuggets, descriptions.tray),
  product("sos-burger", "Sos Burger", "Бургер-соус", 12, sosBurger, descriptions.sauce),
  product("sos-usturoi", "Sos de Usturoi", "Чесночный соус", 12, sosUsturoi, descriptions.sauce),
];

const saladItems: MenuProduct[] = [
  product("salata-caesar", "Salată Caesar", "Салат Цезарь", 90, caesarSalat, { ro: "iceberg, carne pui, parmezan, roșii, pesmeți, ouă", ru: "Салат айсберг, куриное мясо, пармезан, помидоры, сухарики, яйца" }, tag("Fresh", "Свежий")),
  product("salata-greceasca", "Salată Grecească", "Греческий салат", 75, greekSalat, { ro: "roșii, castraveți, ardei dulce, ceapă, brânză feta, ulei de măsline", ru: "Помидоры, огурцы, сладкий перец, лук, сыр фета, оливковое масло" }, tag("Fresh", "Свежий")),
];

const drinkItems: MenuProduct[] = [
  { id: "coca-cola", name: { ro: "Coca-Cola 0.5l", ru: "Coca-Cola 0,5 л" }, description: { ro: "Băutură răcoritoare carbogazoasă Coca-Cola 0.5l", ru: "Газированный прохладительный напиток Coca-Cola 0,5 л" }, price: 25 },
  { id: "fanta", name: { ro: "Fanta 0.5l", ru: "Fanta 0,5 л" }, description: { ro: "Băutură răcoritoare carbogazoasă Fanta 0.5l", ru: "Газированный прохладительный напиток Fanta 0,5 л" }, price: 25 },
  { id: "sprite", name: { ro: "Sprite 0.5l", ru: "Sprite 0,5 л" }, description: { ro: "Băutură răcoritoare carbogazoasă Sprite 0.5l", ru: "Газированный прохладительный напиток Sprite 0,5 л" }, price: 25 },
  { id: "dorna", name: { ro: "Dorna 0.5l", ru: "Dorna 0,5 л" }, description: { ro: "Apă Dorna 0.5l", ru: "Вода Dorna 0,5 л" }, price: 15 },
  { id: "fuze-tea", name: { ro: "Fuze Tea 0.5l", ru: "Fuze Tea 0,5 л" }, description: { ro: "Ceai rece Fuze Tea 0.5l", ru: "Холодный чай Fuze Tea 0,5 л" }, price: 25 },
  { id: "efes-pilsner", name: { ro: "Efes Pilsner 0.5l", ru: "Efes Pilsner 0,5 л" }, description: { ro: "Bere Efes Pilsner 0.5l", ru: "Пиво Efes Pilsner 0,5 л" }, price: 45 },
  { id: "efes-blanche", name: { ro: "Efes Blanche 0.5l", ru: "Efes Blanche 0,5 л" }, description: { ro: "Bere Efes Blanche 0.5l", ru: "Пиво Efes Blanche 0,5 л" }, price: 45 },
  { id: "kozel-blonda", name: { ro: "Kozel Blondă 0.5l", ru: "Kozel светлое 0,5 л" }, description: { ro: "Bere blondă Kozel 0.5l", ru: "Светлое пиво Kozel 0,5 л" }, price: 45 },
  { id: "corona-extra", name: { ro: "Corona Extra 0.33l", ru: "Corona Extra 0,33 л" }, description: { ro: "Bere Corona Extra 0.33l", ru: "Пиво Corona Extra 0,33 л" }, price: 60 },
];

export const menuCategories: MenuCategory[] = [
  { id: "kebab", number: "01", name: { ro: "Kebab", ru: "Кебаб" }, note: { ro: "Kebaburi pregătite proaspăt, pentru orice poftă.", ru: "Свежие кебабы на любой вкус." }, items: kebabItems },
  { id: "burger", number: "02", name: { ro: "Burger", ru: "Бургеры" }, note: { ro: "Burgeri generoși, făcuți la comandă.", ru: "Сытные бургеры, приготовленные на заказ." }, items: burgerItems },
  { id: "kebab-menu", number: "03", name: { ro: "Kebab Menu", ru: "Кебаб-меню" }, note: { ro: "Combinații complete cu kebabul preferat.", ru: "Полные наборы с любимым кебабом." }, items: kebabMenuItems },
  { id: "burger-menu", number: "04", name: { ro: "Burger Menu", ru: "Бургер-меню" }, note: { ro: "Burgerul preferat într-o combinație completă.", ru: "Любимый бургер в составе полного набора." }, items: burgerMenuItems },
  { id: "croki-menu", number: "05", name: { ro: "Croki Menu", ru: "Croki-меню" }, note: { ro: "Gustări, hot dog, sosuri și platouri generoase.", ru: "Закуски, хот-доги, соусы и большие сеты." }, items: crokiItems },
  { id: "salate", number: "06", name: { ro: "Salate", ru: "Салаты" }, note: { ro: "Alegeri proaspete și colorate.", ru: "Свежие и яркие блюда." }, items: saladItems },
  { id: "bauturi", number: "07", name: { ro: "Băuturi Răcoritoare", ru: "Напитки" }, note: { ro: "Reci, exact cum trebuie lângă ceva fierbinte.", ru: "Холодные — идеальная пара для горячих блюд." }, items: drinkItems },
];
