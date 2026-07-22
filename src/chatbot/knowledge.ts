export type KnowledgeChunk = {
  id: string
  title: string
  path: string
  tags: string[]
  text: string
}

/** Sivuston tietopankki — chatbot hakee vastaukset näistä. */
export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: 'about',
    title: 'Mikä on KuLVI?',
    path: '/',
    tags: ['kulvi', 'yhdistys', 'mikä', 'kuopio', 'lvi', 'historia', '1959', 'tervetuloa'],
    text: `Kuopion LVI-yhdistys ry (KuLVI) on kuopiolainen LVI-suunnittelijoiden, urakoitsijoiden ja kauppiaiden yhdistys. Yhdistys on vuodesta 1959 hoitanut alan yhteistyökuvioita. Motto: Me olemme alan ammattilaisia. KuLVI on Suomen LVI-liitto SuLVI ry:n jäsenyhdistys.`,
  },
  {
    id: 'membership',
    title: 'Jäsenyys',
    path: '/jasenyys',
    tags: [
      'jäsen',
      'jäsenyys',
      'liity',
      'liittyminen',
      'edut',
      'verkosto',
      'koulutus',
      'vaikuttaminen',
    ],
    text: `KuLVI:n jäsenyys tarjoaa tietoa alan kehityksestä, vaikuttamista säädäntöön ja ohjeisiin sekä verkostoitumista kollegoiden kanssa. Kun liityt Kuopion LVI-yhdistykseen, liityt samalla Suomen LVI-liitto SuLVI ry:n jäseneksi. Liittoon kuuluu 29 jäsenyhdistystä ja lähes 4000 henkilöjäsentä. Jäsenyys on henkilökohtainen. Jäsenedut: ammatillinen kehitys, jäsenhintaiset koulutukset, verkosto Kuopiossa ja SuLVI-jäsenyys (Talotekniikka-lehti, valtakunnallinen verkosto).`,
  },
  {
    id: 'join',
    title: 'Näin liityt jäseneksi',
    path: '/jasenyys',
    tags: ['liity', 'liittyminen', 'lomake', 'ohje', 'miten', 'kuinka'],
    text: `Liittyminen tapahtuu SuLVI:n kautta: 1) Avaa SuLVI:n liittymissivu osoitteessa https://sulvi.fi/liity-jaseneksi/ 2) Valitse paikalliseksi jäsenyhdistykseksi Kuopion LVI-yhdistys 3) Saat jäsenmaksulaskun ja pääsyn koulutuksiin, kokouksiin ja jäsenetuihin. Lisäkysymyksiin vastaa sihteeri.`,
  },
  {
    id: 'fees',
    title: 'Jäsenmaksut 2026',
    path: '/jasenyys',
    tags: [
      'jäsenmaksu',
      'maksu',
      'hinta',
      'euro',
      'opiskelija',
      'perhe',
      'puolijäsen',
      'maksut',
    ],
    text: `SuLVI:n jäsenmaksut 2026: varsinaisen jäsenen SuLVI:n osuus 98 €, opiskelijajäsen 0 €, puolijäsenmaksu 49 €, perhejäsenmaksu 49 €, yhteistoimintajäsen 980 €, vakinaisen jäsenen lehtimaksu 58 €. Varsinaisen jäsenen kokonaismaksu muodostuu SuLVI:n osuudesta ja paikallisen yhdistyksen osuudesta (yhteensä noin 98–133 € yhdistyksestä riippuen). Ajantasaiset hinnat: https://sulvi.fi/liity-jaseneksi/ ja https://sulvi.fi/jasenmaksut-ja-alennukset/`,
  },
  {
    id: 'events',
    title: 'Tapahtumat ja kokoukset',
    path: '/tapahtumat',
    tags: [
      'tapahtuma',
      'kokous',
      'kuukausikokous',
      'kalenteri',
      'klubi',
      'milloin',
      'ilta',
    ],
    text: `Kuukausikokoukset pidetään pääsääntöisesti Kuopion Klubilla, Kuninkaankatu 10. Kalenteri sivulla /tapahtumat. Tulevia: 16.9.2026, 21.10.2026, 18.11.2026 ja syyskokous 25.11.2026 klo 19. Lisätietoja: Jorma Kauppinen, 044 545 3158.`,
  },
  {
    id: 'venue',
    title: 'Kokouspaikka',
    path: '/yhteystiedot',
    tags: ['klubi', 'osoite', 'paikka', 'kuninkaankatu', 'kartta', 'missä'],
    text: `Kokouspaikka on Kuopion Klubi, Kuninkaankatu 10, 70100 Kuopio. Kuukausikokoukset pidetään siellä pääsääntöisesti.`,
  },
  {
    id: 'contact',
    title: 'Yhteystiedot',
    path: '/yhteystiedot',
    tags: [
      'yhteys',
      'yhteystiedot',
      'sihteeri',
      'sähköposti',
      'puhelin',
      'ota yhteyttä',
      'kontakti',
    ],
    text: `Sihteeri Petteri Moilanen, sähköposti petteri.moilanen@deekaxair.fi, puhelin 044 599 0788. Postiosoite: Petteri Moilanen, Pankkopolku 20 4A, 70820 Kuopio. Yhteydenottolomake löytyy sivulta /yhteystiedot.`,
  },
  {
    id: 'chair',
    title: 'Puheenjohtaja',
    path: '/hallitus',
    tags: ['puheenjohtaja', 'jorma', 'kauppinen', 'granlund'],
    text: `Puheenjohtaja on Jorma Kauppinen. Tapahtumakyselyt: 044 545 3158, jorma.kauppinen@granlund.fi.`,
  },
  {
    id: 'board',
    title: 'Hallitus',
    path: '/hallitus',
    tags: ['hallitus', 'vastuuhenkilö', 'kuka', 'jäsenet'],
    text: `Hallitus: puheenjohtaja Jorma Kauppinen, varapuheenjohtaja Jari Viiliäinen, sihteeri Petteri Moilanen, taloudenhoitaja Petteri Virranta, koulutuspäällikkö Tommi Hyvärinen, tiedotuspäällikkö Niilo Hänninen, kerhomestari Petteri Moilanen.`,
  },
  {
    id: 'members-area',
    title: 'Jäsensivu',
    path: '/jasensivu',
    tags: ['jasensivu', 'jasenille', 'tiedot', 'lasku', 'päivitys', 'kirjaudu'],
    text: `Jäsensivu vaatii kirjautumisen. Jäsen näkee jäsenaineistot; hallitus näkee myös hallituksen sivun pöytäkirjoineen. Kirjaudu osoitteessa /kirjaudu. Demotunnukset ohjeessa supabase/DEMO.md.`,
  },
  {
    id: 'board-portal',
    title: 'Hallituksen sivu',
    path: '/hallituksen-sivu',
    tags: ['hallituksen', 'poytakirja', 'kirjaudu', 'sisainen'],
    text: `Hallituksen sivu (/hallituksen-sivu) on vain hallitus-roolin tunnuksilla. Siellä on pöytäkirjoja ja sisäisiä raportteja. Julkinen hallituslista on sivulla /hallitus.`,
  },
  {
    id: 'sulvi',
    title: 'SuLVI',
    path: '/',
    tags: ['sulvi', 'liitto', 'suomen', 'valtakunnallinen'],
    text: `Suomen LVI-liitto SuLVI ry on talotekniikka-alan yhteistyö- ja koulutusjärjestö. KuLVI on yksi sen 29 jäsenyhdistyksestä. Liittymällä KuLVI:in olet myös SuLVI:n jäsen. Sivut: https://sulvi.fi/`,
  },
  {
    id: 'training',
    title: 'Koulutus',
    path: '/jasenyys',
    tags: ['koulutus', 'kurssi', 'pätevyys', 'opiskelu'],
    text: `KuLVI järjestää kaikille avoimia koulutuksia yksin ja yhteistyössä oppilaitosten kanssa. Koulutuksissa keskitytään jäsenistön ja pätevyystoiminnan tarpeisiin. Kurssit ovat jäsenille edullisempia.`,
  },
]

export const suggestedQuestions = [
  'Mikä on KuLVI?',
  'Miten liityn jäseneksi?',
  'Paljonko jäsenmaksu maksaa?',
  'Missä kokoukset pidetään?',
  'Kenelle otan yhteyttä?',
]
