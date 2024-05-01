import Button from "@/components/Button";
import Layout from "@/components/layouts/canvas";
import CoffeeSmokeModel from "@/components/scenes/coffeeSmoke";

const coffeeSmoke = () => {
  return (
    <>
      <Layout>
        <CoffeeSmokeModel />
      </Layout>
      <Button name="coffeeSmoke" />
    </>
  );
};

export default coffeeSmoke;
