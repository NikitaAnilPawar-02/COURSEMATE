package com.coursemate.backend.service;

import com.coursemate.backend.model.Enrollment;
import com.coursemate.backend.model.Student;
import com.coursemate.backend.repository.EnrollmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepo;

    public EnrollmentService(EnrollmentRepository enrollmentRepo) {
        this.enrollmentRepo = enrollmentRepo;
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepo.findAll();
    }

    public Enrollment getEnrollmentById(Long id) {
        return enrollmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
    }

    public Enrollment addEnrollment(Enrollment enrollment) {
        return enrollmentRepo.save(enrollment);
    }

    @Transactional
    public Enrollment updateEnrollment(Long id, Enrollment updated) {
        Enrollment existing = enrollmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        existing.setStatus(updated.getStatus());

        if (updated.getStudent() != null) {
            existing.setStudent(updated.getStudent());
        }
        if (updated.getCourse() != null) {
            existing.setCourse(updated.getCourse());
        }

        return enrollmentRepo.save(existing);
    }


    public void deleteEnrollment(Long id) {
        enrollmentRepo.deleteById(id);
    }

    public List<Enrollment> getEnrollmentsByStudent(Student student) {
        return enrollmentRepo.findByStudent(student);
    }
}