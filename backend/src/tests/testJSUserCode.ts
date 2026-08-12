import http from 'http';

const jsCode = `// Medium Level JavaScript Example
// Student Management System

const students = [
    { id: 1, name: "Keerti", age: 21, marks: 85 },
    { id: 2, name: "Pooja", age: 22, marks: 72 },
    { id: 3, name: "Rahul", age: 20, marks: 91 },
    { id: 4, name: "Sneha", age: 21, marks: 65 }
];

// Display all students
function displayStudents() {
    console.log("All Students:");

    students.forEach(student => {
        console.log(
            \`ID: \${student.id}, Name: \${student.name}, Marks: \${student.marks}\`
        );
    });
}

// Find students who passed
function getPassedStudents() {
    const passed = students.filter(student => student.marks >= 40);

    console.log("\\nPassed Students:");
    passed.forEach(student => {
        console.log(\`\${student.name} - \${student.marks}\`);
    });
}

// Find the student with highest marks
function getTopStudent() {
    const topStudent = students.reduce((top, student) => {
        return student.marks > top.marks ? student : top;
    });

    console.log("\\nTop Student:");
    console.log(\`\${topStudent.name} - \${topStudent.marks} marks\`);
}

// Calculate average marks
function calculateAverage() {
    const total = students.reduce(
        (sum, student) => sum + student.marks,
        0
    );

    const average = total / students.length;

    console.log(\`\\nAverage Marks: \${average}\`);
}

// Sort students by marks
function sortByMarks() {
    const sortedStudents = [...students].sort(
        (a, b) => b.marks - a.marks
    );

    console.log("\\nStudents Sorted By Marks:");

    sortedStudents.forEach(student => {
        console.log(\`\${student.name} - \${student.marks}\`);
    });
}

// Add a new student
function addStudent(name, age, marks) {
    const newStudent = {
        id: students.length + 1,
        name: name,
        age: age,
        marks: marks
    };

    students.push(newStudent);

    console.log(\`\\n\${name} added successfully!\`);
}

// Delete a student
function deleteStudent(id) {
    const index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        const removedStudent = students.splice(index, 1);
        console.log(\`\${removedStudent[0].name} deleted successfully!\`);
    } else {
        console.log("Student not found.");
    }
}

// Run the program
displayStudents();
getPassedStudents();
getTopStudent();
calculateAverage();
sortByMarks();

addStudent("Amit", 22, 78);

deleteStudent(2);

console.log("\\nUpdated Student List:");
displayStudents();
`;

const data = JSON.stringify({ language: 'javascript', code: jsCode });

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/executions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('API Execution Response:');
    console.log(JSON.stringify(JSON.parse(body), null, 2));
  });
});

req.write(data);
req.end();
