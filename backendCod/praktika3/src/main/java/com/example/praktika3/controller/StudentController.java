package com.example.praktika3.controller;

import com.example.praktika3.entity.StudentEntity;
import com.example.praktika3.repository.StudentRepository;
import com.example.praktika3.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@CrossOrigin
public class StudentController {

    private final StudentRepository studentRepository;
    private StudentService studentService;

    /// Добавление большого количество студентов
    @PostMapping("/addStudentsM")
    public List<StudentEntity> newStudentsMore(@RequestBody List<StudentEntity> students) {
        return studentRepository.saveAll(students);
    }

    ///  Добавление студента
    @PostMapping("/addStudent")
    public String newStudent(@RequestBody StudentEntity student){
        return studentService.newStudent(student);
    }

    /// Поиск студента по студенчискому билету
    @GetMapping("/student/{id}")
    public StudentEntity getStudentById(@PathVariable int id) {
        return studentService.getStudentById(id);
    }

    // Поиск студентов по гендеру
    @GetMapping("/student")
    public List<StudentEntity> getStudentByGender(@RequestParam String g) {
        return studentService.getStudentByGender(g);
    }

    // Поиск студентов больше определённого возраста
    @GetMapping("/ageGreaterThan")
    public List<StudentEntity> getStudentByAgeGreaterThan(@RequestParam int age) {
        return studentService.getStudentByAgeGreaterThan(age);
    }

    /// Удаление студента
    @DeleteMapping("/deleteStudent/{id}")
    public String deleteStudentById(@PathVariable int id){
        return studentService.deleteStudent(id);
    }

    /// Обновление информации студента
    @PatchMapping("/updateStudent/{id}")
    public StudentEntity updateStudent(@RequestBody StudentEntity student, @PathVariable int id){
        return studentService.updateStudentInfo(student, id);
    }

    /// Поиск студентов по группе
    @GetMapping("/studentByGroup")
    public List<StudentEntity> getStudentByGroup(@RequestParam String group){
        return studentService.getStudentByGroup(group);
    }

    /// Список всех студентов
    @GetMapping("/getStudents")
    public List<StudentEntity> getAllStudents(){
        return studentService.getAllStudents();
    }

}
