package com.example.praktika3.service;

import com.example.praktika3.entity.StudentEntity;
import com.example.praktika3.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class StudentService {

    private final StudentRepository studentRepository;

    public String newStudentsMore(List<StudentEntity> students) {
        if (students == null || students.isEmpty()) {
            return "Ошибка: Невозможно добавить пустой список студентов";
        }
        studentRepository.saveAll(students); // Метод для сохранения списка объектов
        return "Новые люди добавлены";
    }

    /// Добавление новго студента
    public String newStudent(StudentEntity student) {
        if (student == null) {
            return "Ошибка: Невозможно добавить пустого студента";
        }
        studentRepository.save(student);
        return "Новый человек добавлен";
    }

    /// Получить студента по группе
    public List<StudentEntity> getStudentByGroup(String studentGroup) {
        return studentRepository.findByStudentGroup(studentGroup);
    }

    // Получение студента по гендеру
    public List<StudentEntity> getStudentByGender(String gender) {
       return studentRepository.findByGender(gender);
    }

    // Поиск студентов больше определённого возраста
    public List<StudentEntity> getStudentByAgeGreaterThan(int age) {
        return studentRepository.findByAgeGreaterThan(age);
    }

    /// Поиск студента по студенчискому билету
    public StudentEntity getStudentById(int id) {
        return studentRepository.findById(id).orElse(null);
    }

    /// Обновление информации студента
    public StudentEntity updateStudentInfo(StudentEntity student, int id) {
        StudentEntity targetStudent = studentRepository.findById(id).orElse(null);
        if (targetStudent == null) {
            return null;
        }
        targetStudent.setLastName(student.getLastName());
        targetStudent.setFirstName(student.getFirstName());
        targetStudent.setMiddleName(student.getMiddleName());
        targetStudent.setAge(student.getAge());
        targetStudent.setGender(student.getGender());
        targetStudent.setEmail(student.getEmail());
        targetStudent.setAddress(student.getAddress());
        targetStudent.setPhone(student.getPhone());
        targetStudent.setStudentGroup(student.getStudentGroup());
        targetStudent.setFormOfEducation(student.getFormOfEducation());
        targetStudent.setDateOfAdmission(student.getDateOfAdmission());
        return studentRepository.save(targetStudent);
    }

    /// Удаление студента
    public String deleteStudent(int id) {
        StudentEntity student = studentRepository.findById(id).orElse(null);
        if(student == null){
            return "Студент с таким билетом не найден";
        }
        studentRepository.deleteById(id);
        return "Человек удалён";
    }

    /// Получение всех студентов
    public List<StudentEntity> getAllStudents() {
        return studentRepository.findAll();
    }

}
