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

Poi ho seguito per intero il playbook di estrazione — quattordici step, non solo i primi due — su un componente Angular che faceva troppe cose insieme (paginazione, upload, lightbox, export ZIP, moderazione). Lo Step 0 (mappa le dipendenze prima di toccare qualcosa) ha scoperto che un'altra parte dell'app aveva già una sua copia, leggermente diversa, della stessa funzionalità — esattamente la situazione per cui quello step esiste. L'ultimo step, aggiunto dopo, è una rilettura a mente fresca della classe finita: alcuni principi si notano solo quando il flusso sta in piedi da solo, non durante l'estrazione pezzo per pezzo.

## Le sfide tecniche che non mi aspettavo

**Generalizzare senza perdere la sostanza.** I documenti originali erano pieni di riferimenti a un progetto Java specifico — nomi di classi, package aziendali, dettagli JDBC/Ant. Riscriverli come principi realmente riusabili su qualsiasi progetto, mantenendo esempi concreti invece di annacquare tutto in pseudocodice generico, è stato più delicato di quanto pensassi.

**Un principio che non copriva il caso reale.** Il principio sulla concorrenza era scritto pensando solo al server (thread multipli su richieste concorrenti). Testandolo su codice frontend, non copriva un bug reale che ho trovato lì: uno stato singleton lato client che sopravvive a un login/logout invece che a una richiesta HTTP. Ho dovuto riscrivere il principio per coprire entrambe le manifestazioni — stessa causa (stato condiviso oltre il suo confine), sintomi diversi a seconda di dove gira il codice. Prova diretta che "vale per ogni linguaggio" va verificato, non solo dichiarato.

**Farla convivere con ponytail**, l'altra skill attiva nella stessa sessione — quella che spinge nella direzione opposta, "il codice più lazy che funziona". Le due sembrano in tensione (una spinge a strutturare, l'altra a cancellare) ma si tengono a vicenda: ponytail impedisce a questa skill di produrre over-engineering applicato senza giudizio, questa skill impedisce a "YAGNI" di diventare una scusa per non testare o non isolare un fix. Le ho pubblicate insieme, con una sezione dedicata nel README che spiega come si completano.

## Da skill a plugin

Pubblicarla come repo GitHub con un `SKILL.md` da clonare a mano andava bene per me, ma aveva un limite concreto: chi la installa resta fisso al commit clonato, senza aggiornamenti. Nel frattempo ho anche installato la stessa skill su Jarvis (il mio agent personale, non collegato a Claude Code) senza cambiare un carattere — il formato `SKILL.md` segue lo standard aperto agentskills.io, quindi ciò che scrivi per un host funziona sull'altro. Prova diretta che valeva la pena investire nel formato giusto fin dall'inizio invece che in qualcosa di specifico per un solo prodotto.

Per risolvere il problema dell'aggiornamento, l'ho impacchettata come plugin Claude Code vero (marketplace + manifest, installabile con `/plugin install` invece del clone manuale) — stessa struttura che usa ponytail, ridotta all'essenziale: niente comandi, niente server MCP, solo la skill.

Poi mi sono chiesto se valesse la pena renderla "always-on" come ponytail, che si attiva a ogni sessione tramite un hook. Risposta: solo in parte. Ho aggiunto un hook che parte all'avvio della sessione, controlla se la cartella di lavoro somiglia a un vero progetto software (un repository git, o un file di manifest come `package.json`/`pom.xml`/`go.mod`, cercato anche un paio di livelli sotto per beccare i monorepo con `backend/`+`frontend/` separati), e solo se sì mostra la checklist operativa — letta al volo dal file della skill, non duplicata, per non disallinearsi mai. Il criterio resta volutamente grezzo: un hook di avvio sessione parte prima ancora che tu scriva il primo messaggio, quindi non può indovinare se il task servirà davvero i principi — quello lo lascio decidere al modello, com'era già.

## Cosa rimane da capire

Il campione di validazione *reale* è cresciuto oltre Wedding SaaS: due round completi su un'app Java 7/8 legacy vera del lavoro (Struts 1.x, WebSphere, encoding ISO-8859-1 da preservare), non un progetto scelto per essere comodo. Confronto a tre — baseline, con skill attiva, e una sessione a cui non ho detto nulla sulla skill, per vedere se si attiva da sola. Primo round: baseline e con-skill convergono quasi identici sullo stesso task di estrazione; la divergenza vera è tra due sessioni *entrambe* con la skill attiva che interpretano lo scope in modo diverso — 36 righe spostate contro oltre 1400. Secondo round: ho fissato lo scope esplicitamente nel task per chiudere quell'ambiguità, e ha funzionato — ma ne è emersa una nuova, quanti dei chiamanti reali vengono davvero aggiornati per usare il nuovo codice (0 su 3, 1 su 2, 3 su 3 a seconda della sessione, stesso task identico). La sessione senza menzione esplicita della skill si è auto-invocata nel primo round ma non nel secondo, sullo stesso tipo di task — incoerenza ancora da capire, non ancora spiegata.

Il benchmark sintetico è arrivato a completezza: tutti i 20 principi (14 su snippet di codice, 6 su scenari architetturali), non più solo otto, ciascuno a quattro letture indipendenti. Il risultato di fondo tiene su scala: recall quasi perfetto su entrambi gli arm, precisione della skill nettamente sopra baseline. Un limite resta genuinamente aperto: su un caso di calibrazione DRY il modello ragiona per conteggio di istanze invece che per significato in una quota robusta di run, anche con la skill attiva — tre tentativi diversi di correggerlo nel testo del principio, tre fallimenti verificati, nessun quarto tentativo in programma finché non ho un'idea davvero diversa. Un limite simile ma più sottile, invece, l'ho chiuso: un caso in cui la skill, pur sapendo dell'eccezione corretta, argomentava che uno specifico snippet non vi rientrava comunque — chiuso con una seconda modifica mirata al testo del principio, verificata pulita tre volte su tre dopo la correzione.

Il metodo di scoring stesso aveva un buco: un verdetto solo (segnala/non segnala) confondeva "ha ragionato sul punto giusto e ha concluso bene" con "non l'ha mai guardato, ha trovato altro di vero". Diviso in due assi — ha contraddetto il punto specifico, sì o no; l'ha affrontato esplicitamente o è rimasto silenzioso — e testato alla cieca su cinque principi. Risultato non banale: su due (case file puliti) lo split combacia esattamente con l'arm, con-skill sempre esplicito, baseline sempre silenzioso — una differenza reale che il vecchio punteggio nascondeva. Su un altro (il case file col confound più grave di oggi) nessuno split, silenzio su entrambi gli arm — il rumore del test travolge tutti allo stesso modo. Su un altro ancora è successo il contrario: con-skill ha ragionato di più ma è arrivato alla conclusione sbagliata. Quattro storie diverse da un unico strumento, non una sola conferma comoda.

La logica dell'hook l'ho testata isolata (tre scenari: repo con git alla radice, monorepo senza git ma con marker annidati, cartella senza nulla) ma non dentro una sessione Claude Code reale — non avevo modo di avviarne una da qui.

Codice e documentazione (in inglese) su [GitHub](https://github.com/gufettonerd-arch/software-design-principles). Va installata insieme a [ponytail](https://github.com/DietrichGebert/ponytail), non al suo posto.
