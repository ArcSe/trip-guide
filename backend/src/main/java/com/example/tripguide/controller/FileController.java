package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Event;
import com.example.tripguide.repository.eventrepository.EventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api")
public class FileController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${spring.images.path}")
    private String imagePath;

    private EventRepository eventRepository;

    @Autowired
    public FileController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @PutMapping("/event/cover")
    public ResponseEntity uploadEventCover(@RequestParam Long id,
                                 @RequestBody MultipartFile imageFile) throws IOException {
        if (imageFile == null) {
            Path filePath = Paths.get(this.imagePath, id.toString());
            Files.createDirectories(filePath);
            return ResponseEntity.ok().build();
        }

        Event event = this.eventRepository.getOne(id);
        Path filePath = Paths.get(this.imagePath, id.toString(),
                imageFile.getOriginalFilename());

        try {
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, imageFile.getBytes());
            event.setCover("/" + id.toString() + "/" + imageFile.getOriginalFilename());
            this.eventRepository.save(event);
        } catch (Exception e) {
            throw new BadRequestException(e.getLocalizedMessage());
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/event/photos")
    public ResponseEntity uploadEventPhotos(@RequestParam Long id,
                                  @RequestBody MultipartFile[] imageFiles) throws IOException {
        if (imageFiles == null || imageFiles.length == 0) {
            Path filePath = Paths.get(this.imagePath, id.toString());
            Files.createDirectories(filePath);
            return ResponseEntity.ok().build();
        }

        for (MultipartFile imageFile: imageFiles) {
            Path filePath = Paths.get(this.imagePath, id.toString(),
                    imageFile.getOriginalFilename());

            try {
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, imageFile.getBytes());
            } catch (Exception e) {
                throw new BadRequestException(e.getLocalizedMessage());
            }
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/event/cover")
    public ResponseEntity<?> getEventCover(@RequestParam Long id) {
        Event event = this.eventRepository.getOne(id);
        String cover = event.getCover();

        if (cover == null) {
            cover = "cover.png";
        }

        return ResponseEntity.ok(Collections.singletonMap("response", cover));
    }

    @GetMapping(value = "/event/photos")
    public ResponseEntity<?> getEventPhotos(@RequestParam Long id) {
        Event event = this.eventRepository.getOne(id);
        String cover = event.getCover();

        Path path = Paths.get(this.imagePath, id.toString());
        List<String> photos = new ArrayList<>();

        try (Stream<Path> paths = Files.walk(path)) {
            photos = paths
                    .filter(Files::isRegularFile)
                    .map(p -> p.subpath(p.getNameCount() - 2, p.getNameCount()))
                    .map(Path::toString)
                    .collect(Collectors.toList());
        } catch (Exception e) {
        }

        return ResponseEntity.ok(Collections.singletonMap("response", photos));
    }
}