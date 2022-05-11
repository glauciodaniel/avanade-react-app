import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import api from "../services/api";

function Header(props) {
  //estado é informação armazenada.
  //As informações são imutáveis.
  // getter & setter
  // 16.8 - Hooks - useAlgumaCoisa, useState, useEffect, useRef, useContext
  // const [getter, setter] = useState(valor inicial);
  const [company, setCompany] = useState(
    props.options.empresa || "Nenhuma informada"
  );
  const [name, setName] = useState(props.options.nome);
  const [site, setSite] = useState(props.options.site);
  const [task, setTask] = useState([]);

  //executar a primeira vez que a página for carregada(Fiap). E cada vez que um estado for alterado(Avanade). Ele executa novamente.

  async function getData() {
    const res = await api.get("http://127.0.0.1:5000/api/tasks");
    return await res.data;
  }

  useEffect(() => {
    //Hook executa automaticamente, toda vez que a página é carregada - componenDidMount();
    //Executa automaticamente toda vez que um estado é alterado. - componentDidUpdate();

    //chamando a nossa função getData();
    async function fetchData() {
      const response = await getData();
      setTask(response);
      return response;
    }
    fetchData();

    setCompany(company.toUpperCase());
  }, [company]);

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>{props.title}</p>
      <a
        className={props.options.className}
        href={site}
        target="_blank"
        rel="noopener noreferrer"
      >
        {company} - {name}
      </a>

      <ul>
        {task.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
      <button
        onClick={(e) => setCompany("Avanade")}
      >{`Mudando o nome de: ${company}`}</button>
    </header>
  );
}

export default Header;
