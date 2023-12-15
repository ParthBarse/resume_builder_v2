import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Link } from '@chakra-ui/react';
import axios from 'axios';



const Admin = () => {
  const [students, setStudents] = useState([]);
  const [disApproveComment, setDisAppoveComment] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [disApproveStudent, setDisAppoveStudent] = useState(null)

  const approveResume = async(userEmail) => {
    const res = await axios({
      method : "get",
      url : `http://20.197.17.85:5550/sendApprove?email=${userEmail}`
    })
    console.log(res);
  }

  const disApproveResume = async(userEmail) => {
    const res = await axios({
      method : "get",
      url : `http://20.197.17.85:5550/sendDisapprove?email=${disApproveStudent}&comment=${disApproveComment}`
    })
    console.log(res);
    setPopUp(false)
  }

  const getAllStudents = async() => {
    const res = await axios({
      method : "get",
      url : `${process.env.REACT_APP_HOST}/getAllStudents`,
      headers : {
        authToken : localStorage.getItem("token")
      }
    })
    if(res.data.success === true){
      setStudents(res.data.students)
      console.log(res.data.students);
    }
    console.log(res);
  }

  const deleteResume = async(resumeId, userId) => {
    console.log(resumeId);
    const res = await axios({
      method : "delete",
      url : `${process.env.REACT_APP_HOST}/deleteResume`,
      data : {
        resumeId : resumeId,
        userId : userId
      }
    })
    if(res.data.success === true){
      console.log(res.data);
      getAllStudents()
    }
  }

useEffect(()=>{

  getAllStudents()
}, [])

const user = {
  _id : "857301450afd17735c0f117e"
}
const host = `http://20.197.17.85:5000/public`
 
  return (
    <ChakraProvider >
    
        {students.length>0 ? <Box textAlign="center" p="8" marginBottom={'4%'} overflowX={"scroll"}>
          <Heading mb="4">Registered Students</Heading>
          <Table variant="simple" >
            <Thead>
              <Tr bg="#00b0ff" >
                <Th color="White">Surname</Th>
                <Th color="White">Givenname</Th>
                <Th color="White">Father's Name</Th>
                <Th color="White">Mobile-no</Th>
                <Th color="White">Email-id</Th>
                <Th color="White">Passport Photo</Th>
                <Th color="White">Candidate Photo</Th>
                <Th color="White">View More</Th>
                <Th color="White">CV</Th>
                <Th color="White">Academic Year/Semester</Th>
                <Th color="White">Post graduate Marksheet</Th>
                <Th color="White">Undergraduate/ Diploma Marksheet</Th>
                <Th color="White">12th Marksheet</Th>
                <Th color="White">11th Marksheet</Th>
                <Th color="White">10th Marksheet</Th>
                <Th color="White">Approve</Th>
                <Th color="White">Disapprove</Th>
                <Th color="White">Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map((student, i) => (
                <Tr key={student._id}>
                  <Td bg="white" color="black">
                    {student.last_name}
                  </Td>
                  <Td bg="white" color="black">
                  {student.first_name} 
                  </Td>
                  <Td>
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                      {student.resume.father_name}
                    {/* </Link> */}
                  </Td>
                  <Td>
                  {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                      {student.mobile}
                    {/* </Link> */}

                  </Td>
                  <Td>
                      {student.email}
                  </Td>
                  <Td>
                      {/* {"passport photo"} */}
                      {/* <img src={`/${host}/${user._id}/${student.passport}`} alt="passport" /> */}
                      <img src={`${host}/${student._id}/${student.resume.passport}`} alt="candidate" />
                  </Td>
                  <Td>
                      {/* {"candidate photo"} */}
                      <img src={`${host}/${student._id}/${student.resume.candidate}`} alt="candidate" />
                      {/* <img src={`/${host}/${user._id}/${student.candidate}`} alt="candidate" /> */}
                  </Td>
                  <Td>
                      <button >View More</button>
                  </Td>
                  <Td >
                      <button >Download Full CV</button>
                      <button >Download Filtered CV</button>
                  </Td>
                  <Td >
                      <p className='min-w-max'>Year 1/ semester 1</p>
                      <p className='min-w-max'>Year 2/ semester 2</p>
                      <p className='min-w-max'>Year 3/ semester 3</p>
                  </Td>
                  <Td >
                      {student.resume.post_graduate !== undefined && student.resume.post_graduate.length > 0 && student.resume.post_graduate.map((ele, i)=>{
                          console.log("post", ele);
                        return <a href={`${host}/${student._id}/${ele.marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                          View and Download
                        </a>
                      })}
                  </Td>
                  <Td>
                      {student.resume.under_graduate !== undefined && student.resume.under_graduate.length > 0 && student.resume.under_graduate.map((ele)=>{
                        console.log("under", ele);
                        return <a href={`${host}/${student._id}/${ele.marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                          View and Download
                        </a>
                      })}
                  </Td>
                  <Td>
                  <a href={`${host}/${student._id}/${student.resume.twelweth.marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer"> 
                          View and Download
                        </a>
                  </Td>
                  <Td>
                  <a href={`${host}/${student._id}/${student.resume.eleventh.marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                          View and Download
                        </a>
                  </Td>
                  <Td>
                  <a href={`${host}/${student._id}/${student.resume.tenth.marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                          View and Download
                        </a>
                  </Td>
                  <Td>
                        <button className='p-2 bg-green-700 rounded-md text-white' onClick={()=>approveResume(student.email)}>Approve</button>
                  </Td>
                  <Td>
                        <button className='p-2 bg-yellow-600 rounded-md text-white' onClick={()=>{setPopUp(true); setDisAppoveStudent(student.email)}}>Disapprove</button>
                  </Td>
                  <Td>
                        <button className='p-2 bg-red-700 rounded-md text-white' onClick={()=>deleteResume(student.resume._id , student._id)}>Delete</button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box> : <h2 className='text-center text-5xl'>No Resume to show</h2>} 
    { popUp &&
      <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
        <div className='flex flex-col gap-2 bg-[#26495a]  w-1/2 p-4 rounded-sm'>
        <input type="text" placeholder='Write reason of disapproval' className='p-2 rounded-md outline-none' value={disApproveComment} onChange={(e)=>setDisAppoveComment(e.target.value)} />
        <button className='bg-yellow-500 text-white p-1 rounded-md' onClick={()=>setPopUp(false)}>Cancel</button>
        <button className='bg-red-700 text-white p-1 rounded-md' onClick={disApproveResume}>Disapprove</button>
      </div>
      </div>
    }
    </ChakraProvider>
  );
};

export default Admin;
