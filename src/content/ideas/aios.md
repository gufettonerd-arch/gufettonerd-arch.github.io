---
titolo: "AIOS"
descrizione: "Un sistema operativo bare-metal che si ottimizza da solo per il silicio su cui gira e impara dall'unico utente che lo usa — senza OS host sotto, senza interfacce permanenti, senza dati che lasciano la macchina."
stato: "parcheggiata"
categoria: "OS / Sistemi"
data: 2026-01-01
tag: ["OS", "sistemi", "AI", "Rust", "open-source"]
commenti: true
---

## Il ragionamento

Ogni sistema operativo moderno è scritto per funzionare su hardware generico, con interfacce universali, per utenti indefiniti. Il risultato è software pieno di compromessi che nessuno ha mai chiesto esplicitamente. L'idea è l'opposto: un OS che si specializza sul chip fisico su cui gira, genera interfacce solo nel momento in cui servono e le smonta quando hai finito, e costruisce un profilo dell'unico utente che lo usa — senza mai condividere quel profilo con nessuno.

Niente host OS sotto. Niente interfaccia grafica sempre accesa. Niente dati che escono dalla macchina.

## Come funziona (ad alto livello)

Il sistema ha due strati distinti che evolvono in modo indipendente.

Il primo è il **corpo**: la rappresentazione interna del kernel, ottimizzata continuamente tramite riscritture verificate contro una suite di benchmark reale. Non si dimostra a priori che una modifica è più veloce — si misura. Le riscritture semanticamente equivalenti vengono verificate una volta e poi applicate efficientemente. Il profilo di ottimizzazione che emerge è specifico per quel silicio — non trasferibile direttamente su un'altra CPU.

Il secondo è il **sé**: un registro persistente di quali azioni compie l'utente, con quale frequenza, con quali parametri. Questa parte non si ottimizza per hardware, si adatta a una persona. E resta sempre locale.

Quando cambi macchina, porti il sé con te. Il nuovo hardware costruisce il proprio corpo; ci incolli sopra la tua storia d'uso. La personalizzazione viaggia, il codice macchina no.

## Le interfacce effimere

L'OS non ha una UI "aperta". Quando esprimi un'intenzione — riprodurre un file, leggere un documento, scrivere un testo — il sistema istanzia solo i servizi necessari, costruisce l'interfaccia minima per soddisfare quella richiesta, e la smonta quando hai finito. È lo stesso pattern delle architetture serverless applicato a livello di sistema operativo invece che di cloud.

Il limite di scope è deliberato: implementare un browser web completo sarebbe un progetto un ordine di grandezza più grande del resto dell'OS messo insieme. La v1 copre un insieme esplicito e ristretto di intenti via accesso diretto ai dati, non via rendering HTML.

## Punto di partenza volutamente ristretto

La fase iniziale si svolge su hardware vecchio e con risorse severe — un vincolo che forza la semplicità invece di permettere di rimandare i problemi di efficienza a hardware più potente. Da lì si generalizza ad altre architetture incrementalmente, nell'ordine in cui aumenta l'adozione, non in quello che sembra più ambizioso sulla carta.

## Il modello di distribuzione

Open source federato. Il repository centrale distribuisce profili "corpo" per architettura; il profilo "sé" dell'utente non esce mai dalla macchina locale. Chi vuole contribuire invia patch di ottimizzazione che passano per CI prima del merge — lo stesso meccanismo di qualunque progetto open source serio. Chi preferisce restare offline ottimizza solo per sé.

## Cosa rimane da capire

Se il guadagno di performance ottenibile via riscrittura automatica su hardware fisso è abbastanza significativo da giustificare la complessità del motore. E se un'interfaccia effimera su richiesta è un'esperienza d'uso che le persone trovano liberatoria o semplicemente scomoda.
