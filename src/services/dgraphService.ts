import axios from "axios";
import { useDgraphConfigStore } from "../store/dgraphConfigStore";
import { useTabsStore } from "../store/tabsStore";

interface SchemaObj {
  data: {
    schema: any;
    types: any;
  };
}

async function convertSchemaToText(schemaObj: SchemaObj) {
  const { schema, types } = schemaObj.data;

  // Group predicates by type
  const predicatesByType: { [key: string]: any[] } = {};
  for (const predicate of schema) {
    if (!predicate.predicate.startsWith('dgraph.')) {
      if (!predicatesByType[predicate.type]) {
        predicatesByType[predicate.type] = [];
      }
      predicatesByType[predicate.type].push(predicate);
    }
  }

  let schemaText = '';
  // Iterate through each type
  for (const type in predicatesByType) {
    schemaText += `# ${type.toUpperCase()} Predicates\n`;
    for (const predicate of predicatesByType[type]) {
      schemaText += `    <${predicate.predicate}>: `;
      if (predicate.list) {
        schemaText += `[${predicate.type}]`;
      } else {
        schemaText += predicate.type;
      }
      if (predicate.index) {
        schemaText += ' @index(' + predicate.tokenizer.join(", ") + ')';
      }
      if (predicate.reverse) {
        schemaText += ' @reverse';
      }
      schemaText += ' .\n';
    }
    schemaText += '\n';
  }

  schemaText += '# Types\n';
  for (const type of types) {
    if (!type.name.startsWith('dgraph.')) {
      schemaText += `type <${type.name}> {\n`;
      for (const field of type.fields) {
        if (!field.name.startsWith('dgraph.')) {
          schemaText += `  ${field.name}\n`;
        }
      }
      schemaText += '}\n\n';
    }
  }

  return schemaText;
}


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

  async query(q: any, tabId: number) {
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
      if (q.startsWith('schema {') && q.endsWith('}')) {
        response.data = await convertSchemaToText(response.data);
        useTabsStore.getState().updateTabContent(tabId, response.data, response.data);
      } else {
        useTabsStore.getState().updateTabContent(tabId, q, response.data);
      }
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
