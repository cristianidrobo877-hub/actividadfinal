// src/components/PokemonList.tsx
import React, { useEffect, useMemo, useState } from "react";
import { getPokemons, getPokemonDetails, PokemonFull } from "../services/pokemonService";
import { PokemonCard } from "./PokemonCard";
import { Modal, Button, Spinner } from "react-bootstrap";

export const PokemonList: React.FC = () => {
  const [items, setItems] = useState<PokemonFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<PokemonFull | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPokemons(151)
      .then((data) => {
        // fetch details for each pokemon in parallel
        return Promise.all(data.results.map(r => getPokemonDetails(r.url)));
      })
      .then((fulls) => {
        // sort by id just in case
        fulls.sort((a, b) => a.id - b.id);
        setItems(fulls);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los pokemons");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      items.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.types.some(t => t.type.name.toLowerCase().includes(search.toLowerCase()))
      ),
    [items, search]
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-4">
      <header className="app-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="title">Pokédex — Original Gaming</h1>
          <p className="text-muted">Busca, explora y abre tarjetas con información completa</p>
        </div>
        <div className="d-flex align-items-center">
          <input
            className="form-control search-input me-3"
            placeholder="Buscar por nombre o tipo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="mt-4">
        <div className="row g-3">
          {filtered.map((p) => (
            <div key={p.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <PokemonCard pokemon={p} onClick={(x) => setSelected(x)} />
            </div>
          ))}
        </div>
      </main>

      {/* Modal detalle */}
      <Modal show={!!selected} onHide={() => setSelected(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize">
            {selected?.name} #{selected?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selected && (
            <>
              <img src={selected.sprites.front_default} alt={selected.name} className="mb-3" />
              <div className="d-flex justify-content-center gap-3 flex-wrap mb-3">
                {selected.types.map(t => (
                  <span key={t.slot} className="badge bg-light text-dark text-capitalize">{t.type.name}</span>
                ))}
              </div>
              <p><strong>Altura:</strong> {selected.height} | <strong>Peso:</strong> {selected.weight}</p>
              <div className="mt-2">
                <h6>Stats</h6>
                <div className="d-flex gap-2 justify-content-center flex-wrap">
                  {selected.stats?.map(s => (
                    <div key={s.stat.name} style={{minWidth: 100}}>
                      <small className="text-muted text-capitalize">{s.stat.name}</small>
                      <div className="progress" style={{height: 8}}>
                        <div className="progress-bar" role="progressbar" style={{width: `${Math.min(100, s.base_stat)}%`}} aria-valuenow={s.base_stat} aria-valuemin={0} aria-valuemax={100}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
