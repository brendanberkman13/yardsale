export const CATEGORIES = [
  "skis",
  "snowboards",
  "boots",
  "outerwear",
  "accessories",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CONDITIONS = ["new", "like-new", "good", "fair"] as const;
export type Condition = (typeof CONDITIONS)[number];

export type PostingStatus = "active" | "sold" | "removed";

export type User = {
  id: string;
  name: string;
  email: string;
  /** Foreign key to a future images table. Null until the user uploads one. */
  imageId?: string;
  joinedAt: string;
  location?: string;
};

export type Posting = {
  id: string;
  postedByUserId: string;
  postedAt: string;
  title: string;
  description: string;
  priceCents: number;
  images: string[];
  category: Category;
  brand?: string;
  size?: string;
  condition: Condition;
  location?: string;
  status: PostingStatus;
};

export type NewPostingInput = {
  title: string;
  description: string;
  priceCents: number;
  category: Category;
  brand?: string;
  size?: string;
  condition: Condition;
  location?: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  skis: "Skis",
  snowboards: "Snowboards",
  boots: "Boots",
  outerwear: "Outerwear",
  accessories: "Accessories",
};

export const CONDITION_LABELS: Record<Condition, string> = {
  new: "New",
  "like-new": "Like new",
  good: "Good",
  fair: "Fair",
};
