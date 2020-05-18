package com.example.tripguide.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Email не может быть пустым")
    @Email(message = "Email должен быть действительным")
    private String email;

    @NotBlank(message = "Пароль не может быть пустым")
    @Size(min = 6, message = "Пароль должен иметь не менее 6 символов")
    private String password;
}
