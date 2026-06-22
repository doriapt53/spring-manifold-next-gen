package org.apache.manifoldcf.core.connector;

import org.apache.manifoldcf.core.document.RepositoryDocument;
import reactor.core.publisher.Mono;

public non-sealed interface OutputConnector extends Connector {
    Mono<Void> send(RepositoryDocument document);
}
