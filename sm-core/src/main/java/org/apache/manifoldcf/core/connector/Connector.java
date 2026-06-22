package org.apache.manifoldcf.core.connector;

public sealed interface Connector permits RepositoryConnector, OutputConnector {
    String getName();
    void connect() throws Exception;
    void disconnect() throws Exception;
}
