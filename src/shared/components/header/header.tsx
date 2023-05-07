import { useState } from "react";
import {
  Header as MantineHeader,
  Container,
  Group,
  Burger,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { data } from "./data";
import { useStyles } from "./styles";

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
    <MantineHeader height={60} mb={120}>
      <Container className={classes.header}>
        <div>usv-eats</div>
        <Group spacing={5} className={classes.links}>
          {items}
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
