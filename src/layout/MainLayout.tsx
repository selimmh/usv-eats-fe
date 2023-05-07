import { Footer } from "@/shared/components/Footer/Footer";
import { Header } from "@/shared/components/Header/Header";
import { useLocation } from "react-router-dom";
import { Container } from "@mantine/core";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isAuth = location.pathname.includes("auth");

  if (isAuth) {
    return <div>{children}</div>;
  }
  return (
    <div>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};
