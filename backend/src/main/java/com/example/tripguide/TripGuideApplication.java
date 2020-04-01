package com.example.tripguide;

import com.example.tripguide.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class TripGuideApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripGuideApplication.class, args);
	}

}