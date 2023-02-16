import { useState } from "react";
import reactLogo from "./assets/react.svg";
import reactQuery from "./assets/reactQuery.svg";
import "./App.css";
import { useQuery } from "react-query";
import Axios from "axios";

function App() {
  const { data, isFetching } = useQuery(
    "repos",
    async () => {
      const response = await Axios.get("https://api.github.com/users/alexandrecz/repos");
      return response.data;
    },
    {
      //we can turn this off if we need - default is true
      refetchOnWindowFocus: true,
      //here we can define time to call the response
      //staleTime: 1000 * 60  // 1 minute
    }
  );

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://react-query-v3.tanstack.com/" target="_blank">
          <img src={reactQuery} className="logo" alt="React Query logo" />
        </a>
      </div>
      <h1>Vite + React + React-Query</h1>


      <ul>
        {isFetching && <p>Loading....</p>}
        {data?.map((repo) => {
          return (
            <li key={repo.full_name}>
              <strong>{repo.full_name}</strong>
              <p className="read-the-docs">{repo.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
