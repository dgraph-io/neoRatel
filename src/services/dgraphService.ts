import axios from "axios";
import { useDgraphConfigStore } from "../store/dgraphConfigStore";
import useResultStore from '../store/resultStore';

class DgraphService {
  currentUrl: null;
  constructor() {
    this.currentUrl = null;
  }

  sanitizeUrl(url: string) {
    // Add http if a scheme is not specified.
    if (!/^[a-zA-Z][a-zA-Z+.-]*?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    const parser = document.createElement("a");
    parser.href = url;
    return this.ensureNoSlash(
      `${parser.protocol}//${parser.host}${parser.pathname}`
    );
  }

  ensureNoSlash(path: string) {
    if (path.endsWith("/")) {
      return path.substring(0, path.length - 1);
    }
    return path;
  }

  async query(q: any) {
    const { serverUrl, slashApiKey, authToken } =
      useDgraphConfigStore.getState();
    if (serverUrl !== this.currentUrl) {
      this.currentUrl = this.sanitizeUrl(serverUrl);
    }
    try {
      const response = await axios.post(this.currentUrl + "/query", q, {
        headers: {
          "X-Auth-Token": slashApiKey,
          "X-Dgraph-AuthToken": authToken,
          "Content-Type": "application/dql",
        },
      });
      // Set the result in the Zustand store
      useResultStore.getState().setResult(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data from Dgraph:", error);
    }
  }

  async mutate(mutation: any) {
    const { serverUrl, slashApiKey, authToken } =
      useDgraphConfigStore.getState();
    if (serverUrl !== this.currentUrl) {
      this.currentUrl = this.sanitizeUrl(serverUrl);
    }
    try {
      const response = await axios.post(
        this.currentUrl + "/mutate",
        { setNquads: mutation },
        {
          headers: {
            "X-Auth-Token": slashApiKey,
            "X-Dgraph-AuthToken": authToken,
            "Content-Type": "application/dql",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error mutating data on Dgraph:", error);
    }
  }
}

export default new DgraphService();
