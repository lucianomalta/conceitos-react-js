import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await  api.post('repositories', {
      // title: `Novo Repositorio ${Date.now()}`,
      title: 'Desafio ReactJS',
      url: 'https://github.com/lucianomalta/conceitos-react-js.git',
      techs: ['Nodejs'],
      likes: "0"
    })

    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await  api.delete(`repositories/${id}`);
    api.get('repositories').then(response => {
      setRepositories(repositories.filter(
        repositorie => repositorie.id !== id
      ));
  })
  
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <>
          {repositories.map( repositorie => <li key={repositorie.id}>{repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
            
          </li>)}
        </>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
