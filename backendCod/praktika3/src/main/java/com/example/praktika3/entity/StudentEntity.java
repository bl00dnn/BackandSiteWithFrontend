package com.example.praktika3.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "person")
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name = "first-name")
    String firstName;

    @Column(name = "last-name")
    String lastName;

    @Column(name = "middle-name")
    String middleName;

    @Column(name = "age")
    int age;

    @Column(name = "gender")
    String gender;

    @Column(name = "email")
    String email;

    @Column(name = "address")
    String address;

    @Column(name = "phone-number")
    String phone;

    @Column(name = "student-group")
    String studentGroup;

    @Column(name = "form-of-education")
    String formOfEducation;

    @Column(name = "date-of-admission")
    String dateOfAdmission;
}
