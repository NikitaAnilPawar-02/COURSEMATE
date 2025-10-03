package com.coursemate.backend.service;

import com.coursemate.backend.model.Student;
import com.coursemate.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student addStudent(Student student) {
        if(student.getPassword() == null || student.getPassword().isEmpty()) {
            student.setPassword("student123"); 
            student.setFirstLogin(true);     
        }
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = getStudentById(id);
        if (existing == null) return null;

        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setPhone(updatedStudent.getPhone());
        existing.setDob(updatedStudent.getDob());
        existing.setGender(updatedStudent.getGender());
        existing.setParentName(updatedStudent.getParentName());
        existing.setParentPhone(updatedStudent.getParentPhone());

        return studentRepository.save(existing);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Student changePassword(Long id, String newPassword) {
        Student existing = getStudentById(id);
        if (existing == null) return null;
        existing.setPassword(newPassword);
        existing.setFirstLogin(false);
        return studentRepository.save(existing);
    }
}
