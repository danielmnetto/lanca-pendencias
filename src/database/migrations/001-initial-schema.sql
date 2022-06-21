-- Up
CREATE TABLE Usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  usuario TEXT,
  senha TEXT
);

CREATE TABLE Pendencia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao TEXT,
  prazo TEXT,
  data DATE,
  horario TIME,
  responsavel INTEGER REFERENCES Usuario(id),
  criadoPor INTEGER REFERENCES Usuario(id)
);

-- Down
DROP TABLE Usuario;
DROP TABLE Pendencia;