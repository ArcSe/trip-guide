package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.User;
import com.example.tripguide.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

@RestController("/api")
public class FileUploadController {

    @Value("${upload.path}")
    private String uploadPath;

    private  UserRepository userRepository;

    @Autowired
    public FileUploadController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/usersPhoto/{id}")
    public ResponseEntity<?> loadPhoto(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException,
            URISyntaxException {
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                System.out.println(uploadDir.exists());
                uploadDir.mkdir();
            }

            String fileName = id.toString();

            file.transferTo(new File(uploadPath + "/usersPhoto" + fileName));

            User user = userRepository.getOne(id);
            user.setImageUrl(fileName);

        }
        else {
            throw new BadRequestException("файл пуст");
        }
        return ResponseEntity.ok().build();
    }

}
