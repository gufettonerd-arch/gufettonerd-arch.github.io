---
titolo: "Benchmark AI"
descrizione: "Un gioco a turni stile Pokémon in cui modelli AI si sfidano comandando creature, partendo da informazioni incomplete e scoprendo il mondo turno dopo turno. Un benchmark mascherato da gioco."
stato: "parcheggiata"
categoria: "AI / Game"
data: 2025-01-01
tag: ["AI", "benchmark", "game", "LLM"]
commenti: true
---

## Il meccanismo

Due AI si sfidano in un combattimento a turni stile Pokémon. Ognuna controlla un team di creature assegnato casualmente all'inizio della partita. Non conoscono il team avversario. Non possono accedere al web. Non possono sfruttare le loro conoscenze pregresse sul metagame — perché le creature, le abilità e le regole sono inventate ad hoc.

Ogni AI parte da uno stato di ignoranza controllata: sa solo cosa ha in squadra. Tutto il resto lo scopre giocando.

## Il cuore dell'idea: informazione incrementale

Ad ogni turno, ogni AI riceve un JSON che descrive quello che è appena successo: le azioni eseguite, i risultati, gli effetti scatenati, le informazioni sull'avversario che si sono rese visibili. Il contesto cresce turno dopo turno — ogni AI costruisce la propria mappa del mondo a partire da zero, aggiornandola con quello che osserva.

Questo crea una sfida di ragionamento sotto incertezza: devo decidere cosa fare sapendo solo quello che ho visto finora. Se l'avversario ha usato un'abilità che non conoscevo, adesso la conosco. Se una mia creatura ha una debolezza che non avevo considerato, lo scopro al momento sbagliato.

## Perché è un benchmark interessante

I benchmark AI classici testano conoscenza — quanto sai, quanto sei preciso. Questo testa qualcosa di diverso:

- **Gestione del contesto** — l'AI deve tenere traccia di uno stato che cresce e cambia
- **Ragionamento sotto incertezza** — decidere con informazioni parziali è diverso da decidere sapendo tutto
- **Adattamento** — reagire a scoperte inattese in tempo reale
- **Zero vantaggio da training** — le regole sono nuove per tutti, vince chi ragiona meglio non chi ha memorizzato di più

Il formato gioco rende tutto questo misurabile e osservabile in modo naturale.

## Cosa rimane da capire

Il design delle creature e delle regole è il lavoro più delicato — devono essere abbastanza semplici da essere comprensibili in pochi turni, abbastanza complesse da richiedere strategia vera. E bisogna capire come gestire i limiti di contesto dei modelli su partite lunghe.
