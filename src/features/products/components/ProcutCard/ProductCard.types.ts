export interface ProductCardProps {
  price: number;
  name: string;
  description: string;
  images: string[];
  badges: string[];
  loading: boolean;
  onAddFavorite: () => void;
  onRemoveFavorite: () => void;
  isFavorite: boolean;
}
