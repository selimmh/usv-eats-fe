import { Group, Paper } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

export const AuthenticatedLayout = ({ children }: Props) => (
  <>
    <Paper shadow="md" radius="md" p="md" mx="auto" my="xl" withBorder>
      <Group position="apart">
        {/* <AuthUserInfo /> */}
        <div>user info</div>

        {/* <AuthLogout /> */}
        <div>logout</div>
      </Group>
    </Paper>

    {/* <Navigation /> */}
    <div>navigation</div>

    <Paper mb="xl" mt="xl">
      {children}
    </Paper>
  </>
);
