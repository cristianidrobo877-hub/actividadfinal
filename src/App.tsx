import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [hoverPokemon, setHoverPokemon] = useState<any>(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const showDetails = async (url: string, name: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setHoverPokemon({ ...data, name });
  };

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h1 className="text-center mt-4">PokéGalaxy</h1>

      <Form.Control
        type="text"
        placeholder="Buscar Pokémon..."
        className="my-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      <Row>
        {filtered.map((p, index) => (
          <Col md={3} className="mb-3" key={index}>
            <Card
              className="text-center card-pokemon"
              onMouseEnter={() => showDetails(p.url, p.name)}
              onMouseLeave={() => setHoverPokemon(null)}
            >
              <Card.Body>
                <Card.Title style={{ textTransform: "capitalize" }}>
                  {p.name}
                </Card.Title>

                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                  width="100"
                />

                {hoverPokemon?.name === p.name && (
                  <div className="fade-info">
                    <p><b>Altura:</b> {hoverPokemon.height}</p>
                    <p><b>Peso:</b> {hoverPokemon.weight}</p>
                    <p>
                      <b>Tipo:</b>{" "}
                      {hoverPokemon.types.map((t: any) => t.type.name).join(", ")}
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
