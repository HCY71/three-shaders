import Button from "@/components/Button";
import Layout from "@/components/layouts/canvas";
import CoffeeSmokeScene from "@/components/scenes/CoffeeSmoke";

const coffeeSmoke = () => {
  return (
    <>
      <Layout>
        <CoffeeSmokeScene />
      </Layout>
      <Button name="coffeeSmoke" />
    </>
  );
};

export default coffeeSmoke;
