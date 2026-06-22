package org.apache.manifoldcf.runtime.orchestrator;

import org.springframework.stereotype.Service;
import org.apache.manifoldcf.core.connector.RepositoryConnector;
import org.apache.manifoldcf.core.connector.OutputConnector;
import org.apache.manifoldcf.core.result.ScanResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.StructuredTaskScope;
import java.util.List;
import java.util.ArrayList;

@Service
public class JobOrchestrator {
    
    private static final Logger log = LoggerFactory.getLogger(JobOrchestrator.class);

    public void runJob(RepositoryConnector repositoryConnector, OutputConnector outputConnector, String path) {
        log.info("Starting job for path: {}", path);
        
        // Java 25: StructuredTaskScope.open() defaults to "shutdown on failure" behavior
        try (var scope = StructuredTaskScope.open()) {
            
            StructuredTaskScope.Subtask<List<ScanResult>> scanTask = scope.fork(() -> {
                List<ScanResult> results = new ArrayList<>();
                repositoryConnector.scan(path)
                    .flatMap(doc -> outputConnector.send(doc)
                        .thenReturn((ScanResult) new ScanResult.Success(doc.id(), "1.0"))
                        .onErrorResume(e -> reactor.core.publisher.Mono.just(new ScanResult.Failure(doc.id(), e))))
                    .doOnNext(results::add)
                    .blockLast(); 
                return results;
            });
            
            // Java 25: join() throws FailedException if a subtask fails
            scope.join();
            
            List<ScanResult> scanResults = scanTask.get();
            scanResults.forEach(r -> log.info(r.summarize()));
            
            log.info("Job completed successfully.");
            
        } catch (StructuredTaskScope.FailedException e) {
            log.error("Job execution failed due to subtask failure: ", e.getCause());
        } catch (Exception e) {
            log.error("Job execution failed: ", e);
        }
    }
}
