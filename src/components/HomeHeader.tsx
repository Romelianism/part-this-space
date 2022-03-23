import {
  Avatar,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Header,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { MdExpandMore } from "react-icons/md";
import useUser from "../utils/useUser";
import Logo from "./Logo";
import LinkWrap from "./utils/LinkWrap";

const useStyles = createStyles((theme) => ({
  top: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    height: "50%",
    color: theme.white,
  },
  topInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  bottom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  links: {
    flex: 1,
    justifyContent: "space-between",
  },
  link: {
    flex: 1,

    [theme.fn.smallerThan("xs")]: {
      padding: 0,

      [`& .mantine-Button-leftIcon`]: {
        margin: 0,
      },

      [`& .mantine-Button-label`]: {
        display: "none",
      },
    },
  },

  menuControl: {
    [theme.fn.smallerThan("xs")]: {
      [`& .mantine-Button-leftIcon`]: {
        margin: 0,
      },
      [`& .mantine-Button-rightIcon`]: {
        display: "none",
      },
      [`& .mantine-Button-label`]: {
        display: "none",
      },
    },
  },
}));

interface HomeHeaderProps {
  links: {
    link: string;
    label: string;
    activeIcon?: React.ReactNode;
    inactiveIcon?: React.ReactNode;
  }[];
  menuChildren: React.ReactNode;
}

export function HomeHeader({ links, menuChildren }: HomeHeaderProps) {
  const router = useRouter();
  const theme = useMantineTheme();
  const active = links.filter((value) => value.link === router.asPath)?.[0]
    ?.link;
  const { classes } = useStyles();
  const [user, userLoading] = useUser();

  const items = links.map(({ link, label, activeIcon, inactiveIcon }) => (
    <Button
      onClick={() => router.push(link)}
      title={label}
      key={label}
      leftIcon={active === link ? activeIcon : inactiveIcon}
      variant={active === link ? "light" : "subtle"}
      className={classes.link}
    >
      {label}
    </Button>
  ));

  return (
    <Header height={80} mb={120}>
      <div className={classes.top}>
        <Container className={classes.topInner}>
          <Logo scale={2} />
          <Menu
            placement="end"
            control={
              <Button
                title="Account"
                loading={userLoading}
                leftIcon={<Avatar radius="xl" size={20} />}
                rightIcon={<MdExpandMore size={12} />}
                className={classes.menuControl}
              >
                <Text
                  weight={500}
                  size="sm"
                  sx={{ lineHeight: 1, color: theme.white }}
                  mr={3}
                >
                  {userLoading ? "Loading..." : user?.email ?? "Not Signed In"}
                </Text>
              </Button>
            }
          >
            {menuChildren}
          </Menu>
        </Container>
      </div>
      <Container className={classes.bottom}>
        <Group spacing={5} className={classes.links} noWrap>
          {items}
        </Group>
      </Container>
    </Header>
  );
}
