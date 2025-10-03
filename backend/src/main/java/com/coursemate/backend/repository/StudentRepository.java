package com.coursemate.backend.repository;

import com.coursemate.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
       Optional<Student> findByEmailAndPassword(String email, String password);
    Student findByEmail(String email);
}