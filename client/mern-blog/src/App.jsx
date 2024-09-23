import React from "react";
import "./App.css";

function App() {
  return (
    <main>
      <header>
        <a href="#" className="logo">
          My Blog
        </a>
        <nav>
          <a href="#">Login</a>
          <a href="#">Register</a>
        </nav>
      </header>
      <section className="post-grid">
        <article className="post">
          <div className="image">
            <img
              src="https://cdn.thenewstack.io/media/2023/11/4b416c71-kali-1024x685.png"
              alt="Kali Linux interface"
            />
          </div>
          <div className="post-info">
            <h2>
              Como o Kali Linux se tornou essencial para testes de segurança
            </h2>
            <p className="author-date">
              Por <strong>Daniel Oliveira</strong> em{" "}
              <time dateTime="2024-09-23">23 de setembro de 2024</time>
            </p>
            <p className="excerpt">
              O Kali Linux tem sido amplamente utilizado por profissionais de
              segurança para testes de penetração, devido à sua vasta gama de
              ferramentas integradas. A facilidade de uso e a personalização
              tornam a distribuição uma das mais populares entre os entusiastas
              da cibersegurança.
            </p>
          </div>
        </article>
        <article className="post">
          <div className="image">
            <img
              src="https://www.kali.org/blog/kali-community-themes/images/kali-community-themes-banner.jpg"
              alt="Kali Linux tools"
            />
          </div>
          <div className="post-info">
            <h2>As melhores ferramentas do Kali Linux para 2024</h2>
            <p className="author-date">
              Por <strong>Maria Souza</strong> em{" "}
              <time dateTime="2024-09-20">20 de setembro de 2024</time>
            </p>
            <p className="excerpt">
              Entre as ferramentas mais utilizadas estão o Metasploit, Nmap e
              Wireshark. Essas ferramentas permitem varredura de redes, detecção
              de vulnerabilidades e análise de pacotes em tempo real, sendo
              essenciais para qualquer profissional da área.
            </p>
          </div>
        </article>

        <article className="post">
          <div className="image">
            <img
              src="https://kskroyal.com/wp-content/uploads/2023/02/Kali-Linux-On-M1-Mac-1.jpg"
              alt="Configuração de Kali Linux"
            />
          </div>
          <div className="post-info">
            <h2>Como configurar seu ambiente de teste com Kali Linux</h2>
            <p className="author-date">
              Por <strong>Pedro Lima</strong> em{" "}
              <time dateTime="2024-09-15">15 de setembro de 2024</time>
            </p>
            <p className="excerpt">
              A configuração de um ambiente seguro para testes de penetração é
              crucial. Utilizar máquinas virtuais ou containers Docker pode
              isolar o sistema de possíveis falhas, garantindo que o ambiente de
              testes seja seguro e eficaz.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
