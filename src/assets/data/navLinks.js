const links = [
  {
    id: 1,
    link: "Movies",
    keyword: "movie",
    searchWord: "a movie",
    extraLinks: [
      {
        content: "Now Playing",
        navigationTo: "/movies/now_playing",
      },
      {
        content: "Popular",
        navigationTo: "/movies/popular",
      },
      {
        content: "Upcoming",
        navigationTo: "/movies/upcoming",
      },
      {
        content: "Top Rated",
        navigationTo: "/movies/top_rated",
      },
    ],
  },
  {
    id: 2,
    link: "TV Shows",
    keyword: "tv",
    searchWord: "a TV Show",
    extraLinks: [
      {
        content: "Airing Today",
        navigationTo: "/TV/airing_today",
      },
      {
        content: "On The Air",
        navigationTo: "/TV/on_the_air",
      },
      {
        content: "Popular",
        navigationTo: "/TV/popular",
      },
      {
        content: "Top Rated",
        navigationTo: "/TV/top_rated",
      },
    ],
  },
  {
    id: 3,
    link: "Person",
    searchWord: "a person",
    keyword: "person",
    extraLinks: [
      {
        content: "Popular",
        navigationTo: "/person/popular",
      },
    ],
  },
];

export default links;
