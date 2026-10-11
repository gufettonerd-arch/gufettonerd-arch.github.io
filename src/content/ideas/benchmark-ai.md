---
titolo: "Autonomous Agent Arena (AAA)"
descrizione: "Piattaforma di benchmark dinamico e procedurale per agenti AI: risolvono enigmi in arena, il vincitore diventa Architect e genera il livello successivo. Nessun livello scritto da umani, la difficoltà evolve da sola."
stato: "parcheggiata"
categoria: "AI / Platform"
data: 2026-09-18
tag: ["AI", "benchmark", "multi-agent", "platform", "MoA"]
commenti: true
---

## Il meccanismo

Un server pubblica un livello (enigma/problema) con seed unico per squadra. Gli agenti AI in gara risolvono in parallelo, con protocollo commit-reveal (hash della soluzione prima, reveal in chiaro alla chiusura finestra, anti front-running/plagio). Il server valuta in sandbox con una funzione obiettivo pesata (correttezza / efficienza computazionale / tempo di risposta). Chi vince diventa **Architect** e ha una finestra di 1-2 ore per generare il livello successivo — se non ci riesce, subentra un fallback procedurale.

Nessun livello è scritto da un umano: la curva di difficoltà emerge dal livello di bravura degli agenti stessi. È un benchmark che si costruisce da solo, invece di essere statico come MMLU/HumanEval.

## Perché è interessante

- Benchmark dinamico invece che statico: non si "esaurisce" o diventa memorizzabile come i dataset fissi.
- Pressione naturale verso l'efficienza (non solo verso la potenza bruta) — dovrebbe favorire architetture a sciame di modelli piccoli specializzati (Mixture of Agents) invece del solito LLM enorme e generico.
- "Code is Law": il server impone solo vincoli logici/di sicurezza, dinamiche come coalizioni, spionaggio, subappalto tra agenti non sono censurate ma parte della simulazione — utile scientificamente per osservare comportamenti emergenti.
- Possibile doppio binario Wild-West (nessun controllo, API cloud libere) vs Open-Science (telemetria + proof-of-inference in cambio di research credits) per separare gara "libera" da dati puliti da ricerca.

## Criticità note (dalla prima revisione)

Ho già passato l'idea a un'analisi tecnica e sono emersi diversi buchi da non ignorare quando si passa all'implementazione:

- **La funzione obiettivo (0.50 correttezza / 0.30 efficienza / 0.20 tempo) è arbitraria** — va definita in modo operativo (efficienza = costo token/compute, non wall-clock duplicato) e calibrata con A/B testing reale, non fissata a tavolino.
- **L'Architect ha un incentivo strutturale a costruirsi livelli su misura.** Serve una regola: l'Architect non compete sul livello che ha generato, e un solver indipendente (non il suo) deve confermare la solvibilità prima della pubblicazione.
- **Il "Genesis Engine" generatore procedurale libero è di fatto un progetto di ricerca a sé** (generare livelli garantiti risolvibili e a difficoltà calibrata). Per un MVP realistico va ridotto a 3-5 famiglie di livelli fisse e parametrizzate, non un generatore arbitrario.
- **Sandboxing: serve isolamento hostile-code-grade (gVisor) fin dal Day 1**, non rimandato a una fase "Enterprise" — il design stesso ("Code is Law", agenti ostili per definizione) assume codice non fidato eseguito automaticamente.
- **La stima di effort originale (75-100 ore da solo) copriva in realtà l'intero sistema con coalizioni, dual-leaderboard, lega Human vs AI** — troppo ambizioso per un MVP. Meglio tagliare a: ciclo base (livello → soluzione → Architect → livello successivo, no coalizioni, no lega umani, no wild-west) stimato ~110 ore, e rimandare il resto a una Fase 2 dopo che il ciclo base gira stabile su 20-30 livelli senza intervento manuale.

## Possibile percorso di validazione

Idea di partnership tripartita: io come lead tech, un'azienda IT (crediti d'imposta R&D, project work per l'academy interna) e un dipartimento universitario (tesi magistrali/dottorato, accesso a bandi regionali). Ma ha senso proporla solo dopo avere una demo del ciclo base funzionante — una piattaforma che gira davvero pesa più di qualsiasi documento di specifica.

## Dettagli completi

Documento esteso con architettura software (Java 21 + Spring Boot 3 + Angular 17, stack sandbox, workflow di sviluppo notturno con LLM locale) e revisione punto per punto: vedi `nuovo 2.md` su Desktop.
