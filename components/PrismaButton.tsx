"use client";
import { Button } from "./ui/button";

const PrismaButton = () => {
  const handleClick = async () => {
    try {
      const res = await fetch("/api/products-seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        console.log("Products seeded 💕💕💕: ", data.count);
      } else {
        console.error("Error seeding products:", data);
      }
    } catch (error) {
      console.error("Error seeding products:", error);
    }
  };

  return (
      <div>
          
      <Button
        variant="default"
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90"
        onClick={handleClick}>
        Add Products
      </Button>
    </div>
  );
};

export default PrismaButton;
