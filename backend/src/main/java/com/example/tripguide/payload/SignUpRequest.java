package com.example.tripguide.payload;

import lombok.Data;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SignUpRequest {

    @NotBlank(message = "Имя не может быть пустым")
    private String name;

    @NotBlank(message = "Email не может быть пустым")
    @Email(message = "Email должен быть валидным")
    private String email;

    @NotBlank(message = "Пароль не может быть пустым")
    @Size(min = 6, message = "Пароль должен иметь не менее 6 символов")
    private String password;

    @NotBlank(message = "Пароль не может быть пустым")
    @Size(min = 6, message = "Пароль должен иметь не менее 6 символов")
    private String confirmPassword;

    @AssertTrue(message = "Пароль подтвержден неверно")
    private boolean isPasswordValid() {
        return this.password.equals(this.confirmPassword);
    }
}
