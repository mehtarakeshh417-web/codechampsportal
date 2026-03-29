import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">CodeChamps</h1>
      <p className="text-lg text-muted-foreground text-center mb-8 max-w-xl">
        Empowering students with coding skills for the future.
      </p>
      <Button size="lg" onClick={() => navigate("/login")}>Get Started</Button>
    </div>
  );
};

export default Landing;
