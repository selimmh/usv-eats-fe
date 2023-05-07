import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Container,
  Center,
} from "@mantine/core";
import { useAuth } from "../store";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export const AuthenticationForm = () => {
  const [type, toggle] = useToggle(["login", "register"]);
  const { auth, loginAsync, registerAsync, meAsync } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async () => {
    if (!form.isValid()) {
      return;
    }

    try {
      if (type === "login") {
        await loginAsync(form.values.email, form.values.password);
        navigate("/");
      } else {
        await registerAsync(form.values.email, form.values.password);
        notifications.show({
          title: "Registration successful",
          message: "You can now login",
          color: "teal",
        });
        toggle();
      }
    } catch (error) {
      notifications.show({
        title: "Something went wrong",
        message: "Please try again later",
        color: "red",
      });
    }
  };

  const handleFastLogin = async (role: "admin" | "user" | "staff") => {
    try {
      if (role === "admin") {
        await loginAsync("admin@t.t", "test123");
      }
      if (role === "user") {
        await loginAsync("user@t.t", "test123");
      }
      if (role === "staff") {
        await loginAsync("staff@t.t", "test123");
      }
      navigate("/");
    } catch (error) {
      notifications.show({
        title: "Something went wrong",
        message: "Please try again later",
        color: "red",
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await meAsync();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Center h="100vh">
      <Container w={500}>
        <Paper p="xl" withBorder>
          <Text size="lg" weight={500} mb={16}>
            Welcome to Mantine, {type} with
          </Text>

          <form>
            <Stack>
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
                  label="You can sell my data and spam me"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue("terms", event.currentTarget.checked)
                  }
                />
              )}
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button
                loading={auth.loading}
                onClick={handleSubmit}
                type="submit"
              >
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>

        {/* fast */}
        <Group mt="lg">
          <Button onClick={() => handleFastLogin("admin")} variant="light">
            Admin
          </Button>
          <Button onClick={() => handleFastLogin("staff")} variant="light">
            Staff
          </Button>
          <Button onClick={() => handleFastLogin("admin")} variant="light">
            User
          </Button>
        </Group>
      </Container>
    </Center>
  );
};
