import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  Skeleton,
} from "@mantine/core";

import { Carousel } from "@mantine/carousel";

import { useStyles } from "./ProductCard.styles";
import { ProductCardProps } from "./ProductCard.types";

export const ProductCard = ({
  images,
  price,
  name,
  description,
  badges,
  onAddFavorite,
  isFavorite,
}: Partial<ProductCardProps>) => {
  const { classes, theme } = useStyles();

  const features = badges?.map((badge) => (
    <Badge color={theme.colorScheme === "dark" ? "dark" : "gray"} key={badge}>
      {badge}
    </Badge>
  ));

  const slides = images?.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text className={classes.name} fz="sm" fw={700}>
            {name}
          </Text>
          <Badge size="sm">{price}</Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {description?.slice(0, 200)}...
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Add to cart
        </Button>
        <ActionIcon
          onClick={onAddFavorite}
          variant="default"
          radius="md"
          size={36}
        >
          <IconHeart
            size="1.1rem"
            className={classes.like + " " + (isFavorite ? classes.liked : "")}
            stroke={1.5}
          />
        </ActionIcon>
      </Group>
    </Card>
  );
};
