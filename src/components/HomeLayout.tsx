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
import { SimpleHeader } from "./SimpleHeader";

const HomeLayout = ({ children }: { children: React.ReactNode }) => (
  <AppShell
    header={
      <SimpleHeader
        links={[
          {
            link: "/",
            label: "Home",
            activeIcon: <MdHome size={"1.5rem"} />,
            inactiveIcon: <MdOutlineHome size={"1.5rem"} />,
          },
          {
            link: "/Contact",
            label: "Contact",
            activeIcon: <MdContacts size={"1.5rem"} />,
            inactiveIcon: <MdOutlineContacts size={"1.5rem"} />,
          },
          {
            link: "/Favorites",
            label: "Favorites",
            activeIcon: <MdFavorite size={"1.5rem"} />,
            inactiveIcon: <MdFavoriteBorder size={"1.5rem"} />,
          },
          {
            link: "/Settings",
            label: "Settings",
            activeIcon: <MdSettings size={"1.5rem"} />,
            inactiveIcon: <MdOutlineSettings size={"1.5rem"} />,
          },
        ]}
      />
    }
  >
    {children}
  </AppShell>
);

export default HomeLayout;
