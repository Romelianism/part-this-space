import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { upperFirst, useForceUpdate, useForm, useToggle } from "@mantine/hooks";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import HomeLayout from "../components/HomeLayout";
import { auth } from "../lib/firebase";
import useUser from "../utils/useUser";

const AuthenticationForm: NextPage = () => {
  const router = useRouter();
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const [modal, setModal] = useState<{
    title: string;
    message: string;
    topElement?: React.ReactNode;
    back?: boolean;
  }>();
  const [, loading] = useUser();
  const forceUpdate = useForceUpdate();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validationRules: {
      email: (val) =>
        // https://stackoverflow.com/a/46181/17921095
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          val
        ),
      password: (val) => val.length >= 6,
    },
  });

  return (
    <HomeLayout>
      <Head>
        <title>{upperFirst(type)}</title>
      </Head>
      <LoadingOverlay visible={loading} />
      <Modal
        opened={modal !== undefined}
        title={modal?.title}
        onClose={() => (modal?.back ? router.back() : setModal(undefined))}
      >
        {modal?.message}
      </Modal>
      <Center>
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            Welcome to PartThis.Space, {type} with
          </Text>

          <Divider label="continue with email" labelPosition="center" my="lg" />

          <form
            onSubmit={form.onSubmit(
              async ({ email, name, password, terms }) => {
                if (!auth) return;
                if (type === "login") {
                  const userCredential = await signInWithEmailAndPassword(
                    auth!,
                    email,
                    password
                  ).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setModal({
                      title: errorCode,
                      message: errorMessage,
                    });
                  });

                  if (!userCredential) return;

                  router.back();
                } else {
                  const user = (
                    await createUserWithEmailAndPassword(
                      auth!,
                      email,
                      password
                    ).catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      setModal({
                        title: errorCode,
                        message: errorMessage,
                      });
                      return undefined;
                    })
                  )?.user;
                  if (!user) return;

                  sendEmailVerification(user);
                  setModal({
                    title: "Please verify your email",
                    message: `We just sent an email to ${user.email}. Click the link in the email to verify your account.`,
                    back: true,
                  });
                }
                forceUpdate();
              }
            )}
          >
            <Group direction="column" grow>
              {type === "register" && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                />
              )}

              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
              />

              {type === "register" && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue("terms", event.currentTarget.checked)
                  }
                  required
                />
              )}
            </Group>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="gray"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit">{upperFirst(type)}</Button>
            </Group>
          </form>
        </Paper>
      </Center>
    </HomeLayout>
  );
};

export default AuthenticationForm;
