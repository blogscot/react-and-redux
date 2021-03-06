import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'

import * as courseActions from '../../actions/courseActions'
import CourseList from './courseList'

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this)
  }

  courseRow(course, index) {
    return <div key={index}>{course.title} by <em>{course.author}</em></div>
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course')
  }

  render() {
    const {courses} = this.props
    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage} />
        <CourseList courses={courses}/>
      </div>
    )
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

// Attaches the state to the component's props
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  }
}

// Maps ALL the component's actions onto the component's props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

// wires up this component to its state and actions
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
