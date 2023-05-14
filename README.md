# neoRatel

This is an internal project for Ratel. Codename "NeoRatel".

# Running

Just clone the repository. Run npm install and then npm run dev. And it will already be running.


### Notes

I have created this project while ago. After talking with Akon it was decided that I would create a new repo and share it with the team.
The basic idea is to completely replace the current Ratel. Because he is insanely complex to maintain. My idea was to start from scratch and simpler. I’m using zustand instead of Redux and Vite instead of create react app. The goal is to have fewer dependencies compared to the current one and to be able to move quickly and be as light as possible.

If you can contribute feel free.

# Goals of this project

This project is under development. So we will have bugs, market(dev) standard organization problems and so on.

- [x] Create a new project from scratch
- [x] Use Vite instead of create react app
- [x] Use zustand instead of Redux
- [ ] Organize the project in a better way
- [ ] Create charts - Export results from Zustand to the chart.
- [ ] Create a Proxy to handle cluster the requests
- [ ] Create a binary to run the build
- [ ] Create a Docker compose
- [ ] Create a CI/CD
- [ ] Create an exporter handler (RDF, JSON, CSV, etc)
- [ ] Create a schema builder
- [ ] Create a schema editor
- [ ] Create a schema viewer (As graphs, maybe it should be a builder, editor and viewer in one)
- [ ] Create a GraphQL handler/helper
- [ ] Create a Admin UI
- [ ] Create a Query builder with UI(in blocks)
