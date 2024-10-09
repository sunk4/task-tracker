package com.roman.task_tracker.helloWorld;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("helloWorld")
@RequiredArgsConstructor
@Tag(name="Hello World")
public class HelloWorldController {
    @GetMapping
    public String helloWorld(){
        return "Hello World";
    }
}
