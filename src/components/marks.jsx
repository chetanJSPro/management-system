import React, { useState } from 'react'
import Layout from './layout'

export default function Marks() {
  var students = [
    {
      "id": "1",
      "name": "chetan sharma",
      "rollno": 17,
      "class": "cse",
      "sem": "3rd",
      "sessional1marks": "23",
      "sessional2marks": "12",
      "sessional3marks": "4",
      "finalMarks": "1000"
    },
    {
      "id": "2",
      "name": "Jatin sharma",
      "rollno": 22,
      "branch": "cse",
      "sem": "2nd",
      "sessional1marks": "3",
      "sessional2marks": "21",
      "sessional3marks": "25",
      "finalMarks": "655"
    },
    {
      "id": "3",
      "name": "Mohan ram",
      "rollno": 34,
      "branch": "cse",
      "sem": "1st",
      "sessional1marks": "13",
      "sessional2marks": "2",
      "sessional3marks": "24",
      "finalMarks": "790"
    },
    {
      "id": "4",
      "name": "Ramnath",
      "rollno": 52,
      "branch": "cse",
      "sem": "4th",
      "sessional1marks": "2",
      "sessional2marks": "1",
      "sessional3marks": "14",
      "finalMarks": "450"
    },

    {
      "id": "5",
      "name": "Ram Lal",
      "rollno": 21,
      "branch": "cse",
      "sem": "3rd",
      "sessional1marks": "28",
      "sessional2marks": "29",
      "sessional3marks": "30",
      "finalMarks": "1200"
    },
    {
      "id": "6",
      "name": "Raghav sharma",
      "rollno": 45,
      "branch": "cse",
      "sem": "3rd",
      "sessional1marks": "15",
      "sessional2marks": "8",
      "sessional3marks": "25",
      "finalMarks": "940"
    }
  ];
  const sem1subjects = [
    { "id": "1", "subject": "English and Communication Skills - I" },
    { "id": "2", "subject": "Applied Mathematics - I" },
    { "id": "3", "subject": "Applied Physics - I" },
    { "id": "4", "subject": "Fundamentals of IT" },
    { "id": "5", "subject": "Computer Workshop" },
    { "id": "6", "subject": "Electronics Workshop" }
  ];

  const sem2subjects = [
    { "id": "1", "subject": "Advances in IT" },
    { "id": "2", "subject": "Applied Mathematics-II" },
    { "id": "3", "subject": "Applied Physics - II" },
    { "id": "4", "subject": "Analog Electronics" },
    { "id": "5", "subject": "Engineering Graphics" },
    { "id": "6", "subject": "Multimedia Applications" },
    { "id": "7", "subject": "Environmental Studies & Disaster Management" }
  ];
  const sem3subjects = [
    { "id": "1", "subject": "Industrial/In-House Training - I" },
    { "id": "3", "subject": "Operating Systems" },
    { "id": "4", "subject": "Digital Electronics" },
    { "id": "5", "subject": "Programming in C" },
    { "id": "6", "subject": "Data Base Management System" },
  ];
  const sem4subjects = [
    { "id": "1", "subject": "English and Communication Skill" },
    { "id": "2", "subject": "Computer Organisation & Architecture" },
    { "id": "3", "subject": "Data Structures using C" },
    { "id": "4", "subject": "Object Oriented Programming using Java" },
    { "id": "5", "subject": "Open Elective (MOOCs+/Offline)" },
    { "id": "6", "subject": "Minor Project" }
  ];
  const sem5subjects = [
    { "id": "1", "subject": "Industrial Training - II" },
    { "id": "2", "subject": "Web Technologies" },
    { "id": "3", "subject": "Python Programming" },
    { "id": "4", "subject": "Computer Networks" },
    { "id": "5", "subject": "Programme Elective - I" },
    { "id": "6", "subject": "Multidisciplinary Elective (MOOCs/Offline)" }
  ];

  const sem6subjects = [
    { "id": 1, "subject": "Application Development using Web Framework" },
    { "id": 2, "subject": "Entrepreneurship Development & Management" },
    { "id": 3, "subject": "Software Engineering" },
    { "id": 4, "subject": "Programme Elective - II" },
    { "id": 5, "subject": "Major Project/Industrial Training" }
  ];

  const [select, setselect] = useState();
  function handleChange(e) {
    let val = e.target.value;
    setselect(val);
    console.log(select);
  };

  const [subjects, setSubjects] = useState([]);

  function table() {
    let selectval = String(select);
    let arr;
    switch (selectval) {
      case "1st":
        arr = sem1subjects;
        break;
      case "2nd":
        arr = sem2subjects;
        break;
      case "3rd":
        arr = sem3subjects;
        break;
      case "4th":
        arr = sem4subjects;
        break;
      case "5th":
        arr = sem5subjects;
        break;
      case "6th":
        arr = sem6subjects;
        break;
    }

    setSubjects(arr);
  }

  return (
    <Layout>
      <div className='col-6 col-sm-8 mt-5 ms-5'>
        <div className='row'>
          <h1 className='col-12 mb-5'>Check Marks</h1>
          <div className="form-floating col-sm-6">
            <select className="form-select" aria-label="Default select example" onChange={handleChange} >
              <option selected>-----</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
            </select>
            <label className='ms-2' for="floatingInput">Semester</label>
          </div>
          <div className="form-floating col-sm-6">
            <select className="form-select" aria-label="Default select example">
              <option selected>-----</option>
              <option value="sessional1">sessional1</option>
              <option value="sessional2">sessional2</option>
              <option value="sessional3">sessional3</option>
              <option value="final exam">final exam</option>
            </select>
            <label className='ms-2' for="floatingInput">Exam type</label>
          </div>
          <button className='btn btn-dark w-auto mt-5' onClick={table} >Check Marks</button>
          <h3 className='mt-5 mb-5'>Attendence</h3>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>s.no</th>
                <th>Subjects</th>
              </tr>
            </thead>
            <tbody>
              {subjects ? subjects.map(sub => (
                <tr key={sub.id}>
                  <td className='col-1'>{sub.id}</td>
                  <td>{sub.subject}</td>
                </tr>
              ))
                : <tr> please select an option</tr>}
            </tbody>
          </table>
        </div>
      </div>
    </Layout >
  )
}
