document.addEventListener('DOMContentLoaded', function () {
    const studentCardsContainer = document.getElementById('studentCardsContainer');
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const cancelEditButton = document.getElementById('cancelEdit');
    const form = document.querySelector('.myForm');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    let studentsData = []; // Данные о студентах
    let currentStudentId = null;

    async function loadStudentCards() {
        try {
            const response = await fetch("http://localhost:8080/getStudents");
            if (response.ok) {
                students = await response.json();
                displayStudentCards(students);
            } else {
                console.error("Ошибка загрузки данных: ", response.statusText);
                alert("Ошибка загрузки данных");
            }
        } catch (error) {
            console.error("Ошибка запроса: ", error);
            alert("Ошибка при загрузке данных");
        }
    }

    function displayStudentCards(students) {
        if (students.length === 0) {
            studentCardsContainer.innerHTML = "<p>Нет студентов для отображения</p>";
            return;
        }

        studentCardsContainer.innerHTML = students.map(student => `
            <div class="card">
                <img src="https://img.icons8.com/?size=100&id=38834&format=png&color=000000" alt="Student Icon">
                <h2>${student.lastName} ${student.firstName}<h2> ${student.middleName}</h2>
                <p><span>Студенческий билет:</span> ${student.id}</p>
                <p><span>Группа:</span> ${student.studentGroup}</p>
                <p><span>Возраст:</span> ${student.age}</p>
                <p><span>Email:</span> ${student.email}</p>
                <div class="details">
                    <p><span>Пол:</span> ${student.gender}</p>
                    <p><span>Адрес:</span> ${student.address}</p>
                    <p><span>Телефон:</span> ${student.phone}</p>
                    <p><span>Форма обучения:</span> ${student.formOfEducation}</p>
                    <p><span>Дата зачисления:</span> ${student.dateOfAdmission}</p>
                </div>
                <button class="edit-btn" data-id="${student.id}">Редактировать</button>
                <button class="delete-btn" data-id="${student.id}">Удалить</button>
            </div>
        `).join('');
    
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const studentId = button.getAttribute('data-id');
                await deleteStudent(studentId);
            });
        });

        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const studentId = button.getAttribute('data-id');
                await openEditModal(studentId);
            });
        });
    }

    async function openEditModal(studentId) {
        editModal.classList.add('show');
        const response = await fetch(`http://localhost:8080/student/${studentId}`);
        if (response.ok) {
            const student = await response.json();
            currentStudentId = student.id;
            document.getElementById('editLastName').value = student.lastName;
            document.getElementById('editFirstName').value = student.firstName;
            document.getElementById('editMiddleName').value = student.middleName;
            document.getElementById('editAge').value = student.age;
            document.getElementById('editGender').value = student.gender;
            document.getElementById('editEmail').value = student.email;
            document.getElementById('editAddress').value = student.address;
            document.getElementById('editPhone').value = student.phone;
            document.getElementById('editGroup').value = student.studentGroup;
            document.getElementById('editFormOfEducation').value = student.formOfEducation;
            document.getElementById('editDateOfAdmission').value = student.dateOfAdmission;
    
            editModal.style.display = 'flex';
            editModal.classList.add('show');
            document.body.classList.add('modal-open');
        }
    }
    
    cancelEditButton.addEventListener('click', function () {
        editModal.style.display = 'none';
        editModal.classList.remove('show');
        document.body.classList.remove('modal-open');
    });

    async function saveStudentChanges(updatedStudent) {
        try {
            const response = await fetch(`http://localhost:8080/updateStudent/${currentStudentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent),
            });
            if (response.ok) {
                alert("Данные студента обновлены!");
                editModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                loadStudentCards();
            } else {
                alert("Ошибка при сохранении данных");
            }
        } catch (error) {
            console.error("Ошибка при обновлении данных: ", error);
            alert("Ошибка при обновлении данных");
        }
    }

    editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const updatedStudent = {
            lastName: document.getElementById('editLastName').value,
            firstName: document.getElementById('editFirstName').value,
            middleName: document.getElementById('editMiddleName').value,
            age: document.getElementById('editAge').value,
            gender: document.getElementById('editGender').value,
            email: document.getElementById('editEmail').value,
            address: document.getElementById('editAddress').value,
            phone: document.getElementById('editPhone').value,
            studentGroup: document.getElementById('editGroup').value,
            formOfEducation: document.getElementById('editFormOfEducation').value,
            dateOfAdmission: document.getElementById('editDateOfAdmission').value,
        };
        saveStudentChanges(updatedStudent);
    });

    cancelEditButton.addEventListener('click', function () {
        editModal.style.display = 'none';
    });

    async function deleteStudent(studentId) {
        try {
            const response = await fetch(`http://localhost:8080/deleteStudent/${studentId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Студент удалён!");
                loadStudentCards();
            } else {
                console.error("Ошибка удаления студента: ", response.statusText);
                alert("Ошибка при удалении студента");
            }
        } catch (error) {
            console.error("Ошибка запроса при удалении: ", error);
            alert("Ошибка при удалении студента");
        }
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        let data = {};
        formData.forEach((value, key) => {
            data[key] = value; 
        });

        try {
            const response = await fetch("http://localhost:8080/addStudent", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.text(); 
                console.log(result); 
                alert("Данные успешно отправлены!");
                loadStudentCards(); 
            } else {
                const errorText = await response.text();
                console.error("Ошибка отправки данных: ", errorText);
                alert("Ошибка при отправке данных");
            }
        } catch (error) {
            console.error("Ошибка запроса: ", error);
            alert("Ошибка при отправке данных");
        }
    });
    // Функция для поиска студентов по введённому запросу
    function searchStudents() {
        const query = searchInput.value.trim().toLowerCase();
        const field = searchField.value;
    
        if (!query) {
            displayStudentCards(students);
            return;
        }
    
        // Фильтрация студентов по точному совпадению значения
        const filteredStudents = students.filter(student => {
            const fieldValue = student[field] ? student[field].toString().toLowerCase() : "";
            return fieldValue === query; // Используем строгое равенство
        });
    
        displayStudentCards(filteredStudents);
    }

    searchButton.addEventListener('click', searchStudents);

    showAllButton.addEventListener('click', function () {
        searchInput.value = '';
        displayStudentCards(students);
    });

    loadStudentCards();
});

