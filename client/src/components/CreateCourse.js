// Import Modules
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { contextAPI } from '../Context.js';

// CreateCourse Component
const CreateCourse = () => {

    // Setting State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setErrors] = useState([]);

    // Data from Context
    const context = useContext(contextAPI);
    const signedIn = context.authedUser;
    const {userId} = signedIn;

    /*********
     * TESTING
     *********/
    console.log(context.authedUser);
    console.log(signedIn.password);
    console.log(userId);

    // URL History
    const history = useHistory();
    
    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Data to be passed to the database
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };
        console.log(course);

        if (signedIn){
          // Posting course data to the database
          context.data.createNewCourse(course, signedIn.emailAddress, signedIn.password)
            .then( errors => {
              if (errors.length) {
                setErrors(errors);
              } else  {
                // 
                context.data.getCourses()
                  .then( courseData => {
                    let createdCourse = courseData[courseData.length-1];
                    history.push(`/courses/` + createdCourse.id)
                  });
              }                      
            })
            .catch((err) => {
              history.push('/error');
              console.log('Error with Creating Course', err);
          });             
        }
    }

    // Handle Cancel Button
    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
      <main>
        <div className="wrap">
            <h2>Create Course</h2>     
            { 
              errors.length ? 
                <div className="validation--errors">
                  <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, index) => {
                            return (
                              <li key={index}>{error}</li>  
                            )
                        })}
                    </ul>
                </div>
                : 
                null
            }
        <form >
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e)=> setTitle(e.target.value)}></input>

              <p>By {signedIn.firstName} {signedIn.lastName}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e)=> setEstimatedTime(e.target.value)}></input>

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e)=> setMaterialsNeeded(e.target.value)}></textarea>
            </div>
          </div>
            <button className="button" type="submit" onClick={handleSubmit}>Create Course</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </main>
    )
}

export default CreateCourse;