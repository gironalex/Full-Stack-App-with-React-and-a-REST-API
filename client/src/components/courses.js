// Import Modules
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { contextAPI } from '../Context.js';

// Courses Component - Renders all courses at the home '/' route
const Courses = () => {

    // Setting State
    const [ coursesData, setCoursesData ] = useState([]);

    // Data from Context
    const context = useContext(contextAPI);

    // URL History
    const history = useHistory();
    
    // Fetching Courses
    useEffect(() => {
        context.data.getCourses()
          .then( data => setCoursesData(data))
          .catch( () => history.push('/error'));
    }, [context.data, history])

    // HTML Array for the courses
    let courses = coursesData.map((course, id) => (
      <a className="course--module course--link" href={`/courses/${course.id}`} key={id}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{`${course.title}`}</h3>
      </a>
    ))

    return (
      <main>
        <div className="wrap main--grid">
            
          {/* courses HTML array */}
          { courses }

          {/* Button for creating a new courses */}
          <Link className="course--module course--add--module" to="/courses/create">
            <span className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
            </span>
          </Link>
        </div>
      </main>
    )
}

export default Courses;