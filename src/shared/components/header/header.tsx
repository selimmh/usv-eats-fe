import { useState } from "react";
import {
  Header as MantineHeader,
  Container,
  Group,
  Burger,
  Button,
  Indicator,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { data } from "./Header.data";
import { useStyles } from "./Header.styles";
import { IconShoppingCart } from "@tabler/icons-react";

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(data[0].link);
  const { classes, cx } = useStyles();
  const navigate = useNavigate();

  const items = data.map((link) => (
    <a
      key={link.label}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <MantineHeader height={60} mb={60}>
      <Container className={classes.header}>
        <div>usv-eats</div>
        <Group spacing={5} className={classes.links}>
          {items}
          <Indicator inline label="1" size={16} color="red">
            <Button leftIcon={<IconShoppingCart size={16} />} h={30}>
              Cart
            </Button>
          </Indicator>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </MantineHeader>
  );
};
