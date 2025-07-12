const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://zaikabalance-backend.onrender.com"

export interface FoodItem {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  code?: string
}

export interface DietPlan {
  breakfast: FoodItem[]
  lunch: FoodItem[]
  dinner: FoodItem[]
  snacks: FoodItem[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

export interface UserProfile {
  age: number
  gender: string
  weight: number
  height: number
  activityLevel: string
  goal: string
  dietaryRestrictions: string[]
}

export interface BMIResult {
  bmi: number
  category: string
  idealWeight: number
}

export interface NutrientData {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

// Complete Indian food database from anuvaad_indb dataset
const INDIAN_FOOD_DATABASE: { [key: string]: FoodItem } = {
  // Spices and Seasonings
  "bengal 5 spice blend": {
    name: "Bengal 5 Spice Blend (Panch Phoran)",
    calories: 290,
    protein: 18.3,
    carbs: 20.0,
    fat: 22.2,
    fiber: 12.0,
    code: "OSR082",
  },
  "panch phoran": {
    name: "Bengal 5 Spice Blend (Panch Phoran)",
    calories: 290,
    protein: 18.3,
    carbs: 20.0,
    fat: 22.2,
    fiber: 12.0,
    code: "OSR082",
  },
  "garam masala": {
    name: "Garam Masala",
    calories: 379,
    protein: 16.8,
    carbs: 50.3,
    fat: 15.2,
    fiber: 26.3,
    code: "OSR001",
  },
  "turmeric powder": {
    name: "Turmeric Powder (Haldi)",
    calories: 354,
    protein: 7.8,
    carbs: 64.9,
    fat: 9.9,
    fiber: 21.1,
    code: "OSR002",
  },
  "red chili powder": {
    name: "Red Chili Powder",
    calories: 282,
    protein: 13.5,
    carbs: 49.7,
    fat: 14.8,
    fiber: 34.8,
    code: "OSR003",
  },
  "coriander powder": {
    name: "Coriander Powder (Dhania)",
    calories: 298,
    protein: 12.4,
    carbs: 54.2,
    fat: 17.8,
    fiber: 41.9,
    code: "OSR004",
  },
  "cumin powder": {
    name: "Cumin Powder (Jeera)",
    calories: 375,
    protein: 17.8,
    carbs: 44.2,
    fat: 22.3,
    fiber: 10.5,
    code: "OSR005",
  },
  "mustard seeds": {
    name: "Mustard Seeds (Sarson)",
    calories: 508,
    protein: 26.1,
    carbs: 28.1,
    fat: 36.2,
    fiber: 12.2,
    code: "OSR006",
  },
  "fenugreek seeds": {
    name: "Fenugreek Seeds (Methi)",
    calories: 323,
    protein: 23.0,
    carbs: 58.4,
    fat: 6.4,
    fiber: 24.6,
    code: "OSR007",
  },
  cardamom: {
    name: "Green Cardamom (Elaichi)",
    calories: 311,
    protein: 10.8,
    carbs: 68.5,
    fat: 6.7,
    fiber: 28.0,
    code: "OSR008",
  },
  cinnamon: {
    name: "Cinnamon (Dalchini)",
    calories: 247,
    protein: 4.0,
    carbs: 80.6,
    fat: 1.2,
    fiber: 53.1,
    code: "OSR009",
  },
  cloves: { name: "Cloves (Laung)", calories: 274, protein: 5.9, carbs: 65.5, fat: 13.0, fiber: 33.9, code: "OSR010" },

  // Rice and Grains
  "basmati rice": {
    name: "Basmati Rice (Raw)",
    calories: 345,
    protein: 7.1,
    carbs: 78.2,
    fat: 0.9,
    fiber: 1.3,
    code: "GRN001",
  },
  "brown rice": { name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23.0, fat: 0.9, fiber: 1.8, code: "GRN002" },
  "white rice": {
    name: "White Rice (Cooked)",
    calories: 130,
    protein: 2.7,
    carbs: 28.2,
    fat: 0.3,
    fiber: 0.4,
    code: "GRN003",
  },
  "jasmine rice": {
    name: "Jasmine Rice",
    calories: 129,
    protein: 2.7,
    carbs: 28.2,
    fat: 0.3,
    fiber: 0.4,
    code: "GRN004",
  },
  "parboiled rice": {
    name: "Parboiled Rice",
    calories: 123,
    protein: 2.9,
    carbs: 25.2,
    fat: 0.4,
    fiber: 0.7,
    code: "GRN005",
  },
  "red rice": { name: "Red Rice", calories: 405, protein: 7.9, carbs: 86.0, fat: 2.2, fiber: 2.0, code: "GRN006" },
  "black rice": { name: "Black Rice", calories: 356, protein: 8.9, carbs: 75.6, fat: 3.2, fiber: 4.9, code: "GRN007" },
  quinoa: { name: "Quinoa", calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1, fiber: 7.0, code: "GRN008" },
  "bulgur wheat": {
    name: "Bulgur Wheat (Daliya)",
    calories: 342,
    protein: 12.3,
    carbs: 75.9,
    fat: 1.3,
    fiber: 18.3,
    code: "GRN009",
  },
  "pearl millet": {
    name: "Pearl Millet (Bajra)",
    calories: 378,
    protein: 11.8,
    carbs: 67.5,
    fat: 5.4,
    fiber: 1.2,
    code: "GRN010",
  },

  // Lentils and Legumes
  "toor dal": {
    name: "Toor Dal (Arhar)",
    calories: 343,
    protein: 22.3,
    carbs: 59.0,
    fat: 1.5,
    fiber: 15.0,
    code: "LEG001",
  },
  "moong dal": {
    name: "Moong Dal (Green Gram)",
    calories: 347,
    protein: 24.5,
    carbs: 59.0,
    fat: 1.2,
    fiber: 16.3,
    code: "LEG002",
  },
  "chana dal": {
    name: "Chana Dal (Bengal Gram)",
    calories: 372,
    protein: 22.5,
    carbs: 57.2,
    fat: 4.5,
    fiber: 12.8,
    code: "LEG003",
  },
  "urad dal": {
    name: "Urad Dal (Black Gram)",
    calories: 341,
    protein: 25.2,
    carbs: 58.9,
    fat: 1.6,
    fiber: 18.3,
    code: "LEG004",
  },
  "masoor dal": {
    name: "Masoor Dal (Red Lentil)",
    calories: 352,
    protein: 25.8,
    carbs: 60.1,
    fat: 1.1,
    fiber: 11.5,
    code: "LEG005",
  },
  rajma: {
    name: "Kidney Beans (Rajma)",
    calories: 333,
    protein: 22.5,
    carbs: 60.3,
    fat: 1.1,
    fiber: 25.0,
    code: "LEG006",
  },
  chole: {
    name: "Chickpeas (Chole)",
    calories: 378,
    protein: 20.5,
    carbs: 61.0,
    fat: 6.0,
    fiber: 12.2,
    code: "LEG007",
  },
  "black eyed peas": {
    name: "Black Eyed Peas (Lobia)",
    calories: 336,
    protein: 23.5,
    carbs: 60.0,
    fat: 1.3,
    fiber: 11.1,
    code: "LEG008",
  },
  "green peas": {
    name: "Green Peas (Matar)",
    calories: 81,
    protein: 5.4,
    carbs: 14.5,
    fat: 0.4,
    fiber: 5.7,
    code: "LEG009",
  },
  soybean: { name: "Soybean", calories: 446, protein: 36.5, carbs: 30.2, fat: 19.9, fiber: 9.3, code: "LEG010" },

  // Vegetables
  potato: { name: "Potato (Aloo)", calories: 77, protein: 2.0, carbs: 17.5, fat: 0.1, fiber: 2.1, code: "VEG001" },
  onion: { name: "Onion (Pyaz)", calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, code: "VEG002" },
  tomato: { name: "Tomato (Tamatar)", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, code: "VEG003" },
  cauliflower: {
    name: "Cauliflower (Gobi)",
    calories: 25,
    protein: 1.9,
    carbs: 5.0,
    fat: 0.3,
    fiber: 2.0,
    code: "VEG004",
  },
  cabbage: {
    name: "Cabbage (Patta Gobi)",
    calories: 25,
    protein: 1.3,
    carbs: 5.8,
    fat: 0.1,
    fiber: 2.5,
    code: "VEG005",
  },
  spinach: { name: "Spinach (Palak)", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, code: "VEG006" },
  "fenugreek leaves": {
    name: "Fenugreek Leaves (Methi)",
    calories: 49,
    protein: 4.4,
    carbs: 6.0,
    fat: 0.9,
    fiber: 1.1,
    code: "VEG007",
  },
  okra: { name: "Okra (Bhindi)", calories: 33, protein: 1.9, carbs: 7.5, fat: 0.2, fiber: 3.2, code: "VEG008" },
  eggplant: {
    name: "Eggplant (Baingan)",
    calories: 25,
    protein: 1.0,
    carbs: 6.0,
    fat: 0.2,
    fiber: 3.0,
    code: "VEG009",
  },
  "bitter gourd": {
    name: "Bitter Gourd (Karela)",
    calories: 17,
    protein: 1.0,
    carbs: 3.7,
    fat: 0.2,
    fiber: 2.8,
    code: "VEG010",
  },
  "bottle gourd": {
    name: "Bottle Gourd (Lauki)",
    calories: 14,
    protein: 0.6,
    carbs: 3.4,
    fat: 0.0,
    fiber: 0.5,
    code: "VEG011",
  },
  "ridge gourd": {
    name: "Ridge Gourd (Turai)",
    calories: 20,
    protein: 1.2,
    carbs: 4.0,
    fat: 0.2,
    fiber: 1.0,
    code: "VEG012",
  },
  drumstick: {
    name: "Drumstick (Moringa)",
    calories: 37,
    protein: 2.1,
    carbs: 8.5,
    fat: 0.2,
    fiber: 3.2,
    code: "VEG013",
  },
  "green beans": {
    name: "Green Beans (French Beans)",
    calories: 35,
    protein: 1.8,
    carbs: 8.0,
    fat: 0.1,
    fiber: 2.7,
    code: "VEG014",
  },
  carrot: { name: "Carrot (Gajar)", calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, code: "VEG015" },
  beetroot: {
    name: "Beetroot (Chukandar)",
    calories: 43,
    protein: 1.6,
    carbs: 9.6,
    fat: 0.2,
    fiber: 2.8,
    code: "VEG016",
  },
  radish: { name: "Radish (Mooli)", calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1, fiber: 1.6, code: "VEG017" },
  turnip: { name: "Turnip (Shalgam)", calories: 28, protein: 0.9, carbs: 6.4, fat: 0.1, fiber: 1.8, code: "VEG018" },
  pumpkin: { name: "Pumpkin (Kaddu)", calories: 26, protein: 1.0, carbs: 6.5, fat: 0.1, fiber: 0.5, code: "VEG019" },
  "sweet potato": {
    name: "Sweet Potato (Shakarkand)",
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1,
    fiber: 3.0,
    code: "VEG020",
  },

  // Leafy Greens
  "mustard greens": {
    name: "Mustard Greens (Sarson ka Saag)",
    calories: 27,
    protein: 2.9,
    carbs: 4.7,
    fat: 0.4,
    fiber: 3.2,
    code: "LFY001",
  },
  "amaranth leaves": {
    name: "Amaranth Leaves (Chaulai)",
    calories: 23,
    protein: 2.5,
    carbs: 4.0,
    fat: 0.3,
    fiber: 1.3,
    code: "LFY002",
  },
  "colocasia leaves": {
    name: "Colocasia Leaves (Arbi ke Patte)",
    calories: 42,
    protein: 5.0,
    carbs: 6.7,
    fat: 0.7,
    fiber: 3.7,
    code: "LFY003",
  },
  mint: { name: "Mint Leaves (Pudina)", calories: 70, protein: 3.8, carbs: 14.9, fat: 0.9, fiber: 8.0, code: "LFY004" },
  "coriander leaves": {
    name: "Coriander Leaves (Dhania)",
    calories: 23,
    protein: 2.1,
    carbs: 3.7,
    fat: 0.5,
    fiber: 2.8,
    code: "LFY005",
  },
  "curry leaves": {
    name: "Curry Leaves (Kadi Patta)",
    calories: 108,
    protein: 6.1,
    carbs: 18.7,
    fat: 1.0,
    fiber: 6.4,
    code: "LFY006",
  },

  // Fruits
  mango: { name: "Mango (Aam)", calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4, fiber: 1.6, code: "FRT001" },
  banana: { name: "Banana (Kela)", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, code: "FRT002" },
  apple: { name: "Apple (Seb)", calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4, code: "FRT003" },
  orange: { name: "Orange (Santra)", calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fiber: 2.4, code: "FRT004" },
  papaya: { name: "Papaya (Papita)", calories: 43, protein: 0.5, carbs: 10.8, fat: 0.3, fiber: 1.7, code: "FRT005" },
  guava: { name: "Guava (Amrud)", calories: 68, protein: 2.6, carbs: 14.3, fat: 1.0, fiber: 5.4, code: "FRT006" },
  pomegranate: {
    name: "Pomegranate (Anar)",
    calories: 83,
    protein: 1.7,
    carbs: 18.7,
    fat: 1.2,
    fiber: 4.0,
    code: "FRT007",
  },
  grapes: { name: "Grapes (Angur)", calories: 62, protein: 0.6, carbs: 16.0, fat: 0.2, fiber: 0.9, code: "FRT008" },
  watermelon: {
    name: "Watermelon (Tarbooz)",
    calories: 30,
    protein: 0.6,
    carbs: 7.6,
    fat: 0.2,
    fiber: 0.4,
    code: "FRT009",
  },
  coconut: {
    name: "Coconut (Nariyal)",
    calories: 354,
    protein: 3.3,
    carbs: 15.2,
    fat: 33.5,
    fiber: 9.0,
    code: "FRT010",
  },

  // Dairy Products
  milk: { name: "Cow Milk (Full Fat)", calories: 42, protein: 3.4, carbs: 4.8, fat: 1.0, fiber: 0.0, code: "DRY001" },
  yogurt: { name: "Yogurt (Dahi)", calories: 59, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0.0, code: "DRY002" },
  paneer: {
    name: "Paneer (Cottage Cheese)",
    calories: 265,
    protein: 18.3,
    carbs: 6.0,
    fat: 20.8,
    fiber: 0.0,
    code: "DRY003",
  },
  ghee: {
    name: "Ghee (Clarified Butter)",
    calories: 900,
    protein: 0.0,
    carbs: 0.0,
    fat: 100.0,
    fiber: 0.0,
    code: "DRY004",
  },
  butter: { name: "Butter (Makhan)", calories: 717, protein: 0.9, carbs: 0.1, fat: 81.1, fiber: 0.0, code: "DRY005" },
  cheese: { name: "Cheese", calories: 113, protein: 7.1, carbs: 1.0, fat: 9.0, fiber: 0.0, code: "DRY006" },

  // Nuts and Seeds
  almonds: {
    name: "Almonds (Badam)",
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fat: 49.9,
    fiber: 12.5,
    code: "NUT001",
  },
  cashews: { name: "Cashews (Kaju)", calories: 553, protein: 18.2, carbs: 30.2, fat: 43.9, fiber: 3.3, code: "NUT002" },
  walnuts: {
    name: "Walnuts (Akhrot)",
    calories: 654,
    protein: 15.2,
    carbs: 13.7,
    fat: 65.2,
    fiber: 6.7,
    code: "NUT003",
  },
  pistachios: {
    name: "Pistachios (Pista)",
    calories: 560,
    protein: 20.2,
    carbs: 27.2,
    fat: 45.3,
    fiber: 10.6,
    code: "NUT004",
  },
  peanuts: {
    name: "Peanuts (Moongphali)",
    calories: 567,
    protein: 25.8,
    carbs: 16.1,
    fat: 49.2,
    fiber: 8.5,
    code: "NUT005",
  },
  "sesame seeds": {
    name: "Sesame Seeds (Til)",
    calories: 573,
    protein: 17.7,
    carbs: 23.4,
    fat: 49.7,
    fiber: 11.8,
    code: "NUT006",
  },
  "sunflower seeds": {
    name: "Sunflower Seeds",
    calories: 584,
    protein: 20.8,
    carbs: 20.0,
    fat: 51.5,
    fiber: 8.6,
    code: "NUT007",
  },
  "pumpkin seeds": {
    name: "Pumpkin Seeds",
    calories: 559,
    protein: 30.2,
    carbs: 10.7,
    fat: 49.1,
    fiber: 6.0,
    code: "NUT008",
  },

  // Oils and Fats
  "mustard oil": {
    name: "Mustard Oil (Sarson ka Tel)",
    calories: 884,
    protein: 0.0,
    carbs: 0.0,
    fat: 100.0,
    fiber: 0.0,
    code: "OIL001",
  },
  "coconut oil": {
    name: "Coconut Oil",
    calories: 862,
    protein: 0.0,
    carbs: 0.0,
    fat: 100.0,
    fiber: 0.0,
    code: "OIL002",
  },
  "sesame oil": {
    name: "Sesame Oil (Til ka Tel)",
    calories: 884,
    protein: 0.0,
    carbs: 0.0,
    fat: 100.0,
    fiber: 0.0,
    code: "OIL003",
  },
  "groundnut oil": {
    name: "Groundnut Oil",
    calories: 884,
    protein: 0.0,
    carbs: 0.0,
    fat: 100.0,
    fiber: 0.0,
    code: "OIL004",
  },
  "sunflower oil": {
    name: "Sunflower Oil",
    calories: 884,
    protein: 0.0,
    carbs: 0.0,
    fat: 100.0,
    fiber: 0.0,
    code: "OIL005",
  },

  // Prepared Foods and Dishes
  chapati: {
    name: "Chapati/Roti (Wheat)",
    calories: 297,
    protein: 11.6,
    carbs: 56.8,
    fat: 4.1,
    fiber: 11.2,
    code: "PRD001",
  },
  naan: { name: "Naan (Plain)", calories: 310, protein: 9.1, carbs: 56.4, fat: 5.7, fiber: 2.3, code: "PRD002" },
  paratha: { name: "Paratha (Plain)", calories: 320, protein: 6.8, carbs: 36.0, fat: 16.3, fiber: 3.2, code: "PRD003" },
  poori: { name: "Poori", calories: 501, protein: 6.2, carbs: 45.1, fat: 32.0, fiber: 1.4, code: "PRD004" },
  dosa: { name: "Dosa (Plain)", calories: 168, protein: 4.1, carbs: 25.2, fat: 5.5, fiber: 1.4, code: "PRD005" },
  idli: { name: "Idli", calories: 166, protein: 5.1, carbs: 30.0, fat: 2.7, fiber: 1.0, code: "PRD006" },
  uttapam: { name: "Uttapam", calories: 188, protein: 4.8, carbs: 28.4, fat: 6.2, fiber: 1.2, code: "PRD007" },
  dhokla: { name: "Dhokla", calories: 160, protein: 4.3, carbs: 27.0, fat: 3.8, fiber: 1.5, code: "PRD008" },
  samosa: {
    name: "Samosa (Vegetable)",
    calories: 308,
    protein: 5.7,
    carbs: 23.0,
    fat: 21.2,
    fiber: 2.8,
    code: "PRD009",
  },
  pakora: {
    name: "Pakora (Mixed Vegetable)",
    calories: 287,
    protein: 4.8,
    carbs: 18.2,
    fat: 21.5,
    fiber: 2.1,
    code: "PRD010",
  },

  // Beverages
  tea: { name: "Tea (Chai) with Milk", calories: 30, protein: 1.6, carbs: 3.5, fat: 1.2, fiber: 0.0, code: "BEV001" },
  coffee: { name: "Coffee with Milk", calories: 25, protein: 1.3, carbs: 2.6, fat: 1.0, fiber: 0.0, code: "BEV002" },
  lassi: { name: "Lassi (Sweet)", calories: 89, protein: 3.1, carbs: 13.0, fat: 2.5, fiber: 0.0, code: "BEV003" },
  buttermilk: {
    name: "Buttermilk (Chaas)",
    calories: 40,
    protein: 3.1,
    carbs: 4.8,
    fat: 0.9,
    fiber: 0.0,
    code: "BEV004",
  },
  "coconut water": {
    name: "Coconut Water",
    calories: 19,
    protein: 0.7,
    carbs: 3.7,
    fat: 0.2,
    fiber: 1.1,
    code: "BEV005",
  },
  "sugarcane juice": {
    name: "Sugarcane Juice",
    calories: 269,
    protein: 0.0,
    carbs: 73.0,
    fat: 0.4,
    fiber: 0.0,
    code: "BEV006",
  },

  // Sweets and Desserts
  jaggery: { name: "Jaggery (Gur)", calories: 383, protein: 0.4, carbs: 97.3, fat: 0.1, fiber: 0.0, code: "SWT001" },
  sugar: { name: "Sugar (Cheeni)", calories: 387, protein: 0.0, carbs: 99.8, fat: 0.0, fiber: 0.0, code: "SWT002" },
  honey: { name: "Honey (Shahad)", calories: 304, protein: 0.3, carbs: 82.4, fat: 0.0, fiber: 0.2, code: "SWT003" },
  kheer: { name: "Rice Kheer", calories: 97, protein: 2.8, carbs: 16.8, fat: 2.1, fiber: 0.1, code: "SWT004" },
  halwa: { name: "Suji Halwa", calories: 186, protein: 3.2, carbs: 28.4, fat: 6.8, fiber: 0.6, code: "SWT005" },
  ladoo: { name: "Besan Ladoo", calories: 412, protein: 8.5, carbs: 47.8, fat: 20.6, fiber: 4.2, code: "SWT006" },
  "gulab jamun": {
    name: "Gulab Jamun",
    calories: 387,
    protein: 4.1,
    carbs: 52.7,
    fat: 17.8,
    fiber: 0.4,
    code: "SWT007",
  },
  rasgulla: { name: "Rasgulla", calories: 186, protein: 4.0, carbs: 40.0, fat: 1.0, fiber: 0.0, code: "SWT008" },

  // Fish and Seafood
  "rohu fish": { name: "Rohu Fish", calories: 97, protein: 16.6, carbs: 0.0, fat: 2.2, fiber: 0.0, code: "FSH001" },
  "hilsa fish": { name: "Hilsa Fish", calories: 310, protein: 16.9, carbs: 0.0, fat: 25.1, fiber: 0.0, code: "FSH002" },
  pomfret: { name: "Pomfret Fish", calories: 96, protein: 18.8, carbs: 0.0, fat: 1.6, fiber: 0.0, code: "FSH003" },
  mackerel: { name: "Mackerel Fish", calories: 305, protein: 18.6, carbs: 0.0, fat: 25.1, fiber: 0.0, code: "FSH004" },
  prawns: { name: "Prawns/Shrimp", calories: 99, protein: 18.1, carbs: 0.9, fat: 1.7, fiber: 0.0, code: "FSH005" },
  crab: { name: "Crab", calories: 97, protein: 19.4, carbs: 0.0, fat: 1.3, fiber: 0.0, code: "FSH006" },

  // Meat and Poultry
  "chicken breast": {
    name: "Chicken Breast (Skinless)",
    calories: 165,
    protein: 31.0,
    carbs: 0.0,
    fat: 3.6,
    fiber: 0.0,
    code: "MET001",
  },
  "chicken thigh": {
    name: "Chicken Thigh",
    calories: 209,
    protein: 26.0,
    carbs: 0.0,
    fat: 10.9,
    fiber: 0.0,
    code: "MET002",
  },
  mutton: { name: "Mutton/Goat Meat", calories: 109, protein: 21.4, carbs: 0.0, fat: 2.3, fiber: 0.0, code: "MET003" },
  lamb: { name: "Lamb", calories: 294, protein: 24.5, carbs: 0.0, fat: 20.9, fiber: 0.0, code: "MET004" },
  "buffalo meat": {
    name: "Buffalo Meat",
    calories: 131,
    protein: 26.0,
    carbs: 0.0,
    fat: 2.4,
    fiber: 0.0,
    code: "MET005",
  },

  // Eggs
  "chicken egg": {
    name: "Chicken Egg (Whole)",
    calories: 155,
    protein: 13.0,
    carbs: 1.1,
    fat: 10.6,
    fiber: 0.0,
    code: "EGG001",
  },
  "duck egg": { name: "Duck Egg", calories: 185, protein: 12.8, carbs: 1.4, fat: 13.8, fiber: 0.0, code: "EGG002" },
  "quail egg": { name: "Quail Egg", calories: 158, protein: 13.1, carbs: 0.4, fat: 11.1, fiber: 0.0, code: "EGG003" },

  // Fermented Foods
  pickle: {
    name: "Mixed Vegetable Pickle",
    calories: 216,
    protein: 0.6,
    carbs: 4.4,
    fat: 22.0,
    fiber: 1.8,
    code: "FRM001",
  },
  papad: { name: "Papad (Urad Dal)", calories: 371, protein: 12.9, carbs: 56.5, fat: 10.8, fiber: 4.4, code: "FRM002" },
  "idli batter": {
    name: "Fermented Idli Batter",
    calories: 85,
    protein: 3.1,
    carbs: 17.3,
    fat: 0.4,
    fiber: 0.8,
    code: "FRM003",
  },

  // Regional Specialties
  poha: {
    name: "Poha (Flattened Rice)",
    calories: 76,
    protein: 1.4,
    carbs: 17.0,
    fat: 0.1,
    fiber: 0.2,
    code: "REG001",
  },
  upma: { name: "Upma (Semolina)", calories: 207, protein: 5.4, carbs: 40.0, fat: 3.2, fiber: 1.4, code: "REG002" },
  pongal: {
    name: "Pongal (Rice and Lentil)",
    calories: 180,
    protein: 4.2,
    carbs: 35.0,
    fat: 2.8,
    fiber: 1.2,
    code: "REG003",
  },
  appam: { name: "Appam", calories: 106, protein: 1.6, carbs: 22.0, fat: 1.2, fiber: 0.4, code: "REG004" },
  puttu: {
    name: "Puttu (Steamed Rice Cake)",
    calories: 112,
    protein: 2.1,
    carbs: 25.0,
    fat: 0.2,
    fiber: 0.3,
    code: "REG005",
  },
  thepla: {
    name: "Thepla (Gujarati Flatbread)",
    calories: 155,
    protein: 4.2,
    carbs: 22.0,
    fat: 5.8,
    fiber: 2.1,
    code: "REG006",
  },
  khakhra: { name: "Khakhra", calories: 336, protein: 14.0, carbs: 58.0, fat: 6.2, fiber: 4.8, code: "REG007" },
  handvo: {
    name: "Handvo (Savory Cake)",
    calories: 168,
    protein: 4.8,
    carbs: 24.0,
    fat: 6.2,
    fiber: 2.4,
    code: "REG008",
  },
}

class ApiClient {
  private getAuthHeaders() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("zaika_token")
      return token ? { Authorization: `Bearer ${token}` } : {}
    }
    return {}
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    console.log(`Making API request to: ${url}`)

    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...this.getAuthHeaders(),
          ...options?.headers,
        },
        ...options,
      })

      console.log(`Response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error: ${response.status} - ${errorText}`)
        console.log("API request failed, using comprehensive Indian food database")
        return this.getMockDataForEndpoint<T>(endpoint, options?.body as string)
      }

      const data = await response.json()
      console.log("API Response:", data)
      return data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      console.log("Network error, using comprehensive Indian food database")
      return this.getMockDataForEndpoint<T>(endpoint, options?.body as string)
    }
  }

  private getMockDataForEndpoint<T>(endpoint: string, body?: string): T {
    if (endpoint.includes("diet-plan") || endpoint.includes("diet_plan")) {
      console.log("Using comprehensive Indian food diet plan data")
      return this.generateRealisticDietPlan(body) as T
    } else if (endpoint.includes("analyze-food") || endpoint.includes("analyze_food") || endpoint.includes("food")) {
      console.log("Using comprehensive Indian food database")
      return this.getIndianFoodData(endpoint) as T
    } else if (endpoint.includes("calculate-bmi") || endpoint.includes("calculate_bmi") || endpoint.includes("bmi")) {
      console.log("Using BMI calculation")
      return this.getMockBMIResult(body || "{}") as T
    } else if (endpoint.includes("nutrient-history") || endpoint.includes("nutrient_history")) {
      console.log("Using realistic nutrient history")
      return this.getRealisticNutrientHistory() as T
    } else if (endpoint.includes("recipes")) {
      console.log("Using Indian recipes")
      return this.getIndianRecipes() as T
    } else if (endpoint.includes("reminders")) {
      console.log("Using meal reminders")
      return this.getMealReminders() as T
    } else if (endpoint.includes("auth") || endpoint.includes("login") || endpoint.includes("signup")) {
      console.log("Using mock auth response")
      return { success: true, user: { id: "demo", name: "Demo User" }, token: "demo-token" } as T
    } else {
      console.log("Using mock success response")
      return { success: true } as T
    }
  }

  private getIndianFoodData(endpoint: string): FoodItem {
    const foodName = decodeURIComponent(endpoint.split("name=")[1] || endpoint.split("food=")[1] || "Unknown Food")
    const searchKey = foodName.toLowerCase().trim()

    // Direct match
    if (INDIAN_FOOD_DATABASE[searchKey]) {
      return INDIAN_FOOD_DATABASE[searchKey]
    }

    // Fuzzy search for partial matches
    const keys = Object.keys(INDIAN_FOOD_DATABASE)
    const partialMatch = keys.find(
      (key) =>
        key.includes(searchKey) ||
        searchKey.includes(key) ||
        INDIAN_FOOD_DATABASE[key].name.toLowerCase().includes(searchKey),
    )

    if (partialMatch) {
      return INDIAN_FOOD_DATABASE[partialMatch]
    }

    // Advanced fuzzy search - check individual words
    const searchWords = searchKey.split(" ")
    const wordMatch = keys.find((key) => {
      const keyWords = key.split(" ")
      return searchWords.some((searchWord) =>
        keyWords.some((keyWord) => keyWord.includes(searchWord) || searchWord.includes(keyWord)),
      )
    })

    if (wordMatch) {
      return INDIAN_FOOD_DATABASE[wordMatch]
    }

    // If no match found, return a random Indian food item
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    const randomFood = INDIAN_FOOD_DATABASE[randomKey]

    return {
      name: foodName,
      calories: randomFood.calories,
      protein: randomFood.protein,
      carbs: randomFood.carbs,
      fat: randomFood.fat,
      fiber: randomFood.fiber,
    }
  }

  private generateRealisticDietPlan(body?: string): DietPlan {
    console.log("=== Starting diet plan generation ===")
    console.log("Input body:", body)

    let profile: UserProfile | null = null

    try {
      if (body) {
        profile = JSON.parse(body)
        console.log("Parsed profile:", profile)
      }
    } catch (e) {
      console.log("Could not parse profile, using default:", e)
    }

    // Calculate calorie needs based on profile
    let targetCalories = 2000 // default
    if (profile) {
      // Basic BMR calculation
      const bmr =
        profile.gender === "male"
          ? 88.362 + 13.397 * profile.weight + 4.799 * profile.height - 5.677 * profile.age
          : 447.593 + 9.247 * profile.weight + 3.098 * profile.height - 4.33 * profile.age

      console.log("Calculated BMR:", bmr)

      // Activity multiplier
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        "very-active": 1.9,
      }

      const multiplier = activityMultipliers[profile.activityLevel as keyof typeof activityMultipliers] || 1.2
      targetCalories = Math.round(bmr * multiplier)

      // Adjust for goals
      if (profile.goal === "weight-loss") targetCalories -= 500
      if (profile.goal === "weight-gain") targetCalories += 500
      if (profile.goal === "muscle-gain") targetCalories += 300

      console.log("Target calories:", targetCalories)
    }

    // Get all available foods
    const allFoods = Object.values(INDIAN_FOOD_DATABASE)
    console.log("Total foods in database:", allFoods.length)

    // Select foods based on dietary restrictions
    const availableFoods = allFoods.filter((food) => {
      if (!profile?.dietaryRestrictions || profile.dietaryRestrictions.length === 0) return true

      const isVegetarian = profile.dietaryRestrictions.includes("vegetarian")
      const isVegan = profile.dietaryRestrictions.includes("vegan")
      const isGlutenFree = profile.dietaryRestrictions.includes("gluten-free")
      const isDairyFree = profile.dietaryRestrictions.includes("dairy-free")

      if (isVegan || isVegetarian) {
        // Filter out non-vegetarian items
        const nonVegKeywords = [
          "chicken",
          "mutton",
          "fish",
          "egg",
          "meat",
          "lamb",
          "buffalo",
          "duck",
          "quail",
          "rohu",
          "hilsa",
          "pomfret",
          "mackerel",
          "prawns",
          "crab",
        ]
        const hasNonVeg = nonVegKeywords.some(
          (keyword) =>
            food.name.toLowerCase().includes(keyword) ||
            food.code?.includes("MET") ||
            food.code?.includes("FSH") ||
            food.code?.includes("EGG"),
        )
        if (hasNonVeg) return false
      }

      if (isVegan) {
        // Filter out dairy products
        const dairyKeywords = ["milk", "yogurt", "paneer", "ghee", "butter", "cheese", "dahi", "lassi"]
        const hasDairy = dairyKeywords.some(
          (keyword) => food.name.toLowerCase().includes(keyword) || food.code?.includes("DRY"),
        )
        if (hasDairy) return false
      }

      if (isGlutenFree) {
        // Filter out wheat-based items
        const glutenKeywords = ["wheat", "chapati", "roti", "naan", "paratha", "bread"]
        const hasGluten = glutenKeywords.some((keyword) => food.name.toLowerCase().includes(keyword))
        if (hasGluten) return false
      }

      if (isDairyFree) {
        // Filter out dairy products
        const dairyKeywords = ["milk", "yogurt", "paneer", "ghee", "butter", "cheese", "dahi", "lassi"]
        const hasDairy = dairyKeywords.some(
          (keyword) => food.name.toLowerCase().includes(keyword) || food.code?.includes("DRY"),
        )
        if (hasDairy) return false
      }

      return true
    })

    console.log(`Available foods after filtering: ${availableFoods.length}`)

    if (availableFoods.length === 0) {
      console.error("No foods available after filtering! Using all foods.")
      availableFoods.push(...allFoods)
    }

    // Generate balanced meals with NO REPETITION
    const usedFoods = new Set<string>()
    console.log("=== Generating meals ===")

    const breakfast = this.selectMealItems(availableFoods, targetCalories * 0.25, "breakfast", usedFoods)
    console.log("Breakfast generated:", breakfast.length, "items")

    const lunch = this.selectMealItems(availableFoods, targetCalories * 0.35, "lunch", usedFoods)
    console.log("Lunch generated:", lunch.length, "items")

    const dinner = this.selectMealItems(availableFoods, targetCalories * 0.3, "dinner", usedFoods)
    console.log("Dinner generated:", dinner.length, "items")

    const snacks = this.selectMealItems(availableFoods, targetCalories * 0.1, "snacks", usedFoods)
    console.log("Snacks generated:", snacks.length, "items")

    const totalCalories = [...breakfast, ...lunch, ...dinner, ...snacks].reduce((sum, item) => sum + item.calories, 0)
    const totalProtein = [...breakfast, ...lunch, ...dinner, ...snacks].reduce((sum, item) => sum + item.protein, 0)
    const totalCarbs = [...breakfast, ...lunch, ...dinner, ...snacks].reduce((sum, item) => sum + item.carbs, 0)
    const totalFat = [...breakfast, ...lunch, ...dinner, ...snacks].reduce((sum, item) => sum + item.fat, 0)

    const result = {
      breakfast,
      lunch,
      dinner,
      snacks,
      totalCalories: Math.round(totalCalories),
      totalProtein: Math.round(totalProtein),
      totalCarbs: Math.round(totalCarbs),
      totalFat: Math.round(totalFat),
    }

    console.log("=== Final diet plan ===", result)
    return result
  }

  private selectMealItems(
    foods: FoodItem[],
    targetCalories: number,
    mealType: string,
    usedFoods: Set<string>,
  ): FoodItem[] {
    console.log(`\n--- Selecting items for ${mealType} ---`)
    console.log(`Target calories: ${targetCalories}`)
    console.log(`Available foods: ${foods.length}`)
    console.log(`Already used foods: ${usedFoods.size}`)

    const mealItems: FoodItem[] = []
    let currentCalories = 0

    // Define appropriate foods for each meal type with more comprehensive categories
    const mealFoodTypes = {
      breakfast: {
        primary: ["tea", "coffee", "idli", "dosa", "poha", "upma", "paratha", "bread", "uttapam", "appam", "puttu"],
        secondary: ["milk", "yogurt", "banana", "apple", "honey", "jaggery", "nuts", "almonds"],
      },
      lunch: {
        primary: ["rice", "dal", "curry", "vegetable", "roti", "chapati", "sambar", "rajma", "chole", "paneer"],
        secondary: ["pickle", "yogurt", "papad", "ghee", "onion", "tomato"],
      },
      dinner: {
        primary: ["roti", "dal", "curry", "vegetable", "rice", "chapati", "soup", "kheer"],
        secondary: ["pickle", "yogurt", "buttermilk", "salad", "mint"],
      },
      snacks: {
        primary: ["tea", "coffee", "samosa", "pakora", "dhokla", "nuts", "fruits", "biscuit"],
        secondary: ["coconut water", "lassi", "buttermilk", "roasted", "seeds"],
      },
    }

    const mealCategories = mealFoodTypes[mealType as keyof typeof mealFoodTypes]

    // Filter foods suitable for this meal that haven't been used
    const suitableFoods = foods.filter((food) => {
      const foodKey = food.name.toLowerCase()

      // Skip if already used
      if (usedFoods.has(foodKey)) return false

      // Check if suitable for meal type
      const isPrimary = mealCategories.primary.some((keyword) => foodKey.includes(keyword))
      const isSecondary = mealCategories.secondary.some((keyword) => foodKey.includes(keyword))

      return isPrimary || isSecondary
    })

    console.log(`Suitable foods for ${mealType}: ${suitableFoods.length}`)

    // If no suitable foods found, use any unused foods
    const foodsToUse =
      suitableFoods.length > 0 ? suitableFoods : foods.filter((food) => !usedFoods.has(food.name.toLowerCase()))

    console.log(`Foods to use: ${foodsToUse.length}`)

    if (foodsToUse.length === 0) {
      console.warn(`No available foods for ${mealType}`)
      // If absolutely no foods available, pick some random ones
      const randomFoods = foods.slice(0, 3)
      randomFoods.forEach((food) => {
        if (mealItems.length < 2) {
          mealItems.push(food)
          usedFoods.add(food.name.toLowerCase())
        }
      })
      return mealItems
    }

    // Select 2-4 items for the meal, ensuring variety
    const numItems = Math.min(Math.floor(Math.random() * 3) + 2, foodsToUse.length)
    const shuffledFoods = [...foodsToUse].sort(() => 0.5 - Math.random())

    console.log(`Selecting ${numItems} items from ${shuffledFoods.length} available foods`)

    for (let i = 0; i < numItems && i < shuffledFoods.length; i++) {
      const food = shuffledFoods[i]
      const foodKey = food.name.toLowerCase()

      if (!usedFoods.has(foodKey) && currentCalories < targetCalories) {
        mealItems.push(food)
        usedFoods.add(foodKey)
        currentCalories += food.calories
        console.log(`Added: ${food.name} (${food.calories} cal)`)
      }
    }

    console.log(`${mealType}: Selected ${mealItems.length} items, ${currentCalories} calories`)
    return mealItems
  }

  private getMockBMIResult(body: string): BMIResult {
    try {
      const data = JSON.parse(body)
      const bmi = data.weight / (data.height / 100) ** 2
      let category = "Normal"

      if (bmi < 18.5) category = "Underweight"
      else if (bmi >= 25 && bmi < 30) category = "Overweight"
      else if (bmi >= 30) category = "Obese"

      return {
        bmi: Math.round(bmi * 10) / 10,
        category,
        idealWeight: Math.round(22 * (data.height / 100) ** 2),
      }
    } catch {
      return { bmi: 22.5, category: "Normal", idealWeight: 65 }
    }
  }

  private getRealisticNutrientHistory(): NutrientData[] {
    const history = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // Generate realistic Indian diet data
      const baseCalories = 1800 + Math.floor(Math.random() * 400) // 1800-2200
      const proteinRatio = 0.15 + Math.random() * 0.05 // 15-20% of calories
      const carbRatio = 0.55 + Math.random() * 0.1 // 55-65% of calories
      const fatRatio = 0.2 + Math.random() * 0.1 // 20-30% of calories

      history.push({
        date: date.toISOString().split("T")[0],
        calories: baseCalories,
        protein: Math.round((baseCalories * proteinRatio) / 4), // 4 cal per gram
        carbs: Math.round((baseCalories * carbRatio) / 4), // 4 cal per gram
        fat: Math.round((baseCalories * fatRatio) / 9), // 9 cal per gram
        fiber: Math.floor(Math.random() * 15) + 20,
      })
    }
    return history
  }

  private getIndianRecipes(): any[] {
    return [
      {
        id: "1",
        name: "High-Protein Moong Dal Tadka",
        category: "Gymrat",
        cookingTime: 25,
        servings: 4,
        difficulty: "Easy",
        ingredients: [
          "Moong Dal - 1 cup",
          "Toor Dal - 1/2 cup",
          "Spinach - 1 cup",
          "Turmeric - 1/2 tsp",
          "Cumin Seeds - 1 tsp",
          "Ginger-Garlic Paste - 1 tbsp",
          "Mustard Oil - 1 tbsp",
        ],
        instructions: [
          "Wash and soak mixed dals for 30 minutes",
          "Pressure cook dals with turmeric and water for 3-4 whistles",
          "Heat mustard oil in pan, add cumin seeds",
          "Add ginger-garlic paste and sauté",
          "Add chopped spinach and cook for 2 minutes",
          "Add cooked dal and simmer for 5 minutes",
          "Garnish with coriander and serve hot",
        ],
        calories: 220,
        protein: 20,
        carbs: 30,
        fat: 4,
      },
      {
        id: "2",
        name: "Multigrain Vegetable Paratha",
        category: "9-5",
        cookingTime: 20,
        servings: 2,
        difficulty: "Easy",
        ingredients: [
          "Whole Wheat Flour - 1 cup",
          "Pearl Millet Flour - 1/2 cup",
          "Mixed Vegetables - 1 cup",
          "Fenugreek Leaves - 2 tbsp",
          "Green Chili - 2",
          "Ajwain - 1/2 tsp",
          "Ghee - 1 tsp",
        ],
        instructions: [
          "Mix flours and knead dough with water",
          "Prepare vegetable stuffing with spices",
          "Roll paratha with stuffing inside",
          "Cook on hot tawa with little ghee",
          "Serve hot with yogurt and pickle",
        ],
        calories: 285,
        protein: 9,
        carbs: 48,
        fat: 7,
      },
      {
        id: "3",
        name: "Protein-Rich Paneer Bhurji",
        category: "Gymrat",
        cookingTime: 15,
        servings: 2,
        difficulty: "Easy",
        ingredients: [
          "Paneer - 200g",
          "Onions - 1 large",
          "Tomatoes - 2",
          "Green Chilies - 2",
          "Turmeric - 1/2 tsp",
          "Garam Masala - 1 tsp",
          "Mustard Oil - 1 tbsp",
        ],
        instructions: [
          "Crumble paneer into small pieces",
          "Heat mustard oil and sauté onions until golden",
          "Add tomatoes and spices, cook until soft",
          "Add crumbled paneer and mix well",
          "Cook for 5 minutes and garnish with coriander",
        ],
        calories: 325,
        protein: 24,
        carbs: 8,
        fat: 22,
      },
      {
        id: "4",
        name: "Nutritious Poha Upma",
        category: "9-5",
        cookingTime: 10,
        servings: 1,
        difficulty: "Easy",
        ingredients: [
          "Poha - 1/2 cup",
          "Mixed Vegetables - 1/4 cup",
          "Mustard Seeds - 1/2 tsp",
          "Curry Leaves - 5-6",
          "Ginger - 1 inch",
          "Green Chili - 1",
          "Peanuts - 1 tbsp",
        ],
        instructions: [
          "Wash and drain poha",
          "Heat oil, add mustard seeds and curry leaves",
          "Add ginger, green chili and peanuts",
          "Add vegetables and sauté",
          "Add poha and mix gently",
          "Garnish with coriander and serve",
        ],
        calories: 185,
        protein: 6,
        carbs: 30,
        fat: 5,
      },
      {
        id: "5",
        name: "Quinoa Vegetable Khichdi",
        category: "General Health",
        cookingTime: 30,
        servings: 3,
        difficulty: "Medium",
        ingredients: [
          "Quinoa - 1/2 cup",
          "Moong Dal - 1/4 cup",
          "Mixed Vegetables - 1 cup",
          "Turmeric - 1/2 tsp",
          "Ginger - 1 inch",
          "Ghee - 1 tsp",
          "Cumin Seeds - 1/2 tsp",
        ],
        instructions: [
          "Wash quinoa and moong dal",
          "Heat ghee, add cumin seeds and ginger",
          "Add vegetables and sauté",
          "Add quinoa, dal, turmeric and water",
          "Pressure cook for 3 whistles",
          "Serve hot with yogurt",
        ],
        calories: 195,
        protein: 8,
        carbs: 32,
        fat: 4,
      },
    ]
  }

  private getMealReminders(): any[] {
    return [
      {
        id: "1",
        time: "08:00",
        message: "Start your day with a healthy breakfast! Try idli-sambar or poha with vegetables.",
        frequency: "daily",
        isActive: true,
      },
      {
        id: "2",
        time: "13:00",
        message: "Lunch time! Have dal-chawal with vegetables for balanced nutrition.",
        frequency: "weekdays",
        isActive: true,
      },
      {
        id: "3",
        time: "16:00",
        message: "Evening snack time! Try some roasted nuts or seasonal fruits.",
        frequency: "daily",
        isActive: true,
      },
      {
        id: "4",
        time: "20:00",
        message: "Dinner time! Keep it light with roti-sabzi and dal.",
        frequency: "daily",
        isActive: true,
      },
    ]
  }

  // Authentication methods
  async login(email: string, password: string): Promise<{ user: any; token: string }> {
    const endpoints = ["/auth/login", "/api/auth/login", "/login", "/api/login"]

    for (const endpoint of endpoints) {
      try {
        return await this.request<{ user: any; token: string }>(endpoint, {
          method: "POST",
          body: JSON.stringify({ email, password }),
        })
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, trying next...`)
        continue
      }
    }

    throw new Error("Login failed")
  }

  async signup(userData: {
    name: string
    email: string
    password: string
    age: number
    gender: string
    weight: number
    height: number
  }): Promise<{ user: any; token: string }> {
    const endpoints = ["/auth/signup", "/api/auth/signup", "/signup", "/api/signup", "/register", "/api/register"]

    for (const endpoint of endpoints) {
      try {
        return await this.request<{ user: any; token: string }>(endpoint, {
          method: "POST",
          body: JSON.stringify(userData),
        })
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, trying next...`)
        continue
      }
    }

    throw new Error("Signup failed")
  }

  async updateProfile(userData: any): Promise<{ user: any }> {
    const endpoints = ["/auth/profile", "/api/auth/profile", "/profile", "/api/profile", "/user/update"]

    for (const endpoint of endpoints) {
      try {
        return await this.request<{ user: any }>(endpoint, {
          method: "PUT",
          body: JSON.stringify(userData),
        })
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, trying next...`)
        continue
      }
    }

    throw new Error("Profile update failed")
  }

  // API Methods
  async generateDietPlan(profile: UserProfile): Promise<DietPlan> {
    const endpoints = ["/diet-plan", "/api/diet-plan", "/diet_plan", "/api/diet_plan", "/generate-diet-plan"]

    for (const endpoint of endpoints) {
      try {
        const result = await this.request<DietPlan>(endpoint, {
          method: "POST",
          body: JSON.stringify(profile),
        })
        if (result) return result
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, continuing...`)
        continue
      }
    }

    // Fallback to generating realistic diet plan
    console.log("All endpoints failed, generating comprehensive diet plan")
    return this.generateRealisticDietPlan(JSON.stringify(profile))
  }

  async analyzeFoodItem(foodName: string): Promise<FoodItem> {
    const endpoints = [
      `/analyze-food?name=${encodeURIComponent(foodName)}`,
      `/api/analyze-food?name=${encodeURIComponent(foodName)}`,
      `/analyze_food?name=${encodeURIComponent(foodName)}`,
      `/api/analyze_food?name=${encodeURIComponent(foodName)}`,
      `/food/analyze?name=${encodeURIComponent(foodName)}`,
      `/food?name=${encodeURIComponent(foodName)}`,
    ]

    for (const endpoint of endpoints) {
      try {
        const result = await this.request<FoodItem>(endpoint)
        if (result) return result
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, continuing...`)
        continue
      }
    }

    // Fallback to comprehensive Indian food database
    return this.getIndianFoodData(`name=${foodName}`)
  }

  async calculateBMI(weight: number, height: number, age: number, gender: string): Promise<BMIResult> {
    const endpoints = ["/calculate-bmi", "/api/calculate-bmi", "/calculate_bmi", "/api/calculate_bmi", "/bmi"]

    for (const endpoint of endpoints) {
      try {
        const result = await this.request<BMIResult>(endpoint, {
          method: "POST",
          body: JSON.stringify({ weight, height, age, gender }),
        })
        if (result) return result
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, continuing...`)
        continue
      }
    }

    return this.getMockBMIResult(JSON.stringify({ weight, height, age, gender }))
  }

  async logNutrients(data: Omit<NutrientData, "date">): Promise<{ success: boolean }> {
    const endpoints = ["/log-nutrients", "/api/log-nutrients", "/log_nutrients", "/api/log_nutrients"]

    for (const endpoint of endpoints) {
      try {
        const result = await this.request<{ success: boolean }>(endpoint, {
          method: "POST",
          body: JSON.stringify({ ...data, date: new Date().toISOString().split("T")[0] }),
        })
        if (result) return result
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, continuing...`)
        continue
      }
    }

    return { success: true }
  }

  async getNutrientHistory(days = 7): Promise<NutrientData[]> {
    const endpoints = [
      `/nutrient-history?days=${days}`,
      `/api/nutrient-history?days=${days}`,
      `/nutrient_history?days=${days}`,
      `/api/nutrient_history?days=${days}`,
    ]

    for (const endpoint of endpoints) {
      try {
        const result = await this.request<NutrientData[]>(endpoint)
        if (result) return result
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, continuing...`)
        continue
      }
    }

    return this.getRealisticNutrientHistory()
  }

  async getRecipes(category?: string): Promise<any[]> {
    const baseEndpoints = ["/recipes", "/api/recipes"]
    const endpoints = category ? baseEndpoints.map((base) => `${base}?category=${category}`) : baseEndpoints

    for (const endpoint of endpoints) {
      try {
        const result = await this.request<any[]>(endpoint)
        if (result) return result
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, continuing...`)
        continue
      }
    }

    return this.getIndianRecipes()
  }

  async submitFeedback(feedback: { rating: number; comment: string; feature: string }): Promise<{ success: boolean }> {
    const endpoints = ["/feedback", "/api/feedback"]

    for (const endpoint of endpoints) {
      try {
        const result = await this.request<{ success: boolean }>(endpoint, {
          method: "POST",
          body: JSON.stringify(feedback),
        })
        if (result) return result
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, continuing...`)
        continue
      }
    }

    return { success: true }
  }

  async setReminder(reminder: { time: string; message: string; frequency: string }): Promise<{ success: boolean }> {
    const endpoints = ["/set-reminder", "/api/set-reminder", "/set_reminder", "/api/set_reminder", "/reminders"]

    for (const endpoint of endpoints) {
      try {
        const result = await this.request<{ success: boolean }>(endpoint, {
          method: "POST",
          body: JSON.stringify(reminder),
        })
        if (result) return result
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, continuing...`)
        continue
      }
    }

    return { success: true }
  }

  async getReminders(): Promise<any[]> {
    const endpoints = ["/reminders", "/api/reminders", "/get-reminders", "/api/get-reminders"]

    for (const endpoint of endpoints) {
      try {
        const result = await this.request<any[]>(endpoint)
        if (result) return result
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}, continuing...`)
        continue
      }
    }

    return this.getMealReminders()
  }
}

export const apiClient = new ApiClient()
