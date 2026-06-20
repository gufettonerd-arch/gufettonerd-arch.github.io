---
titolo: "Nazione Digitale"
descrizione: "Un esperimento sociale online che rifiuta le logiche del web commerciale. Niente algoritmi, niente engagement manipolativo, niente design persuasivo. Una comunità che decide autonomamente come evolve il sistema che la ospita."
stato: "parcheggiata"
categoria: "Social"
data: 2025-03-01
tag: ["social", "esperimento", "governance"]
commenti: true
---

## Il ragionamento

Quasi ogni piattaforma social esiste per massimizzare il tempo di permanenza degli utenti. L'interfaccia, le notifiche, i feed algoritmici — tutto è progettato per creare dipendenza. L'idea è costruire il contrario: un sistema che non vuole niente da te, che non ti manipola, e che evolve solo se la comunità lo decide collettivamente.

Non è utopia. È un esperimento con regole precise.

## Il Comandamento Zero

Il concetto centrale è la separazione netta tra chi costruisce tecnicamente il sistema ("l'Architetto") e chi ne decide l'evoluzione (la comunità). L'Architetto è un compilatore neutro: traduce in codice le decisioni prese tramite voto, senza esercitare veto estetico o ideologico. L'unica eccezione è la preservazione dell'integrità tecnica e legale del sistema.

In pratica: se la comunità vota per aggiungere una sezione meme, l'Architetto la costruisce. Senza opinioni.

## Come si decide cosa cambia

Non è un sondaggio. Un bot analizza i messaggi della comunità a partire dall'ultimo deploy e individua la richiesta dominante — il "rumore" più forte rispetto al rumore di fondo. Quella richiesta passa poi due filtri prima di diventare codice: fattibilità tecnica (risorse, limiti del framework) e fattibilità legale (GDPR, conformità). Solo a quel punto viene annunciata e schedulata — non implementata all'istante. Questa latenza è voluta: serve a separare il consenso reale da un picco emotivo del momento.

Cosa succede nei casi limite è altrettanto definito quanto il caso normale: stallo perfetto tra fazioni → nessuna azione, status quo; risorse insufficienti → notifica trasparente alla comunità, soluzione demandata al voto; passaggio da anonimato a identità → stop al logging massivo dei contenuti, non solo promessa ma comportamento di sistema. Lo spegnimento è un'opzione reale, non retorica, vincolata a tre condizioni esplicite (voto di maggioranza, insostenibilità economica, insostenibilità legale) — non a un mio giudizio estetico sul progetto.

## Le sfide che non sono tecniche

**Governance reale è difficile.** Dare potere decisionale reale a una comunità online significa anche accettarne le derive. Come si gestisce un voto che porta in direzioni sbagliate? Come si definisce "legale" in modo che non diventi un pretesto per bloccare tutto?

**L'estetica come posizione politica.** L'interfaccia è volutamente terminale: testo monospaziato, niente avatar, niente animazioni, niente bolle di notifica. È una scelta che filtra il pubblico in ingresso — chi cerca TikTok non atterrerà lì.

**La crescita organica o non cresce.** Il progetto rifiuta X/Twitter come canale. Reddit è l'unico vettore di promozione previsto. Funziona solo se l'idea è abbastanza radicale da diffondersi da sola.

## Lo stack pensato

Backend Java/Spring Boot con WebSocket per il real-time, frontend Angular a componenti (per permettere innesti modulari di funzionalità votate dalla comunità), PostgreSQL ibrido relazionale/JSONB per i dati non strutturati che un sistema "tabula rasa" inevitabilmente accumula. Un LLM via API si occupa dell'analisi semantica dei messaggi per il rilevamento del consenso. Git come registro storico immutabile delle evoluzioni — ogni cambiamento è anche un commit, non solo una decisione.

I parametri esatti dell'algoritmo di consenso e la strategia di lancio li tengo per me.

## Cosa rimane da capire

Se l'esperimento regge al primo contatto con utenti reali. Una comunità che governa se stessa è un'idea bella finché è piccola — poi diventa politica.
