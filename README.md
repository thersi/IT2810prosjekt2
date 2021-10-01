# Prosjekt 2, gruppe 37

Prosjektet er basert på Node.js og NPM, og er bygget med react-createapp og med typescript som template. 
Appen kan kjøres ved å skrive `npm start` fra mappen *src*. Testene kjøres fra samme mappe ved å kjøre kommandoen `npm test`


#### Innhold og Funksjonalitet:
Gruppen har laget en SPA som viser frem antall commits per person, og antall merges per dato på en grafisk måte. Valget av hvilken data vi ville visualisere var resultatet av en idémyldring der vi diskuterte de enkelte gruppemedlemmenes tidligere erfaringer med React og REST API. Dataene er hentet fra GitLab-repoet til gruppen ved hjelp av GitLab-APIet. Nettsiden er responsiv, og skalerer godt til alle typer skjermstørrelser, med elementer som er fleksible og flytende. GitLab-dataen er parametrisert ved at en bruker kan velge type data for en gitt periode. Dette lagres i localstorage. 


#### Tekniske krav:

**Typescript**

Prosjektet er kodet i typescript, etter krav i oppgavebeskrivelsen. Dette var nytt for mange på gruppen, men tilvendingen gikk fort da samtlige hadde noe erfaring med Javascript fra tidligere. Det fantes også mye god dokumentasjon på nettet.

**React js**

Vi har laget både class-components (LineChart) og functional-components (BarChart, Search). Vi synes funksjonelle komponenter var greiere å arbeide med, men laget én klasse-komponent per prosjektets krav. Alle komponenter er plassert i en egen *components*-mappe i `src`. Tilhørende tester ligger på samme nivå, men i en *test*-mappe. `App.tsx` har en rekke states som sendes ned komponent-hierarkiet som *props* til komponentene. Komponentene bruker ulike *setState* funksjoner for å endre på staten til `App.tsx`. Vi har brukt ContextAPIet og useContext til å sette color-theme for siden. 

**Eksterne UI-komponenter fra Material-UI**

Vi har valgt å bruke komponenter fra det eksterne biblioteket MUI i Search-komponenten. Dette valget gjorde vi hovedsaklig fordi vi ønsket at komponenten skulle ha en pen "velg til/fra dato"-funksjon, og at å implementere lignende selv ville være for tidkrevende og sannsynligvis resultere i en dårligere estetikk. Vi har også brukt en knapp fra dette biblioteket for toggling av color-theme. Alle steder dette er brukt har vi egen logikk og funksjoner for å styre API-kall, sidens innhold og øvrig funksjonalitet. 

**HTML Web Storage**

De tekniske kravene sa at vi skulle bruke HTML web storage, derav local storage og session storage, i applikasjonen. Local storage bestemte vi oss å bruke for å lagre valgte datoer og valgt action i søkefunksjonen. Grunnen til dette er fordi det virker logisk at forrige søk blir lagret, slik at denne ikke står tom når økten er ferdig. Den kunne også vært lagret som session storage, og det valget av storage falt på var en felles beslutning. Vi bruker session storage for å sjekke hvor mange ganger nettsiden har blitt reloaded. Dette er en enkel løsning, men ettersom vi brukte en del tid på å implementere local storage, samt mangel på "noe å lagre" i session storage spurte vi studass om dette var tilstrekkelig, noe han bekreftet.

**AJAX**

Gruppen har brukt asynkrone API-kall til GitLab APIet ved hjelp av `fetch()`. Dette var en enkel måte å gjøre det på, og vi fant mye dokumentasjon på dette, noe som gjorde det enkelt å ta i bruk. 

**Responsivt web design**

Vi har valgt å bruke CSS-Grid for å plassere elementer på siden. Argumentet for dette er at vi følte vi hadde bedre forståelse for denne løsningen fremfor CSS-Flexbox fra prosjekt 1. Vi implementerte et responsivt web design ved å bruke @media screen og viewport i kombinasjon med CSS-grid. I tillegg har vi bruk mui-grid på search-komponenten, som tilpasser komponentens størrelse basert på skjermstørrelse. Dette har vi testet på forskjellige skjermtyper, derav mobil, nettbrett og pc. Dette er gjort manuelt ved å koble seg på det lokale nettet og ved å teste forskjellige skjerm-dimensjoner i Google Chrome sin web inspector. Det har vært litt knoting underveis med å få det til å fungere optimalt, da elementer endrer på seg og siden må tilpasses deretter. Det var også en av grunnene til at vi valgte CSS-grid, da det var lettere å plassere charts elementene der vi ønsket på nettsiden.

**Testing**

Testing i Jest viste seg å være en liten utfordring da dette var nytt for alle på gruppen. Vi var også lenge veldig usikre på hvor høye kravene var, men fikk etterhvert bekreftet dette fra studass. Ved hjelp av studass, samt bruk av google, fikk vi det til tilslutt. Vi har flere snapshot-tester av nettsiden, som tester at "treet" rendrer slik som forventet. Ved siden av dette tester vi toggle funksjonen som endrer mellom light- og dark-mode på nettsiden, samt rendring av de ulike komponentene. Vi jobbet også lenge med å prøve å teste search funksjonen, men dette viste seg å være veldig avansert og studass mente det var tilstrekkelig med den testen vi allerede. Det ble også sagt at dette skulle være en introduksjon til tester, og at neste prosjekt har mer fokus på dette. Vi bestemte oss derfor for at testene vi hadde skrevet var tilstekkelige.

### Arbeidsprosessen 
Gruppen har laget issues for alle arbeidsoppgaver, og brukt disse aktivt under utviklingen av nettsiden. Arbeid med hvert hvert issue har skjedd i en egen grein, som har blitt merget inn i master ved fullføring av issuet. 
