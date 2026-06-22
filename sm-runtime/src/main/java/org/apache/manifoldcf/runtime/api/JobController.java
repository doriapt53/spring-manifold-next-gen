package org.apache.manifoldcf.runtime.api;

import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    @GetMapping
    public List<JobDTO> getAllJobs() {
        // Mock data for now, as requested to implement the REST API
        List<JobDTO> jobs = new ArrayList<>();
        jobs.add(new JobDTO("1", "WebCrawler_Sito_A", "Repository", "Running", 12450, LocalDateTime.now().minusHours(1).format(formatter)));
        jobs.add(new JobDTO("2", "FS_Sync_Docs", "Repository", "Paused", 890, LocalDateTime.now().minusDays(1).format(formatter)));
        jobs.add(new JobDTO("3", "SharePoint_Cloud", "Authority", "Error", 0, LocalDateTime.now().minusHours(2).format(formatter)));
        jobs.add(new JobDTO("4", "Slack_History", "Output", "Finished", 56200, LocalDateTime.now().minusDays(1).format(formatter)));
        jobs.add(new JobDTO("5", "Jira_Tickets", "Repository", "Ready", 0, "N/A"));
        return jobs;
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJob(@PathVariable String id) {
        return ResponseEntity.ok(new JobDTO(id, "Job " + id, "Repository", "Ready", 0, "N/A"));
    }

    @PostMapping("/{id}/start")
    public ResponseEntity<Void> startJob(@PathVariable String id) {
        System.out.println("Starting job " + id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/stop")
    public ResponseEntity<Void> stopJob(@PathVariable String id) {
        System.out.println("Stopping job " + id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/pause")
    public ResponseEntity<Void> pauseJob(@PathVariable String id) {
        System.out.println("Pausing job " + id);
        return ResponseEntity.ok().build();
    }

    public static record JobDTO(String id, String name, String type, String status, long documents, String lastRun) {}
}
