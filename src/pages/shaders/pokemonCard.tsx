import Layout from "@/components/layouts/canvas";
import PokemonCardScene from "@/components/scenes/PokemonCard";
import Button from "@/components/Button";

const pokemonCard = () => {
  return (
    <>
      <Layout>
        <PokemonCardScene />
      </Layout>
      {/* <Button name="pokemon_card" /> */}
    </>
  );
};

export default pokemonCard;
