---
titolo: "Skill Claude Code: principi di design del software"
descrizione: "Una skill per Claude Code — 20 principi di design (SOLID, DDD, Value Object...) e un playbook per estrarre codice da una god-class legacy, testata su un progetto reale e pubblicata open source in coppia con ponytail."
stato: "in-sviluppo"
categoria: "AI Tooling"
data: 2026-08-14
tag: ["Claude Code", "AI", "software design", "ponytail", "open source"]
commenti: true
---

## Il ragionamento

Avevo due file markdown personali — principi di design (SOLID, DDD, Value Object, eccezioni specifiche...) e un playbook passo-passo per estrarre un flusso da una god-class legacy senza romperla — nati da un refactoring vero fatto su un progetto Java aziendale. Buoni per me, inutili per Claude Code finché restavano due file su un desktop: nessuna skill li caricava, nessun task li consultava prima di scrivere codice.

L'idea: trasformarli in una skill vera. Non un riassunto, non un "prompt migliorato" — un file che Claude Code carica da solo quando il task lo richiede, con una checklist operativa e 20 principi ciascuno corredato di "quando NON applicarlo" (la parte che quasi tutte le guide di clean code saltano, ed è quella che previene l'abuso una volta superata la fase "non li conoscevo").

## Come ci sono arrivato

Costruita la skill, il passo successivo ovvio era: funziona davvero, o è solo teoria ben scritta? L'ho testata sul progetto [Wedding SaaS](/idee/wedding-saas) — la piattaforma per matrimoni che avevo già costruito come proof of concept. Non una demo, un codebase vero con backend Spring Boot e frontend Angular.

Ha trovato due bug reali. Il primo: un `RuntimeException` generico che un service Java lanciava per "utente non trovato" veniva silenziosamente mappato a un errore 500 invece di un 404 — trovato leggendo l'exception handler globale, non intuito. Corretto e verificato con la suite di test esistente. Il secondo, lato frontend: un service Angular singleton che teneva il conteggio delle notifiche non lette senza resettarlo al logout — un bug di stato condiviso che sopravvive al confine sbagliato, esattamente il tipo di cosa che una checklist scritta bene fa notare prima che diventi un ticket.

Poi ho seguito per intero il playbook di estrazione — dodici step, non solo i primi due — su un componente Angular che faceva troppe cose insieme (paginazione, upload, lightbox, export ZIP, moderazione). Lo Step 0 (mappa le dipendenze prima di toccare qualcosa) ha scoperto che un'altra parte dell'app aveva già una sua copia, leggermente diversa, della stessa funzionalità — esattamente la situazione per cui quello step esiste.

## Le sfide tecniche che non mi aspettavo

**Generalizzare senza perdere la sostanza.** I documenti originali erano pieni di riferimenti a un progetto Java specifico — nomi di classi, package aziendali, dettagli JDBC/Ant. Riscriverli come principi realmente riusabili su qualsiasi progetto, mantenendo esempi concreti invece di annacquare tutto in pseudocodice generico, è stato più delicato di quanto pensassi.

**Un principio che non copriva il caso reale.** Il principio sulla concorrenza era scritto pensando solo al server (thread multipli su richieste concorrenti). Testandolo su codice frontend, non copriva un bug reale che ho trovato lì: uno stato singleton lato client che sopravvive a un login/logout invece che a una richiesta HTTP. Ho dovuto riscrivere il principio per coprire entrambe le manifestazioni — stessa causa (stato condiviso oltre il suo confine), sintomi diversi a seconda di dove gira il codice. Prova diretta che "vale per ogni linguaggio" va verificato, non solo dichiarato.

**Farla convivere con ponytail**, l'altra skill attiva nella stessa sessione — quella che spinge nella direzione opposta, "il codice più lazy che funziona". Le due sembrano in tensione (una spinge a strutturare, l'altra a cancellare) ma si tengono a vicenda: ponytail impedisce a questa skill di produrre over-engineering applicato senza giudizio, questa skill impedisce a "YAGNI" di diventare una scusa per non testare o non isolare un fix. Le ho pubblicate insieme, con una sezione dedicata nel README che spiega come si completano.

## Da skill a plugin

Pubblicarla come repo GitHub con un `SKILL.md` da clonare a mano andava bene per me, ma aveva un limite concreto: chi la installa resta fisso al commit clonato, senza aggiornamenti. Nel frattempo ho anche installato la stessa skill su Jarvis (il mio agent personale, non collegato a Claude Code) senza cambiare un carattere — il formato `SKILL.md` segue lo standard aperto agentskills.io, quindi ciò che scrivi per un host funziona sull'altro. Prova diretta che valeva la pena investire nel formato giusto fin dall'inizio invece che in qualcosa di specifico per un solo prodotto.

Per risolvere il problema dell'aggiornamento, l'ho impacchettata come plugin Claude Code vero (marketplace + manifest, installabile con `/plugin install` invece del clone manuale) — stessa struttura che usa ponytail, ridotta all'essenziale: niente comandi, niente server MCP, solo la skill.

Poi mi sono chiesto se valesse la pena renderla "always-on" come ponytail, che si attiva a ogni sessione tramite un hook. Risposta: solo in parte. Ho aggiunto un hook che parte all'avvio della sessione, controlla se la cartella di lavoro somiglia a un vero progetto software (un repository git, o un file di manifest come `package.json`/`pom.xml`/`go.mod`, cercato anche un paio di livelli sotto per beccare i monorepo con `backend/`+`frontend/` separati), e solo se sì mostra la checklist operativa — letta al volo dal file della skill, non duplicata, per non disallinearsi mai. Il criterio resta volutamente grezzo: un hook di avvio sessione parte prima ancora che tu scriva il primo messaggio, quindi non può indovinare se il task servirà davvero i principi — quello lo lascio decidere al modello, com'era già.

## Cosa rimane da capire

Il campione di validazione è ancora piccolo — un solo progetto, due linguaggi, una manciata di file. Non l'ho ancora provata su un caso vero di god-class in produzione (quello per cui il playbook esiste davvero), né fuori dall'ecosistema Java/TypeScript. È "provata una volta", non "provata". La logica dell'hook l'ho testata isolata (tre scenari: repo con git alla radice, monorepo senza git ma con marker annidati, cartella senza nulla) ma non dentro una sessione Claude Code reale — non avevo modo di avviarne una da qui.

Codice e documentazione (in inglese) su [GitHub](https://github.com/gufettonerd-arch/software-design-principles). Va installata insieme a [ponytail](https://github.com/DietrichGebert/ponytail), non al suo posto.
