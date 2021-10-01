# prosjekt2

COMMITS: 
trenger en array med brukernavn og en array med antall, sortert i samme rekkefølge 

MERGE: 
trenger en array med datoer og en array med antall merges den datoen, sortert i samme rekkefølge.


TODOS (lag issues): 
- Fjerne "template" ting
- Fikse promise; hente info 
- Fikse grid 
- Fikse generell styling 
- Behandle json-objekter til arrays som nevnt over 
- Gjøre skalerbart for mobil/nettbrett
- Skrive tester
- Skrive dokumentasjon
- Context api 
- Spør studass om "egne komponenter" kl.14-18
- web/session- storage: siste søk og color theme


Innhold og Funksjonalitet:
Prosjektet vi valgte var en nettside som viser "repository data" fra gitlab. Valget var resultatet av en idémyldring der vi diskuterte de enkelte gruppemedlemmenes tidligere erfaringer med React og REST API. På grunnlag av dette kom frem til et prosjekt som virket utfordrende, men overkommelig.

Vi har valgt å bruke CSS-Grid for å plassere elementer på siden. Argumentet for dette er at vi følte vi hadde bedre forståelse for denne løsningen fremfor CSS-Flexbox fra prosjekt 1. Vi implementerte et responsivt web design ved å bruke @media screen og viewport i kombinasjon med CSS-grid.

Tekniske krav:

Typescript
Vi har skrevet koden i typescript, etter krav i oppgavebeskrivelsen. Dette var nytt for mange på gruppen, men tilvendingen gikk fort. Her fantes det også god dokumentasjon på nettet.

React js, vise komponentene som både class og funksjonelle funksjoner. Hensiktsmessig komponentstruktur. MÅ FYLLES UT!!

Bruk av props og state, samt vise bruk av Context APIet. MÅ FYLLES UT!!

UI-komponenter fra eksterne bibliotek. MÅ FYLLES UT!!

HTML Web Storage
De tekniske kravene sa at vi skulle bruke HTML web storage, derav local storage og session storage, i applikasjonen. Local storage bestemte vi oss å bruke for å lagre valgte datoer og valgt action i søkefunksjonen. Grunnen til dette er fordi det virker logisk at forrige søk blir lagret, slik at denne ikke står tom når økten er ferdig. Den kunne også vært lagret som session storage, og det valget av storage falt på var en felles beslutning. Vi bruker session storage for å sjekke hvor mange ganger nettsiden har blitt reloaded. Dette er en enkel løsning, men ettersom vi brukte en del tid på å implementere local storage spurte vi studass om dette var tilstrekkelig, noe han bekreftet.

Responsivt web design
Som nevnt tidligere i delen om funksjonalitet har vi brukt CSS-grid i kombinasjon med @media screen og viewport for å forsikre et repsonsivt design av nettsiden. Dette har vi testet på forskjellige skjermtyper, derav mobil, nettbrett og pc. Dette er gjort manuelt ved å koble seg på det lokale nettet og ved å teste forskjellige skjerm-dimensjoner i Google Chrome sin web inspector. Det har vært litt knoting underveis med å få det til å fungere optimalt, da elementer endrer på seg og siden må tilpasses deretter. Det var også en av grunnene til at vi valgte CSS-grid, da det var lettere å plassere charts elementene der vi ønsket på nettsiden.

Følgende elementer skal være med i løsningen:
    viewport
    media-queries
    bilder som skaleres
    flytende/fleksibel layout

Testing
Testing i Jest viste seg å være en liten utfordring da dette var nytt for alle på gruppen. Vi var også lenge veldig usikre på hvor høye kravene var, men fikk etterhvert bekreftet dette fra studass. Ved hjelp av studass, samt bruk av google, fikk vi det til tilslutt. Vi har en snapshot-test av nettsiden, som tester.... Ved siden av dette tester vi toggle funksjonen som endrer mellom light- og dark-mode på nettsiden. Vi jobbet også lenge med å prøve å teste search funksjonen, men dette viste seg å være veldig avansert og studass mente det var tilstrekkelig med den testen vi allerede. Det ble også sagt at dette skulle være en introduksjon til tester, og at neste prosjekt har mer fokus på dette. Vi bestemte oss derfor for at testene vi hadde skrevet var tilstekkelige.
