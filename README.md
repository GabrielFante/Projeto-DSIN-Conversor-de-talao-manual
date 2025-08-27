# 🚦 Projeto DSIN – Conversor de Talão Manual para Talão Eletrônico

Este projeto está sendo desenvolvido por um time de **6 estudantes** com o objetivo de modernizar o processo de registro de infrações de trânsito.  
A solução consiste em um sistema integrado com **Inteligência Artificial**, capaz de ler talões escritos manualmente por agentes de trânsito e convertê-los em **talões digitais**, otimizando o encaminhamento de multas.

---

## 📌 Objetivos do Projeto
- Automatizar a leitura e conversão de talões físicos para digitais.
- Reduzir erros humanos na transcrição das informações.
- Acelerar o processo de encaminhamento e tratamento das multas.
- Integrar um módulo de **IA/OCR** para interpretar a escrita manual dos agentes.
- Criar uma interface simples e funcional para acompanhamento dos registros.

---

## 🛠️ Tecnologias Utilizadas
- **Backend:** C#/ ASP.NET core
- **Frontend:** HTML, CSS, JavaScript
- **Banco de Dados:** SQLite 
- **Inteligência Artificial:** API de OCR e NLP (OpenAI / Tesseract / outros testes)  
- **Controle de Versão:** Git & GitHub  

---

## 📂 Organização das Pastas e Arquivos
```
/projeto-dsin
│── /backend # Código do servidor (C#/ ASP.NET + integração com API da OpenAI)
│── /frontend # Interface do usuário (HTML, CSS, JavaScript puro)
│── /database # Scripts SQL, modelos de dados e diagramas do banco
│── /docs # Documentações, atas de reunião, diagramas, wireframes
│── /ai # Configuração e testes de OCR/IA utilizando API da OpenAI
│── /containers # Configurações de containers (Dockerfiles, docker-compose, etc.)
│── /tests # Testes automatizados
│ ├── unit # Testes unitários
│ ├── integration # Testes de integração
│ └── e2e # Testes ponta a ponta
│── README.md # Documentação principal do projeto
```
---

## 👥 Equipe de Desenvolvimento
- Gabriel Fante
- João Pedro Guerra
- Igor Ryan
- Vinicius Gomes
- Guilherme Dalanora
- Miguel Guarnetti

---

## 🚀 Status do Projeto
🔄 **Em andamento** – Fase inicial de estruturação e integração das tecnologias.

---

## 📅 Próximos Passos
- [ ] Estruturar backend e banco de dados  
- [ ] Implementar frontend com integração à API  
- [ ] Integrar módulo de IA para leitura dos talões  
- [ ] Testar fluxo completo (manuscrito → digital → sistema)  
- [ ] Validar junto à empresa DSIN  

---

## 📖 Licença
Este projeto é acadêmico, desenvolvido para fins de estudo e parceria com a empresa **DSIN**.  
