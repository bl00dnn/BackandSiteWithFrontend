package com.example.praktika3.repository;

import com.example.praktika3.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<StudentEntity, Integer> {
    List<StudentEntity> findByGender(String name);
    List<StudentEntity> findByAgeGreaterThan(int age);
    List<StudentEntity> findByStudentGroup(String studentGroup);
}
