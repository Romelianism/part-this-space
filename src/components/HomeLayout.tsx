import { AppShell } from "@mantine/core";
import {
  MdContacts,
  MdFavorite,
  MdFavoriteBorder,
  MdHome,
  MdOutlineContacts,
  MdOutlineHome,
  MdOutlineSettings,
  MdSettings,
} from "react-icons/md";
import { HomeHeader } from "./HomeHeader";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const iconSize = 24;
  return (
    <AppShell
      header={
        <HomeHeader
          links={[
            {
              link: "/",
              label: "Home",
              activeIcon: <MdHome size={iconSize} />,
              inactiveIcon: <MdOutlineHome size={iconSize} />,
            },
            {
              link: "/Contact",
              label: "Contact",
              activeIcon: <MdContacts size={iconSize} />,
              inactiveIcon: <MdOutlineContacts size={iconSize} />,
            },
            {
              link: "/Favorites",
              label: "Favorites",
              activeIcon: <MdFavorite size={iconSize} />,
              inactiveIcon: <MdFavoriteBorder size={iconSize} />,
            },
            {
              link: "/Settings",
              label: "Settings",
              activeIcon: <MdSettings size={iconSize} />,
              inactiveIcon: <MdOutlineSettings size={iconSize} />,
            },
          ]}
        />
      }
    >
      {children}
    </AppShell>
  );
};

export default HomeLayout;
