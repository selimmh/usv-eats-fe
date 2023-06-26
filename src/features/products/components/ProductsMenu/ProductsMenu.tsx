import React from "react";
import { ProductCard } from "../ProcutCard/ProductCard";
import { Grid } from "@mantine/core";
import { useProducts, useFavorites } from "../../store";

export const ProductsMenu = () => {
  const { products } = useProducts();
  const { addFavorite, favorites } = useFavorites();
  if (products.loading) {
    return <div>loading...</div>;
  }

  console.log('products', products.products)
  return (
    <Grid>
      {products.products.map((product) => (
        <Grid.Col key={product._id} xs={12} sm={6} md={4}>
          <ProductCard
            onAddFavorite={() => addFavorite(product._id)}
            isFavorite={
              favorites.findIndex((favorite) => favorite === product._id) !== -1
            }
            loading={products.loading}
            images={product.images}
            name={product.name}
            price={product.price}
            description={product.description}
            badges={["☀️ lorem", "🦓 ipsum", "🌊 dolor", "🌲 sit", "🤽 amet"]}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};
