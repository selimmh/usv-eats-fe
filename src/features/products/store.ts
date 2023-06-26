import { axiosInstance } from "@/shared/configs/axiosInstance";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { TProduct } from "./types";
import { useLocalStorage } from "@mantine/hooks";

const productsAtom = atom({
  products: [] as TProduct[],
  loading: false,
  error: null,
});

export const useProducts = () => {
  const [products, setProducts] = useAtom(productsAtom);

  const getProductsAsync = async () => {
    setProducts((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { data } = await axiosInstance.get("/products");
      setProducts((prev) => ({ ...prev, products: data, loading: false }));
    } catch (error) {
      setProducts((prev) => ({
        ...prev,
        error: error as any,
        loading: false,
        products: [],
      }));
      throw error;
    }
  };

  useEffect(() => {
    getProductsAsync();
  }, []);

  return { products, getProductsAsync };
};

const favoritesAtom = atom<string[]>([]);
export const useFavorites = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const [, setLocalStorage] = useLocalStorage<string[]>({
    key: "favorites",
    defaultValue: [],
  });

  const addFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, id];
      setLocalStorage(newFavorites);
      return newFavorites;
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((item) => item !== id);
      setLocalStorage(newFavorites);
      return newFavorites;
    });
  };

  return { favorites, addFavorite, removeFavorite };
};
