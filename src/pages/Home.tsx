import { Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/store";
export const Home = () => {
  const navigate = useNavigate();
  const { logoutAsync } = useAuth();
  return (
    <div>
      <Group>
        <Button onClick={() => navigate("/admin")}>Admin</Button>
        <Button onClick={() => navigate("/staff")}>Staff</Button>
        <Button onClick={() => navigate("/user")}>User</Button>
        <Button onClick={() => logoutAsync()}>Logout</Button>
      </Group>
    </div>
  );
};
