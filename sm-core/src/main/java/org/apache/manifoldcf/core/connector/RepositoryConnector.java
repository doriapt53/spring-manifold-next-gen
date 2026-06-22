package org.apache.manifoldcf.core.connector;

import org.apache.manifoldcf.core.document.RepositoryDocument;
import reactor.core.publisher.Flux;

public non-sealed interface RepositoryConnector extends Connector {
    Flux<RepositoryDocument> scan(String basePath);
}
