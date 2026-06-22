package org.apache.manifoldcf.runtime.api;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Random;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/system")
public class SystemController {

    private final Random random = new Random();

    @GetMapping("/status")
    public Map<String, String> getSystemStatus() {
        Map<String, String> status = new HashMap<>();
        status.put("postgres", "UP");
        status.put("redis", "UP");
        status.put("ollama", "UP");
        status.put("system", "HEALTHY");
        return status;
    }

    @GetMapping("/throughput")
    public List<Map<String, Object>> getThroughput() {
        List<Map<String, Object>> throughput = new ArrayList<>();
        String[] hours = {"08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"};
        for (String hour : hours) {
            Map<String, Object> data = new HashMap<>();
            data.put("name", hour);
            data.put("docs", 400 + random.nextInt(2000));
            throughput.add(data);
        }
        return throughput;
    }
}
