package com.kob.colossusbackend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class ColossusBackendApplicationTests {

    @Test
    void contextLoads() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("123"));
        System.out.println(passwordEncoder.matches("123","$2a$10$1jNSjJwv1ZnnCKaYWvxWB.wcjBKDu8dVRVSoLamXkAgGs6tEqJPbK" ));
    }

}
