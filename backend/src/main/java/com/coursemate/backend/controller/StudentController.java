package com.coursemate.backend.controller;

import com.coursemate.backend.model.Student;
import com.coursemate.backend.service.StudentService;
import com.coursemate.backend.model.PasswordChangeRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @PutMapping("/{id}/change-password")
    public Student changePassword(@PathVariable Long id, @RequestBody PasswordChangeRequest request) {
        Student existing = studentService.getStudentById(id);
        if (existing == null) {
            throw new RuntimeException("Student not found");
        }

        if (!existing.getFirstLogin()) {
            String oldPwd = existing.getPassword() != null ? existing.getPassword().trim() : "";
            String inputOldPwd = request.getPassword() != null ? request.getPassword().trim() : "";
            if (!oldPwd.equals(inputOldPwd)) {
                throw new RuntimeException("Old password incorrect");
            }
        }

        return studentService.changePassword(id, request.getNewPassword());
    }

}
