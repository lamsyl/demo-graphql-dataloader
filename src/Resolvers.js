const resolvers = {
  Query: {
    ping: async (parent, args, context) => {
      return "pong";
    },

    someSongs: async (parent, args, context) => {
      const result = await context.repo.queryAllSongs();
      return result;
    },
  },

  Person: {
    id: (person) => person.id,
    name: (person) => person.name,
  },

  // // Without dataloader. This will introduce N+1 query problem.
  // Song: {
  //   id: (song) => song.id,
  //   title: (song) => song.title,
  //   performer: async (song, args, context) => {
  //     if (song.performer_id == null) {
  //       return null;
  //     }
  //     const result = await context.repo.queryPersonByID(song.performer_id);
  //     return result;
  //   },
  //   writer: async (song, args, context) => {
  //     if (song.writer_id == null) {
  //       return null;
  //     }
  //     const result = await context.repo.queryPersonByID(song.writer_id);
  //     return result;
  //   },
  // },

  // With trivial dataloader. This does NOT resolve N+1 problem but can deduplicate requests.
  Song: {
    id: (song) => song.id,
    title: (song) => song.title,
    performer: async (song, args, context) => {
      if (song.performer_id == null) {
        return null;
      }
      const result = await context.repo.loadPersonByID(song.performer_id);
      return result;
    },
    writer: async (song, args, context) => {
      if (song.writer_id == null) {
        return null;
      }
      const result = await context.repo.loadPersonByID(song.writer_id);
      return result;
    },
  },

};

module.exports = {
  resolvers,
};
