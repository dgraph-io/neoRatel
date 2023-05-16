import axios from "axios";
import { ADD_NAMESPACE, DELETE_NAMESPACE, RESET_PASSWORD, EXPORT, SHUTDOWN, LOGIN_MUTATION } from "./graphql/mutations";
import { LIST_NAMESPACES } from "./graphql/queries";

class DgraphAdminService {
    async query(query: string, clusterUrl: string) {
        try {
            const response = await axios.post(clusterUrl , { query });
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Error fetching data from Dgraph:", error);
        }
    }

    async mutate(mutation: string, clusterUrl: string, variables?: any) {
        try {
            const response = await axios.post(clusterUrl + "admin", {
                query: mutation,
                variables
            });
            return response.data;
        } catch (error) {
            console.error("Error mutating data on Dgraph:", error);
        }
    }
    async addNamespace(password: string, clusterUrl: string) {
        return this.mutate(ADD_NAMESPACE, clusterUrl , { password });
    }

    async listNamespaces(clusterUrl: string) {
        return this.query(LIST_NAMESPACES, clusterUrl);
    }

    async deleteNamespace(namespaceId: number, clusterUrl: string) {
        return this.mutate(DELETE_NAMESPACE, clusterUrl , { namespaceId });
    }

    async resetPassword(userId: string, password: string, namespace: number, clusterUrl: string) {
        return this.mutate(RESET_PASSWORD, clusterUrl , { userId, password, namespace });
    }

    async login(userId: string, password: string, namespace: number, clusterUrl: string) {
        return this.mutate(LOGIN_MUTATION, clusterUrl , { userId, password, namespace });
    }

    async export(format: string, namespace: number, clusterUrl: string) {
        return this.mutate(EXPORT, clusterUrl , { format, namespace });
    }

    async shutdown(clusterUrl: string) {
        return this.mutate(SHUTDOWN, clusterUrl);
    }

}

export default new DgraphAdminService();