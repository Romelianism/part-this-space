import React from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import Link from "next/link";
import HomeLayout from "../components/HomeLayout";
import Head from "next/head";

const useStyles = createStyles((theme) => ({
  verticalCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center" /* align vertical */,
    alignItems: "baseline" /* align horizontal */,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export function NotFoundImage() {
  const { classes } = useStyles();

  return (
    <HomeLayout>
      <Head>
        <title>404</title>
      </Head>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
      >
        <Image
          alt="404"
          src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?t=st=1647590848~exp=1647591448~hmac=02d29282190ebd386f0952fc4e3c798fd4c45d389b0b5f59903e0f582be09ff1"
        />
        <div className={classes.verticalCenter}>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error report to developer.
          </Text>
          <Link href="/" passHref>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
              component="a"
            >
              Get back to home page
            </Button>
          </Link>
        </div>
      </SimpleGrid>
    </HomeLayout>
  );
}
export default NotFoundImage;
