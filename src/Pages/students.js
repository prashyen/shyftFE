import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { addStudent, getAllStudents } from "../Apis/api";

export function Students() {

    const [value, setValue] = React.useState();
    const [students, setStudents] = React.useState([]);

    React.useEffect(() => {
        getAllStudents().then(res => setStudents(res))
    }, [])

    React.useEffect(() => {
        console.log(students)
    }, [students])

    const [inputs, setInputs] = React.useState({});

    function calculateAge(birthday) {
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const handleChange = (event) => {
        console.log(event.target)
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(calculateAge(value))
        if (!inputs.firstname || inputs.firstname === "") alert('Please fill in first name')
        else if (!inputs.lastname || inputs.lastname === "") alert('Please fill in family name')
        else if (!value || value === "") alert('Please fill in Date of birth')
        else if (calculateAge(value) < 10) alert('Student must be 10 years old or older')
        else addStudent({ ...inputs, dob: value }).then(res => setStudents(res)).finally(()=>{alert("New student added"); setValue(null); setInputs({})})
    }
    return (<>
        <h1> WELCOME TO THE STUDENTS PAGE</h1>
        <form>
            <TextField id="outlined-basic" label="First Name" variant="outlined"
                name="firstname"
                value={inputs.firstname || ""}
                required
                onChange={handleChange} />
            <br />
            <br />
            <TextField id="outlined-basic" label="Family Name" variant="outlined"
                name="lastname"
                required
                value={inputs.lastname || ""}
                onChange={handleChange} />
            <br />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    required
                    name="dob"
                    label="Date of Birth"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </LocalizationProvider>
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={(event) => { handleSubmit(event) }}>
                save
            </Button>
        </form>
        {students?.map(({ firstname, lastname, dob }) => (
            <>
                <p>{firstname} {lastname} {dob}</p>
            </>))}
    </>)
}