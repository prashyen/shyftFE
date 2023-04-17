export async function getAllStudents() {

    try{
        const response = await fetch('http://localhost:3001/api/students');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function addStudent(data) {
    const response = await fetch(`http://localhost:3001/api/students`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}