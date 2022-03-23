import { AppShell, Menu } from "@mantine/core";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdContacts,
  MdFavorite,
  MdFavoriteBorder,
  MdHome,
  MdLogin,
  MdLogout,
  MdOutlineContacts,
  MdOutlineHome,
  MdOutlineSettings,
  MdSettings,
  MdSwapHoriz,
} from "react-icons/md";
import useUser from "../utils/useUser";
import { HomeHeader } from "./HomeHeader";
import LinkWrap from "./utils/LinkWrap";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, , signOut] = useUser();
  const linkIconSize = 24;
  const menuIconSize = 14;
  return (
    <AppShell
      header={
        <HomeHeader
          links={[
            {
              link: "/",
              label: "Home",
              activeIcon: <MdHome size={linkIconSize} />,
              inactiveIcon: <MdOutlineHome size={linkIconSize} />,
            },
            {
              link: "/Contact",
              label: "Contact",
              activeIcon: <MdContacts size={linkIconSize} />,
              inactiveIcon: <MdOutlineContacts size={linkIconSize} />,
            },
            {
              link: "/Favorites",
              label: "Favorites",
              activeIcon: <MdFavorite size={linkIconSize} />,
              inactiveIcon: <MdFavoriteBorder size={linkIconSize} />,
            },
            {
              link: "/Settings",
              label: "Settings",
              activeIcon: <MdSettings size={linkIconSize} />,
              inactiveIcon: <MdOutlineSettings size={linkIconSize} />,
            },
          ]}
          menuChildren={
            <>
              <Menu.Label>Settings</Menu.Label>
              <LinkWrap href={"/account"}>
                <Menu.Item icon={<MdSettings size={menuIconSize} />}>
                  Account settings
                </Menu.Item>
              </LinkWrap>
              <LinkWrap href={"/login"}>
                <Menu.Item
                  icon={
                    user ? (
                      <MdSwapHoriz size={menuIconSize} />
                    ) : (
                      <MdLogin size={menuIconSize} />
                    )
                  }
                >
                  {user ? "Change account" : "Login"}
                </Menu.Item>
              </LinkWrap>
              {user ? (
                <Menu.Item
                  onClick={() => signOut()}
                  icon={<MdLogout size={menuIconSize} />}
                >
                  Logout
                </Menu.Item>
              ) : null}
            </>
          }
        />
      }
    >
      {children}
    </AppShell>
  );
};

export default HomeLayout;
