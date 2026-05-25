---
titolo: "Wedding SaaS"
descrizione: "Piattaforma B2B per wedding planner e agenzie matrimoniali. Un mercato storicamente poco digitalizzato, con margini interessanti per chi porta strumenti seri."
stato: "in-sviluppo"
categoria: "SaaS"
data: 2025-04-01
tag: ["SaaS", "B2B", "wedding"]
commenti: true
---

## Il ragionamento

Il settore matrimoniale muove cifre importanti ma si regge ancora su Excel, WhatsApp e fogli stampati. I software esistenti o costano troppo per i piccoli planner, o sono gestionali enormi pensati per agenzie strutturate. Lo spazio nel mezzo è quasi vuoto.

## Come ci sono arrivato

Ho costruito una versione reale per uso personale — un proof of concept che mi ha permesso di toccare con mano la complessità del dominio: gestione accessi multi-ruolo, comunicazione con gli invitati, contenuti multimediali ad alta qualità, affidabilità su eventi non rinviabili.

## Le sfide tecniche che non mi aspettavo

**Media pesanti su hardware limitato.** Foto RAW e video 4K su una macchina con HDD meccanico del 2013 ti costringono a ripensare ogni assunzione sul processing: zero compressione lato server, architettura pensata per I/O lento, SQLite in WAL mode per sopravvivere a spegnimenti improvvisi (batteria al 6%).

**Deploy a budget zero.** Niente cloud, niente spesa. La soluzione: Cloudflare Tunnel per l'esposizione pubblica senza aprire porte sul router, Tailscale per la comunicazione interna, Syncthing per il backup real-time dei media. L'infrastruttura è riproducibile in meno di mezz'ora.

**La semplicità come vincolo architetturale.** Monolite, SQLite, Docker Compose con immagini standard. Nessuna dipendenza da servizi esterni che potrebbero cambiare le pricing. Il sistema deve poter girare su qualsiasi laptop con Ubuntu.

## Cosa rimane da capire

Se ha senso come SaaS puro o come prodotto white-label per agenzie. Il modello B2B è interessante ma richiede integrazione con i flussi di lavoro esistenti dei planner, che sono molto eterogenei.

I dettagli implementativi li tengo per me.
