import { Grid } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import HomeLayout from "../components/HomeLayout";
import { manifest } from "../config";

const Home: NextPage = () => {
  const spaces_name = new Array<string>(100);
  for (let i = 0; i < spaces_name.length; i++) {
    spaces_name[i] = `Space${i}`;
  }

  return (
    <HomeLayout>
      <Head>
        <title>{manifest.name}</title>
      </Head>

      <Grid>
        {spaces_name.map((value, i) => {
          const width = 200 + Math.floor(Math.random() * 100 - 50);
          const height = 100 + Math.floor(Math.random() * 100 - 50);
          return (
            <Grid.Col xs={6} md={4} lg={3} xl={2} key={value}>
              <Link href={`/space/${value}`}>
                <a>
                  <Image
                    src={`https://picsum.photos/${width}/${height}`}
                    alt={value}
                    width={width}
                    height={height}
                    layout="responsive"
                  />
                </a>
              </Link>
            </Grid.Col>
          );
        })}
      </Grid>
    </HomeLayout>
  );
};

export default Home;
