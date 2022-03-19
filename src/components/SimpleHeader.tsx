import React from "react";
import { createStyles, Header, Container, Group, Button } from "@mantine/core";
import { useRouter } from "next/router";

const useStyles = createStyles((theme, params, getRef) => ({
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  links: {
    ref: getRef("links"),
    [theme.fn.smallerThan("xs")]: {
      [`& .${getRef("linkText")}`]: { fontSize: "0px" },
    },
  },
  linkText: {
    ref: getRef("linkText"),
  },
}));

interface HeaderSimpleProps {
  links: {
    link: string;
    label: string;
    activeIcon?: React.ReactNode;
    inactiveIcon?: React.ReactNode;
  }[];
}

export function SimpleHeader({ links }: HeaderSimpleProps) {
  const router = useRouter();
  const active = links.filter((value) => value.link === router.asPath)?.[0]
    ?.link;
  const { classes } = useStyles();

  const items = links.map(({ link, label, activeIcon, inactiveIcon }) => (
    <Button
      onClick={() => router.push(link)}
      title={label}
      key={label}
      leftIcon={active === link ? activeIcon : inactiveIcon}
      variant={active === link ? "light" : "subtle"}
    >
      <span className={classes.linkText}> {label} </span>
    </Button>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
      </Container>
    </Header>
  );
}
