---
titolo: "Abitare Insieme"
descrizione: "App per gestire le finanze condivise con la mia compagna: movimenti entrata/uscita, riepilogo mensile, grafici, lista della spesa con spunta e notifiche push. In uso tutti i giorni."
stato: "completata"
categoria: "Personale"
data: 2026-09-01
tag: ["finanze", "personale", "Angular", "Supabase"]
commenti: true
---

## Il problema

Vivere insieme significa fare i conti insieme. Fogli condivisi su Drive, screenshot, "ti rimborso dopo" — tutto scomodo. Volevo qualcosa di veloce da aprire sul telefono, che tenesse traccia di chi ha pagato cosa e dividesse il conto senza pensarci.

## Cosa fa

**Movimenti:** entrate e uscite con data, descrizione, importo, chi ha pagato e categoria. La home mostra il mese corrente con il saldo tra noi due.

**Riepilogo:** aggregato mensile per categoria, quanto ha speso ognuno, quanto deve rimborsare l'altro.

**Grafici:** andamento delle uscite nel tempo, ripartizione per categoria.

**Lista della spesa:** voci da comprare con spunta al momento dell'acquisto. Le spuntate si svuotano in blocco. Real-time: se una aggiunge qualcosa, l'altra lo vede subito.

**Notifiche push:** avviso quando viene inserito un nuovo movimento.

## Stack

Angular 22 standalone, Supabase per auth, database Postgres con row-level security (le policy garantiscono che ognuna veda solo i propri dati), realtime subscriptions per la lista spesa, Edge Functions per le notifiche push con VAPID. Deploy come sito statico su Cloudflare Workers.

## Cosa ho imparato

Supabase RLS è potente ma richiede attenzione: ho scritto policy sbagliate due volte prima che i dati di una non vedessero quelli dell'altra. Le Edge Functions per le notifiche push sono stati il pezzo più lungo — il protocollo VAPID non è banale da implementare da zero.

Nessun backend custom: tutto vive tra le policy del database e quattro Edge Functions. Il codebase è piccolo e manutenibile da una persona sola.
