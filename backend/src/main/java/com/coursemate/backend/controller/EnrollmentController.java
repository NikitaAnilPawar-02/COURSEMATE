package com.coursemate.backend.controller;

import com.coursemate.backend.model.Course;
import com.coursemate.backend.model.Enrollment;
import com.coursemate.backend.model.Student;
import com.coursemate.backend.service.CourseService;
import com.coursemate.backend.service.EnrollmentService;
import com.coursemate.backend.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:5173") 
public class EnrollmentController {
    private final EnrollmentService enrollmentService;
    private final StudentService studentService;
    private final CourseService courseService;

    public EnrollmentController(EnrollmentService enrollmentService, StudentService studentService, CourseService courseService) {
        this.enrollmentService = enrollmentService;
        this.studentService = studentService;
        this.courseService = courseService;
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

   @PostMapping
   public Enrollment addEnrollment(@RequestBody Enrollment enrollment) {
       Student student = studentService.getStudentById(enrollment.getStudent().getId());
       Course course = courseService.getCourseById(enrollment.getCourse().getId());
       enrollment.setStudent(student);
       enrollment.setCourse(course);
       return enrollmentService.addEnrollment(enrollment);
   }


    @PutMapping("/{id}")
    public Enrollment updateEnrollment(@PathVariable Long id, @RequestBody Enrollment e) {
        Enrollment existing = enrollmentService.getEnrollmentById(id);
        if (e.getStudent() != null) {
            existing.setStudent(studentService.getStudentById(e.getStudent().getId()));
        }
        if (e.getCourse() != null) {
            existing.setCourse(courseService.getCourseById(e.getCourse().getId()));
        }
        if (e.getStatus() != null) {
            existing.setStatus(e.getStatus());
        }
        return enrollmentService.updateEnrollment(id, existing);
    }


    @DeleteMapping("/{id}")
    public void deleteEnrollment(@PathVariable Long id) {
        enrollmentService.deleteEnrollment(id);
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getStudentEnrollments(@PathVariable Long studentId) {
        Student student = studentService.getStudentById(studentId);
        return enrollmentService.getEnrollmentsByStudent(student);
    }
}