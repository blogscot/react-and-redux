import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../actions/courseActions'

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      course: { title: "", author: "" }
    }

    this.onTitleChange = this.onTitleChange.bind(this)
    this.onAuthorChange = this.onAuthorChange.bind(this)
    this.onClickSave = this.onClickSave.bind(this)
  }

  onTitleChange(event) {
    const course = this.state.course
    course.title = event.target.value
    this.setState({course: course})
  }

  onAuthorChange(event) {
    const course = this.state.course
    course.author = event.target.value
    this.setState({course: course})
  }

  onClickSave() {
    this.props.actions.createCourse(this.state.course)
  }

  courseRow(course, index) {
    return <div key={index}>{course.title} by <em>{course.author}</em></div>
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>

        <label>Title:</label>&nbsp;
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title} />
        <br />

        <label>Author:</label>&nbsp;
        <input
          type="text"
          onChange={this.onAuthorChange}
          value={this.state.course.author} />
          <br />

        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave} />
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