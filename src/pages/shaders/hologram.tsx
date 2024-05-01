import Button from "@/components/Button";
import Layout from "@/components/layouts/canvas";
import HologramScene from "@/components/scenes/Hologram";

const hologram = () => {
  return (
    <>
      <Layout>
        <HologramScene />
      </Layout>
      <Button name="hologram" />
    </>
  );
};

export default hologram;
